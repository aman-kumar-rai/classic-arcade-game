const {load, onReady} = require('./resources.js');

// creating a canvas and getting a 2D context for it...
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// lastTime to calculate the tick for the game...
let lastTime;

// setting the height and width of canvas
canvas.height = 606;
canvas.width = 505;


function gameTick(){
  // getting the time delta for the current tick...
  const now = Date.now();
  const td = (now -lastTime) / 1000.0;

  // updating the data for the game and then re-rendering the UI...
  update(td);
  render();

  // setting the lastTime for next tick
  lastTime = now;

  // asking the browser for doing the animation when possible...
  requestAnimationFrame(gameTick);
}


// method to initialize the game...
function init(){
  reset();
  // setting the lastTime before the game starts...
  lastTime = Date.now();
  gameTick();
}

// method for updating game state and checking for events like collision or gem/heart collection...
function update(td){
  updateEntities(td);
  // we will check for collisions or player getting gems/heart in here...
}

// method for updating the game state...
function updateEntities(){

}

// method to update the UI for game board and all other entities...
function render(){

  // code for rendering/re-rendering the game board...

  renderEntities();
}

// method to update the UI of all the entities...
function renderEntities(){

}

// method with logic to restart the game...
function reset(){

}

load([
  'images/stone-block.png',
  'images/water-block.png',
  'images/grass-block.png',
  'images/enemy-bug.png',
  'images/char-boy.png'
]);

onReady(init);



// exporting the context to be used in app.js
module.exports = context;