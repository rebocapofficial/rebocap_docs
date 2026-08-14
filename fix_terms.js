const fs = require('fs');
const path = require('path');

function parseGlossary() {
    const content = fs.readFileSync('特定词语的对应翻译 TERM_GLOSSARY.txt', 'utf8');
    const lines = content.split('\n');
    let glossary = [];
    let currentTerm = {};

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('【')) {
            const match = line.match(/【([^】]+)】\s*(.*)/);
            if (match) {
                const key = match[1].replace(/\s+/g, '');
                let val = match[2];
                if (val.includes('//')) {
                    val = val.split('//')[0].trim();
                }
                currentTerm[key] = val;
            }
        } else if (line === '' || line.startsWith('----') || line.startsWith('====')) {
            if (currentTerm['英文']) {
                glossary.push(currentTerm);
            }
            currentTerm = {};
        }
    });
    if (currentTerm['英文']) {
        glossary.push(currentTerm);
    }
    return glossary;
}

const glossary = parseGlossary();

const hardwareTerms = [
    'Tracker', 'Sensor', 'Receiver / USB Receiver', 'Receiver', 'USB Receiver',
    'Charging Case', 'Strap / Elastic Strap', 'Strap', 'Elastic Strap', 'Wide Strap',
    'Quick Release Base', 'Blister Tray'
];

const langMap = {
    'ru': '俄文', 'ko': '韩文', 'fr': '法文', 'es': '西班牙文'
};

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            results.push(file);
        }
    });
    return results;
}

const locales = ['ru', 'ko', 'fr', 'es'];

locales.forEach(loc => {
    const dir = path.join('i18n', loc, 'docusaurus-plugin-content-docs', 'current');
    const files = walk(dir);
    const termKey = langMap[loc];
    
    let termsToProcess = [];
    glossary.forEach(term => {
        let enRaw = term['英文'];
        if (!enRaw) return;
        enRaw = enRaw.trim();
        let localRaw = term[termKey];
        if (!localRaw) return;
        if (hardwareTerms.includes(enRaw)) return;
        
        const stripParenRegex = /\s*[\(（][A-Za-z0-9\s_-]+[\)）]/g;
        let pureLocal = localRaw.replace(stripParenRegex, '').trim();
        const enParts = enRaw.split('/').map(s => s.trim());
        const localParts = pureLocal.split('/').map(s => s.trim());
        
        for (let i = 0; i < localParts.length; i++) {
            const locT = localParts[i];
            const enT = enParts[i] || enParts[0];
            if (locT.toLowerCase() === enT.toLowerCase()) continue;
            if (locT === 'VR') continue; 
            if (hardwareTerms.includes(enT)) continue;
            termsToProcess.push({ locT, enT });
        }
    });
    
    // Sort by length descending
    termsToProcess.sort((a, b) => b.locT.length - a.locT.length);
    
    let prefix, suffixRegex, suffixMatchRegex;
    if (loc === 'ru') {
        prefix = '(?<![а-яА-ЯёЁ])';
        suffixRegex = '([а-яА-ЯёЁ]{0,3})(?![а-яА-ЯёЁ])';
        suffixMatchRegex = /^[а-яА-ЯёЁ]+$/;
    } else if (loc === 'ko') {
        prefix = '(?<![가-힣])';
        suffixRegex = '([가-힣]{0,3})(?![가-힣])';
        suffixMatchRegex = /^[가-힣]+$/;
    } else {
        prefix = '(?<![a-zA-ZÀ-ÿ])';
        suffixRegex = '([a-zA-ZÀ-ÿ]{0,2})(?![a-zA-ZÀ-ÿ])';
        suffixMatchRegex = /^[a-zA-ZÀ-ÿ]+$/;
    }
    
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let lines = content.split('\n');
        let inCodeBlock = false;
        let inFrontmatter = false;
        let modified = false;
        
        for (let i=0; i<lines.length; i++) {
            if (i === 0 && lines[i].trim() === '---') {
                inFrontmatter = true;
                continue;
            }
            if (inFrontmatter && lines[i].trim() === '---') {
                inFrontmatter = false;
                continue;
            }
            if (inFrontmatter) continue;
            
            if (lines[i].trim().startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                continue;
            }
            if (inCodeBlock) continue;
            
            let isHeading = lines[i].trim().startsWith('#');
            
            let origLine = lines[i];
            let tokenMap = {};
            let tokenIndex = 0;
            
            // Apply token replacement engine per line
            termsToProcess.forEach(({locT, enT}) => {
                const escapedLocTerm = locT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`${prefix}(${escapedLocTerm})${suffixRegex}`, 'gi');
                
                origLine = origLine.replace(regex, (match, base, suffix, offset, str) => {
                    const after = str.slice(offset + match.length);
                    const before = str.slice(0, offset);
                    
                    // Allow punctuation before the bracket
                    if (after.match(/^[\s»"”'’]*[\(（][A-Za-z0-9\s_\-\/]+[\)）]/)) return match; 
                    if (before.match(/\]\([^\)]*$/)) return match;
                    if (before.match(/<[^>]*$/) && after.match(/^[^<]*>/)) return match;
                    if (suffix && suffix.match(suffixMatchRegex)) return match; 
                    
                    // UI Context Filter for generic "Calibration"
                    if (enT === 'Calibration') {
                        // Check if it's formatted as a UI element (bold, code, quote) or is a heading
                        const isUIElement = before.match(/(\*\*|\*|`|"|'|«|\[)\s*$/) || after.match(/^\s*(\*\*|\*|`|"|'|»|\])/);
                        if (!isUIElement && !isHeading) {
                            return match; // Skip adding (Calibration) if it's just plain text in a paragraph
                        }
                    }
                    
                    const token = `__TOKEN_${tokenIndex++}__`;
                    tokenMap[token] = `${base} (${enT})`;
                    return token;
                });
            });
            
            // Restore tokens
            for (let t in tokenMap) {
                origLine = origLine.split(t).join(tokenMap[t]);
            }
            
            if (lines[i] !== origLine) {
                lines[i] = origLine;
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(file, lines.join('\n'), 'utf8');
        }
    });
});
console.log('Done.');
