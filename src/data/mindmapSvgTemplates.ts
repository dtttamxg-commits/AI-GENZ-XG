import { MindMapItem } from './mindmapsData';

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateMindMapSvg(mindmap: MindMapItem): string {
  const width = 1600;
  const height = 1050;

  const colorPalettes: Record<number, { primary: string; secondary: string; light: string; border: string; text: string; badgeBg: string }> = {
    1: { primary: '#4338ca', secondary: '#3b82f6', light: '#eef2ff', border: '#c7d2fe', text: '#312e81', badgeBg: '#e0e7ff' },
    2: { primary: '#0284c7', secondary: '#06b6d4', light: '#f0f9ff', border: '#bae6fd', text: '#0369a1', badgeBg: '#e0f2fe' },
    3: { primary: '#059669', secondary: '#10b981', light: '#f0fdf4', border: '#bbf7d0', text: '#065f46', badgeBg: '#dcfce7' },
    4: { primary: '#7c3aed', secondary: '#9333ea', light: '#f5f3ff', border: '#ddd6fe', text: '#5b21b6', badgeBg: '#ede9fe' },
    5: { primary: '#d97706', secondary: '#ea580c', light: '#fffbeb', border: '#fde68a', text: '#92400e', badgeBg: '#fef3c7' },
    6: { primary: '#e11d48', secondary: '#db2777', light: '#fff1f2', border: '#fecdd3', text: '#9f1239', badgeBg: '#ffe4e6' },
    7: { primary: '#2563eb', secondary: '#4f46e5', light: '#eff6ff', border: '#bfdbfe', text: '#1e40af', badgeBg: '#dbeafe' },
    8: { primary: '#0d9488', secondary: '#10b981', light: '#f0fdfa', border: '#99f6e4', text: '#115e59', badgeBg: '#ccfbf1' },
    9: { primary: '#9333ea', secondary: '#c026d3', light: '#faf5ff', border: '#e9d5ff', text: '#6b21a8', badgeBg: '#f3e8ff' }
  };

  const palette = colorPalettes[mindmap.chapterNumber] || colorPalettes[1];
  const branches = mindmap.keyBranches || [];

  const half = Math.ceil(branches.length / 2);
  const leftBranches = branches.slice(0, half);
  const rightBranches = branches.slice(half);

  const centerX = width / 2;
  const centerY = 525;

  // Render left branches
  const leftNodes = leftBranches.map((branch, i) => {
    const total = leftBranches.length;
    const ySpacing = (height - 300) / (total + 1);
    const cardCenterY = 175 + (i + 1) * ySpacing;
    const cardX = 45;
    const cardW = 415;
    const cardH = 150;
    const cardTopY = cardCenterY - cardH / 2;
    const connectionPointX = cardX + cardW;

    const controlX1 = centerX - 180;
    const controlX2 = connectionPointX + 100;
    const pathD = `M ${centerX - 165} ${centerY} C ${controlX1} ${centerY}, ${controlX2} ${cardCenterY}, ${connectionPointX} ${cardCenterY}`;

    return `
      <path d="${pathD}" fill="none" stroke="${palette.secondary}" stroke-width="4.5" stroke-linecap="round" opacity="0.8" />
      <circle cx="${connectionPointX}" cy="${cardCenterY}" r="7" fill="${palette.primary}" stroke="#ffffff" stroke-width="2" />

      <g transform="translate(${cardX}, ${cardTopY})">
        <rect width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${palette.border}" stroke-width="2" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="${cardW}" height="42" rx="18" fill="${palette.light}" opacity="0.9" />
        <rect x="0" y="24" width="${cardW}" height="18" fill="${palette.light}" opacity="0.9" />
        <rect x="0" y="0" width="8" height="${cardH}" rx="4" fill="${palette.primary}" />

        <text x="20" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="${palette.text}">
          ${escapeXml(branch.length > 34 ? branch.substring(0, 32) + '...' : branch)}
        </text>
        <g transform="translate(${cardW - 85}, 10)">
          <rect width="70" height="22" rx="6" fill="${palette.badgeBg}" stroke="${palette.border}" stroke-width="1" />
          <text x="35" y="15" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="${palette.text}" text-anchor="middle">
            Nhánh ${i + 1}
          </text>
        </g>

        <g transform="translate(18, 62)">
          <circle cx="0" cy="0" r="4.5" fill="${palette.primary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155">
            Trọng tâm lý thuyết và định nghĩa nền tảng
          </text>
        </g>
        <g transform="translate(18, 92)">
          <circle cx="0" cy="0" r="4.5" fill="${palette.primary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155">
            Phương pháp giải &amp; bài tập vận dụng chuẩn
          </text>
        </g>
        <g transform="translate(18, 122)">
          <circle cx="0" cy="0" r="4.5" fill="${palette.primary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155">
            Các lưu ý trọng tâm tránh bẫy đề thi
          </text>
        </g>
      </g>
    `;
  }).join('\n');

  // Render right branches
  const rightNodes = rightBranches.map((branch, i) => {
    const total = rightBranches.length;
    const ySpacing = (height - 300) / (total + 1);
    const cardCenterY = 175 + (i + 1) * ySpacing;
    const cardX = width - 460;
    const cardW = 415;
    const cardH = 150;
    const cardTopY = cardCenterY - cardH / 2;
    const connectionPointX = cardX;

    const controlX1 = centerX + 180;
    const controlX2 = connectionPointX - 100;
    const pathD = `M ${centerX + 165} ${centerY} C ${controlX1} ${centerY}, ${controlX2} ${cardCenterY}, ${connectionPointX} ${cardCenterY}`;

    return `
      <path d="${pathD}" fill="none" stroke="${palette.secondary}" stroke-width="4.5" stroke-linecap="round" opacity="0.8" />
      <circle cx="${connectionPointX}" cy="${cardCenterY}" r="7" fill="${palette.primary}" stroke="#ffffff" stroke-width="2" />

      <g transform="translate(${cardX}, ${cardTopY})">
        <rect width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${palette.border}" stroke-width="2" filter="url(#cardShadow)" />
        <rect x="0" y="0" width="${cardW}" height="42" rx="18" fill="${palette.light}" opacity="0.9" />
        <rect x="0" y="24" width="${cardW}" height="18" fill="${palette.light}" opacity="0.9" />
        <rect x="${cardW - 8}" y="0" width="8" height="${cardH}" rx="4" fill="${palette.secondary}" />

        <text x="20" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="${palette.text}">
          ${escapeXml(branch.length > 34 ? branch.substring(0, 32) + '...' : branch)}
        </text>
        <g transform="translate(${cardW - 95}, 10)">
          <rect width="80" height="22" rx="6" fill="${palette.badgeBg}" stroke="${palette.border}" stroke-width="1" />
          <text x="40" y="15" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="${palette.text}" text-anchor="middle">
            Nhánh ${half + i + 1}
          </text>
        </g>

        <g transform="translate(18, 62)">
          <circle cx="0" cy="0" r="4.5" fill="${palette.secondary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155">
            Công thức và quy tắc toán học cốt lõi
          </text>
        </g>
        <g transform="translate(18, 92)">
          <circle cx="0" cy="0" r="4.5" fill="${palette.secondary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155">
            Ví dụ mẫu và bài tập vận dụng thực tế
          </text>
        </g>
        <g transform="translate(18, 122)">
          <circle cx="0" cy="0" r="4.5" fill="${palette.secondary}" />
          <text x="12" y="4" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#334155">
            Tổng kết ghi nhớ nhanh và bí quyết thi
          </text>
        </g>
      </g>
    `;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="cardShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
    <filter id="centerShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.18" />
    </filter>
    <linearGradient id="centerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.primary}" />
      <stop offset="100%" stop-color="${palette.secondary}" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="${palette.light}" />
    </linearGradient>
    <pattern id="patternDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2.5" cy="2.5" r="1.5" fill="#94a3b8" opacity="0.22" />
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <circle cx="180" cy="180" r="320" fill="${palette.secondary}" opacity="0.04" />
  <circle cx="${width - 180}" cy="${height - 180}" r="360" fill="${palette.primary}" opacity="0.04" />
  <rect width="${width}" height="${height}" fill="url(#patternDots)" />
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="24" fill="none" stroke="${palette.border}" stroke-width="2" opacity="0.8" />

  <!-- Header Banner -->
  <g transform="translate(45, 36)">
    <rect width="${width - 90}" height="84" rx="20" fill="#ffffff" stroke="${palette.border}" stroke-width="1.5" filter="url(#cardShadow)" />
    
    <rect x="24" y="20" width="136" height="44" rx="12" fill="${palette.light}" stroke="${palette.border}" stroke-width="1.5" />
    <text x="92" y="48" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="800" fill="${palette.text}" text-anchor="middle">
      ${escapeXml(mindmap.chapterRoman)}
    </text>

    <text x="180" y="44" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="22" font-weight="900" fill="#0f172a">
      ${escapeXml(mindmap.title)}
    </text>
    <text x="180" y="68" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">
      Sơ đồ tư duy kiến thức cốt lõi · GDPT 2018 · Môn Toán 10 (${escapeXml(mindmap.chapterTitle)})
    </text>

    <g transform="translate(${width - 365}, 22)">
      <rect width="250" height="40" rx="12" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.5" />
      <circle cx="24" cy="20" r="7" fill="#10b981" />
      <text x="42" y="25" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="#065f46">
        Sơ đồ tư duy chuẩn kiến thức
      </text>
    </g>
  </g>

  <!-- Left & Right Nodes -->
  ${leftNodes}
  ${rightNodes}

  <!-- Center Core Hub -->
  <g transform="translate(${centerX}, ${centerY})">
    <circle cx="0" cy="0" r="175" fill="${palette.primary}" opacity="0.06" />
    <circle cx="0" cy="0" r="150" fill="${palette.secondary}" opacity="0.1" />
    <circle cx="0" cy="0" r="125" fill="${palette.secondary}" opacity="0.15" />

    <rect x="-155" y="-95" width="310" height="190" rx="30" fill="url(#centerGrad)" filter="url(#centerShadow)" stroke="#ffffff" stroke-width="3" />
    
    <text x="0" y="-45" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="#ffffff" opacity="0.9" text-anchor="middle" letter-spacing="1.5">
      TRỌNG TÂM KIẾN THỨC
    </text>
    <text x="0" y="-12" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">
      ${escapeXml(mindmap.chapterTitle.length > 20 ? mindmap.chapterTitle.substring(0, 18) + '...' : mindmap.chapterTitle)}
    </text>
    <text x="0" y="22" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="700" fill="#ffffff" opacity="0.95" text-anchor="middle">
      Toán 10 · ${escapeXml(mindmap.baiCode || 'Chương ' + mindmap.chapterNumber)}
    </text>

    <rect x="-95" y="42" width="190" height="30" rx="10" fill="#ffffff" opacity="0.25" />
    <text x="0" y="62" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
      ${branches.length} NHÁNH PHÂN TÍCH
    </text>
  </g>

  <!-- Bottom Highlights Footer -->
  <g transform="translate(45, ${height - 76})">
    <rect width="${width - 90}" height="48" rx="14" fill="#ffffff" stroke="${palette.border}" stroke-width="1.5" filter="url(#cardShadow)" />
    <text x="24" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="800" fill="${palette.text}">
      ĐIỂM NHẤN CỐT LÕI:
    </text>
    <text x="175" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12.5" font-weight="600" fill="#475569">
      ${escapeXml(mindmap.highlights?.join('   •   ') || '')}
    </text>
  </g>
</svg>`;
}
