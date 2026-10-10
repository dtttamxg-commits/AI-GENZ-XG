const { MINDMAPS_DATA } = require('./mindmaps_curriculum_data.cjs');
const { MINDMAPS_DATA_PART2 } = require('./mindmaps_curriculum_data_part2.cjs');
const { MINDMAPS_DATA_PART3 } = require('./mindmaps_curriculum_data_part3.cjs');

const ALL_36_CURRICULUM_MINDMAPS = [
  ...MINDMAPS_DATA,
  ...MINDMAPS_DATA_PART2,
  ...MINDMAPS_DATA_PART3
];

console.log(`Loaded ${ALL_36_CURRICULUM_MINDMAPS.length} curriculum mindmaps.`);

module.exports = {
  ALL_36_CURRICULUM_MINDMAPS
};
