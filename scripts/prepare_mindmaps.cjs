const fs = require('fs');
const path = require('path');

const infoDir = path.resolve(__dirname, '../public/infographics');
const mindDir = path.resolve(__dirname, '../public/mindmaps');
const distMindDir = path.resolve(__dirname, '../dist/mindmaps');
const distInfoDir = path.resolve(__dirname, '../dist/infographics');

if (!fs.existsSync(mindDir)) fs.mkdirSync(mindDir, { recursive: true });
if (!fs.existsSync(distMindDir)) fs.mkdirSync(distMindDir, { recursive: true });
if (!fs.existsSync(distInfoDir)) fs.mkdirSync(distInfoDir, { recursive: true });

// Read all 36 html files in public/infographics
const files = fs.readdirSync(infoDir).filter(f => f.endsWith('.html'));
console.log(`Found ${files.length} infographic files.`);

// Enhanced responsive styling to ensure the entire graphic/mindmap is visible and can be scrolled/zoomed without any cutoff
function enhanceHtmlForFullView(htmlContent, isMindmap = false) {
  let content = htmlContent;

  if (isMindmap) {
    content = content.replace(/<title>Toán 10 – (BÀI \d+|ÔN TẬP[^:]*):/i, '<title>Toán 10 – Sơ đồ tư duy $1:');
  }

  // Replace restrictive body overflow: hidden with smooth responsive viewing
  content = content.replace(
    /body\s*\{[^}]*overflow:\s*hidden;?[^}]*\}/i,
    `html { background: #0b1120; min-height: 100%; }
body { width: 100%; min-height: 100vh; margin: 0; padding: 12px 6px; box-sizing: border-box; display: flex; justify-content: center; align-items: flex-start; background: #0b1120; overflow-x: auto; overflow-y: auto; font-family: 'Be Vietnam Pro', 'Segoe UI', sans-serif; color: #1F2937; -webkit-print-color-adjust: exact; print-color-adjust: exact; }`
  );

  // Update .page to have nice card container with full view
  content = content.replace(
    /\.page\s*\{[^}]*\}/i,
    `.page { width: 794px; min-height: 1123px; max-width: 100%; margin: 0 auto; display: flex; flex-direction: column; background: radial-gradient(circle at 100% 0%, var(--nhat) 0, transparent 38%), radial-gradient(circle at 0% 100%, var(--nhat) 0, transparent 30%), #FFFFFF; border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,0.45); overflow: visible; }`
  );

  // Ensure print layout remains pristine A4
  if (!content.includes('@media print')) {
    content = content.replace('</style>', `
@media print {
  html, body { background: #fff !important; padding: 0 !important; margin: 0 !important; }
  .page { box-shadow: none !important; border-radius: 0 !important; width: 794px !important; height: 1123px !important; }
}
</style>`);
  }

  return content;
}

// Process each file
let count = 0;
for (const file of files) {
  const srcPath = path.join(infoDir, file);
  const rawHtml = fs.readFileSync(srcPath, 'utf8');

  // 1. Enhanced Infographic version
  const enhancedInfoHtml = enhanceHtmlForFullView(rawHtml, false);
  fs.writeFileSync(srcPath, enhancedInfoHtml, 'utf8');
  fs.writeFileSync(path.join(distInfoDir, file), enhancedInfoHtml, 'utf8');

  // 2. Enhanced Mindmap version
  const enhancedMindHtml = enhanceHtmlForFullView(rawHtml, true);
  
  // Write with base name (e.g. Bai01_Menh-de.html)
  fs.writeFileSync(path.join(mindDir, file), enhancedMindHtml, 'utf8');
  fs.writeFileSync(path.join(distMindDir, file), enhancedMindHtml, 'utf8');

  // Also write with SoDoTuDuy_ prefix (e.g. SoDoTuDuy_Bai01_Menh-de.html)
  const prefixedFile = `SoDoTuDuy_${file}`;
  fs.writeFileSync(path.join(mindDir, prefixedFile), enhancedMindHtml, 'utf8');
  fs.writeFileSync(path.join(distMindDir, prefixedFile), enhancedMindHtml, 'utf8');

  count++;
}

console.log(`Successfully processed and synchronized ${count} mindmap and infographic files!`);
