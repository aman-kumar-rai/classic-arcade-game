const {context, startOrRestartGame, startEngine} = require('./engine.js');
const {load} = require('./resources.js');

const imagesToLoad = [
  'images/water-block.png',   // Top row is water
  'images/stone-block.png',   // Row 1 of 3 of stone
  'images/grass-block.png',   // Row 1 of 2 of grass
];

const rowImages = [
  'images/water-block.png',   // Top row is water
  'images/stone-block.png',   // Row 1 of 3 of stone
  'images/stone-block.png',   // Row 2 of 3 of stone
  'images/stone-block.png',   // Row 3 of 3 of stone
  'images/grass-block.png',   // Row 1 of 2 of grass
  'images/grass-block.png'    // Row 2 of 2 of grass
];

startEngine(250, 300, 6, 5, rowImages, imagesToLoad);