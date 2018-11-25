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
  lives,
  livesLost,
  scoreElement = document.querySelector("#score"),
  livesElement = document.querySelector("#health"),
  // stores the id returned by requestAnimationFrame()
  requestId;

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
  requestId = requestAnimationFrame(gameTick);
}

// method to initialize the game...
function init() {
  // setting the lastTime before the game starts...
  lastTime = Date.now();
  gameTick();
}

// method to check for collision
// ???????????????????????????????????????????????????????????????????
// Need to write code to fix the extra comparisions...
function checkCollision() {
  allEnemies.forEach(enemy => {
    if (
      player.x >= enemy.x - 45 &&
      player.x <= enemy.x + 45 &&
      player.y == enemy.y
    ) {
      player.resetPlayer();
      livesLost = true;
      lives--;
    }
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
  renderScoreBoard();
}

// method to render the updated scorecard...
function renderScoreBoard() {
  scoreElement.textContent = score;
  if (livesLost) {
    livesElement.children[lives].classList.toggle("alive");
    livesLost = false;

    if (lives == 0) {
      // here we will show the modal for game over...
      startOrRestartGame();
    }
  }
}

// method to update the UI of all the entities...
function renderEntities() {
  player.render();
  allEnemies.forEach(enemy => enemy.render());
}

// method with logic to restart the game...
function startOrRestartGame(imagesToLoad) {
  load(imagesToLoad);

  // creating the player and enemies...
  player = new Player(100, 250, 0);
  allEnemies = [
    new Enemy(0, 50, 25),
    new Enemy(100, 100, 25),
    new Enemy(0, 150, 25),
    new Enemy(150, 200, 25)
  ];

  // setting the initial lives count, livesLost status and score...
  lives = 3;
  (livesLost = false), (window.score = 0);

  // adding 'alive' class to all the life bars...
  for(i=0; i<3; i++){
    livesElement.children[i].classList.add('alive');
  }

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
    player.handleInput(direction, allEnemies);
  });

  // adding click listeners for the console of devices with touch screen...
  document.querySelector("#controls").addEventListener("click", function(e) {
    player.handleInput(e.target.getAttribute("data-dir"), allEnemies);
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
  startEngine
};
