const fs = require('fs');
const path = require('path');

const publicMindDir = path.resolve(__dirname, '../public/mindmaps');
const distMindDir = path.resolve(__dirname, '../dist/mindmaps');

if (!fs.existsSync(publicMindDir)) fs.mkdirSync(publicMindDir, { recursive: true });
if (!fs.existsSync(distMindDir)) fs.mkdirSync(distMindDir, { recursive: true });

// Color palettes for 9 chapters
const CHAPTER_PALETTES = {
  1: { primary: '#4338ca', secondary: '#3b82f6', light: '#eef2ff', border: '#c7d2fe', text: '#312e81', badgeBg: '#e0e7ff', accent: '#4f46e5' },
  2: { primary: '#0284c7', secondary: '#06b6d4', light: '#f0f9ff', border: '#bae6fd', text: '#0369a1', badgeBg: '#e0f2fe', accent: '#0284c7' },
  3: { primary: '#059669', secondary: '#10b981', light: '#f0fdf4', border: '#bbf7d0', text: '#065f46', badgeBg: '#dcfce7', accent: '#059669' },
  4: { primary: '#7c3aed', secondary: '#9333ea', light: '#f5f3ff', border: '#ddd6fe', text: '#5b21b6', badgeBg: '#ede9fe', accent: '#7c3aed' },
  5: { primary: '#d97706', secondary: '#ea580c', light: '#fffbeb', border: '#fde68a', text: '#92400e', badgeBg: '#fef3c7', accent: '#d97706' },
  6: { primary: '#e11d48', secondary: '#db2777', light: '#fff1f2', border: '#fecdd3', text: '#9f1239', badgeBg: '#ffe4e6', accent: '#e11d48' },
  7: { primary: '#2563eb', secondary: '#4f46e5', light: '#eff6ff', border: '#bfdbfe', text: '#1e40af', badgeBg: '#dbeafe', accent: '#2563eb' },
  8: { primary: '#0d9488', secondary: '#10b981', light: '#f0fdfa', border: '#99f6e4', text: '#115e59', badgeBg: '#ccfbf1', accent: '#0d9488' },
  9: { primary: '#9333ea', secondary: '#c026d3', light: '#faf5ff', border: '#e9d5ff', text: '#6b21a8', badgeBg: '#f3e8ff', accent: '#9333ea' }
};

function escapeXml(unsafe) {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = {
  CHAPTER_PALETTES,
  escapeXml,
  publicMindDir,
  distMindDir
};
