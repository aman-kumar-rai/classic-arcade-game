const { load, onReady, get } = require("./resources.js");
const Player = require("./player.js");
const Enemy = require("./enemy.js");

// creating variables for lastTime and context...
let lastTime,
  cellWidth,
  cellHeight,
  rows,
  cols,
  rowImages,
  canvas,
  player,
  allEnemies;

function gameTick() {
  // getting the time delta for the current tick...
  const now = Date.now();
  const td = (now - lastTime) / 1000.0;

  // updating the data for the game and then re-rendering the UI...
  update(td);
  render();

  // setting the lastTime for next tick
  lastTime = now;

  // asking the browser for doing the animation when possible...
  requestAnimationFrame(gameTick);
}

// method to initialize the game...
function init() {
  // setting the lastTime before the game starts...
  lastTime = Date.now();
  gameTick();
}

// method for updating game state and checking for game events...
function update(td) {
  updateEntities(td);
  // we will check for collisions or player getting gems/heart in here...
}

// method to update state of all game entities...
function updateEntities(td) {
  player.update(td);
  allEnemies.forEach(enemy => enemy.update(td));
}

// method to update the UI for game board and all other entities...
function render() {
  // code for rendering/re-rendering the game board...
  // clearing the canvas before drawing over it again so that no glitch is caused...
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      context.drawImage(
        get(rowImages[row]),
        col * cellWidth,
        row * cellHeight,
        cellWidth,
        cellHeight
      );
    }
  }

  renderEntities();
}

// method to update the UI of all the entities...
function renderEntities() {
  player.render();
  allEnemies.forEach(enemy => enemy.render());
}

// method with logic to restart the game...
function startOrRestartGame(imagesToLoad) {
  load(imagesToLoad);

  // initializing the game once the images are loaded...
  onReady(init);
}

// function to initialize the game board...
function startEngine(
  canvasWidth,
  canvasHeight,
  rowCount,
  colCount,
  images,
  imagesToLoad
) {

  // creating the player and enemies and this code will later go into a function...
  player = new Player(100, 200, 0);
  allEnemies = [new Enemy(50, 50, 10)];

  // creating a canvas and getting a 2D context for it...
  canvas = document.createElement("canvas");
  window.context = canvas.getContext("2d");

  // setting the width and height of canvas...
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // setting the height and width of a cell
  cellWidth = canvasWidth / colCount;
  cellHeight = canvasHeight / rowCount;

  // cellWidth = 50;
  // cellHeight= 50;

  // setting the rowCount and colCount for use in other functions...
  rows = rowCount;
  cols = colCount;

  // setting the rowImages variable for use in other functions...
  rowImages = images;

  // rendering the game-board to the DOM...
  document.querySelector("#game-board").appendChild(canvas);

  // starting the game now...
  startOrRestartGame(imagesToLoad);
}

// exporting the context...
module.exports = {
  // context,
  startOrRestartGame,
  startEngine
};
