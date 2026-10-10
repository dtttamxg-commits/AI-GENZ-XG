const fs = require('fs');
const path = require('path');

const storePath = path.resolve(__dirname, '../server_data/store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

// Filter out old mindmaps
const nonMindmaps = store.items.filter(item => item.type !== 'mindmap');

// Import or recreate standard 36 mindmaps
const { ALL_36_INFOGRAPHICS } = require('../src/data/infographicsData');

const newMindmaps = ALL_36_INFOGRAPHICS.map(info => {
  const baseName = info.filename.replace(/\.(png|jpg|jpeg|webp|svg|html)$/i, '');
  const cleanTitle = info.title.startsWith('Bài ')
    ? `Sơ Đồ Tư Duy ${info.title}`
    : `Sơ Đồ Tư Duy: ${info.title}`;

  return {
    id: `mindmap-${info.id.replace('info-', '')}`,
    type: 'mindmap',
    title: cleanTitle,
    topic: `${info.chapterRoman}: ${info.shortTitle || info.title}`,
    description: info.description,
    url: `/mindmaps/${baseName}.html`,
    thumbnailUrl: `/mindmaps/${baseName}.png`,
    displayOrder: info.chapterNumber,
    isSample: false,
    createdAt: '2026-09-01T00:00:00.000Z',
    updatedAt: new Date().toISOString()
  };
});

store.items = [...nonMindmaps, ...newMindmaps];
fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
console.log(`Updated store.json: retained ${nonMindmaps.length} non-mindmaps and updated ${newMindmaps.length} new mindmaps. Total items: ${store.items.length}`);
