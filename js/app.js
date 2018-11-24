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
  'images/water-block.png',   // Row 1 of 1 of water
  'images/stone-block.png',   // Row 1 of 4 of stone
  'images/stone-block.png',   // Row 2 of 4 of stone
  'images/stone-block.png',   // Row 3 of 4 of stone
  'images/stone-block.png',   // Row 4 of 4 of grass
  'images/grass-block.png'    // Row 1 of 1 of grass
];
startEngine(300, 300, 6, 6, rowImages, imagesToLoad);
