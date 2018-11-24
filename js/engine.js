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
  allEnemies,
  lives;

  window.score = 0;

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

// method to check for collision
function checkCollision() {
  // console.log('control inside check collision');
  // checking collision of the player with each enemy
  allEnemies.forEach(enemy => {
    if (
      player.x >= enemy.x-50 &&
      player.x <= enemy.x+50 &&
      player.y == enemy.y
    ) {
      player.resetPlayer();
      console.log('Had ', lives, ' lives...');
      lives--;
      console.log(`Now has ${lives} lives`);
      if(lives === 0){
        console.log('Game over...');
      }
    }
    // break;
  });
}

// method for updating game state and checking for game events...
function update(td) {
  updateEntities(td);
  // we will check for collisions or player getting gems/heart in here...
  checkCollision();
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

  // rendering the updated entities...
  renderEntities();

  // rendering the score and health...
  renderScoreBoard();
}

// method to render the updated scorecard...
function renderScoreBoard(){
  document.querySelector('#score').textContent = score;
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
  player = new Player(100, 250, 0);
  allEnemies = [
    // top bug row...
    new Enemy(0, 50, 25),
    // next bug row...
    new Enemy(100, 100, 25),

    // next bug row...
    new Enemy(0, 150, 25),

    // last bug row...
    new Enemy(150, 200, 25)
  ];

  // setting the initial lives..
  lives = 3;

  // adding key listener to the DOM for devices with keyboards...
  document.addEventListener("keydown", function(e) {
    let direction;
    switch (e.keyCode) {
      case 37:
        direction = "left";
        break;
      case 38:
        direction = "up";
        break;
      case 39:
        direction = "right";
        break;
      case 40:
        direction = "down";
        break;
    }
    player.handleInput(direction);
  });

  // adding click listeners for the console of devices with touch screen...
  document.querySelector("#controls").addEventListener("click", function(e) {
    player.handleInput(e.target.getAttribute("data-dir"));
  });

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
