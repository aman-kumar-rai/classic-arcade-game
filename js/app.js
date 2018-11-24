const {startEngine, context} = require('./engine.js');

// specifying the images to load...
const imagesToLoad = [
  'images/water-block.png',
  'images/stone-block.png', 
  'images/grass-block.png',
  'images/char-horn-girl.png',
  'images/enemy-bug.png'
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
