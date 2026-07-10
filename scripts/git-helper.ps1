param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("Pull", "Push", "Status")]
    [string]$Action,

    [Parameter(Mandatory=$false)]
    [string]$CommitMessage
)

# Ensure the script runs in the project root directory
$ProjectRoot = Resolve-Path "$PSScriptRoot\.."
Set-Location $ProjectRoot

# Function to back up local changes
function Backup-LocalChanges($changes, $timestamp) {
    $backupDir = Join-Path $ProjectRoot "backups\archive\backup_$timestamp"
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    Write-Host "Backing up local changes to: $backupDir" -ForegroundColor Yellow
    
    foreach ($line in $changes) {
        $status = $line.Substring(0, 2).Trim()
        $filePath = $line.Substring(3).Trim()
        
        # Do not backup deleted files
        if ($status -eq "D") {
            continue
        }
        
        $srcPath = Join-Path $ProjectRoot $filePath
        $destPath = Join-Path $backupDir $filePath
        
        if (Test-Path $srcPath) {
            $destParent = Split-Path $destPath -Parent
            if (-not (Test-Path $destParent)) {
                New-Item -ItemType Directory -Force -Path $destParent | Out-Null
            }
            Copy-Item -Path $srcPath -Destination $destPath -Force
            Write-Host "  Backed up: $filePath" -ForegroundColor Gray
        }
    }
    return $backupDir
}

switch ($Action) {
    "Status" {
        Write-Host "=== Current Git Status ===" -ForegroundColor Cyan
        git status
        Write-Host ""
        Write-Host "=== Recent 5 Commits ===" -ForegroundColor Cyan
        git log -n 5 --oneline
    }

    "Pull" {
        $changes = git status --porcelain
        $hasChanges = $null -ne $changes -and $changes.Length -gt 0
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $backupPath = "None"
        
        if ($hasChanges) {
            $backupDir = Backup-LocalChanges $changes $timestamp
            $backupPath = "backups/archive/backup_$timestamp"
        }
        
        # Stash local changes to avoid merge conflicts
        $stashed = $false
        if ($hasChanges) {
            Write-Host "Stashing local changes..." -ForegroundColor Yellow
            $stashResult = git stash save "git-helper auto-stash before pull at $timestamp"
            if ($stashResult -match "No local changes to save") {
                # Stash detected no changes
            } else {
                $stashed = $true
            }
        }
        
        Write-Host "Pulling latest changes from GitHub..." -ForegroundColor Yellow
        $pullOutput = git pull 2>&1
        $pullSuccess = $LASTEXITCODE -eq 0
        Write-Host ($pullOutput -join "`n")
        
        # Restore stashed changes
        if ($stashed) {
            Write-Host "Restoring your local changes..." -ForegroundColor Yellow
            $popOutput = git stash pop 2>&1
            Write-Host ($popOutput -join "`n")
        }
        
        # Log to sync_history.md
        $dateStr = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $logStatus = if ($pullSuccess) { "Success" } else { "Failed" }
        $logDetails = "git pull"
        if (-not $pullSuccess) {
            $logDetails += " Error: " + ($pullOutput -join " ")
        }
        
        # Clean details for markdown table compatibility (remove pipe characters)
        $logDetails = $logDetails -replace '\|', '/'
        
        $logLine = "| $dateStr | Pull | $logStatus | $logDetails | $backupPath |"
        Add-Content -Path (Join-Path $ProjectRoot "backups\sync_history.md") -Value $logLine
        
        if ($pullSuccess) {
            Write-Host "Pull completed successfully!" -ForegroundColor Green
        } else {
            Write-Warning "Pull completed with warnings/errors. Please check output."
        }
    }

    "Push" {
        $changes = git status --porcelain
        $hasChanges = $null -ne $changes -and $changes.Length -gt 0
        
        $ahead = git cherry -v
        $hasAheadCommits = $null -ne $ahead -and $ahead.Length -gt 0
        
        if (-not $hasChanges -and -not $hasAheadCommits) {
            Write-Host "No changes or unpushed commits detected." -ForegroundColor Green
            return
        }
        
        $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
        $backupPath = "None"
        
        if ($hasChanges) {
            if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
                Write-Error "Local changes detected. -CommitMessage is required for Push action!"
                return
            }
            
            $backupDir = Backup-LocalChanges $changes $timestamp
            $backupPath = "backups/archive/backup_$timestamp"
            
            Write-Host "Staging and committing files..." -ForegroundColor Yellow
            git add .
            git commit -m $CommitMessage
            if ($LASTEXITCODE -ne 0) {
                Write-Error "Git commit failed. Aborting push."
                return
            }
        }
        
        Write-Host "Pushing commits to GitHub..." -ForegroundColor Yellow
        $pushOutput = git push origin main 2>&1
        $pushSuccess = $LASTEXITCODE -eq 0
        Write-Host ($pushOutput -join "`n")
        
        # Log to sync_history.md
        $dateStr = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $logStatus = if ($pushSuccess) { "Success" } else { "Failed" }
        $logDetails = "git push"
        if ($hasChanges) {
            $logDetails += " with commit: '$CommitMessage'"
        } else {
            $logDetails += " (pushing existing commits)"
        }
        if (-not $pushSuccess) {
            $logDetails += " Error: " + ($pushOutput -join " ")
        }
        
        # Clean details for markdown table compatibility
        $logDetails = $logDetails -replace '\|', '/'
        
        $logLine = "| $dateStr | Push | $logStatus | $logDetails | $backupPath |"
        Add-Content -Path (Join-Path $ProjectRoot "backups\sync_history.md") -Value $logLine
        
        if ($pushSuccess) {
            Write-Host "Push completed successfully!" -ForegroundColor Green
        } else {
            Write-Error "Push failed. Please check output."
        }
    }
}
