Add-Type -AssemblyName System.Drawing

$filePath = "D:\rebocap\00 RBC doc\static\img\unboxing\6_set_unboxing-en.png"
$backupPath = "D:\rebocap\00 RBC doc\static\img\unboxing\6_set_unboxing-en.png.bak"

if (Test-Path $filePath) {
    Write-Host "Loading image..."
    $img = [System.Drawing.Image]::FromFile($filePath)
    
    Write-Host "Original Dimensions: $($img.Width) x $($img.Height)"
    
    # We will resave it as a JPEG with 85% quality to massively compress it (saving 90% space)
    # Since it's a web page display, 85% JPG is perfect and visually lossless.
    $jpgPath = "D:\rebocap\00 RBC doc\static\img\unboxing\6_set_unboxing-en.jpg"
    
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 85) # 85% quality
    
    # Get JPEG codec info
    $codecs = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
    $jpgCodec = $codecs | Where-Object { $_.FormatDescription -eq "JPEG" }
    
    Write-Host "Saving as JPEG..."
    $img.Save($jpgPath, $jpgCodec, $encoderParams)
    $img.Dispose()
    
    $oldSize = (Get-Item $filePath).Length
    $newSize = (Get-Item $jpgPath).Length
    
    Write-Host "Original PNG size: $([Math]::Round($oldSize / 1MB, 2)) MB"
    Write-Host "Compressed JPG size: $([Math]::Round($newSize / 1KB, 2)) KB"
    
    # Backup original PNG
    Move-Item -Path $filePath -Destination $backupPath -Force
    Write-Host "Original PNG backed up to 6_set_unboxing-en.png.bak"
} else {
    Write-Host "Image not found at $filePath"
}
