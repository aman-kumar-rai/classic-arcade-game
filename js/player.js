const Entity = require("./entity.js");

class Player extends Entity {
  constructor(x, y, speed, sprite = "images/char-horn-girl.png") {
    super(x, y, speed);
    this.sprite = sprite;
  }

  update() {
  }

  // function to increase enemy speeds when the player reaches water...

  // resetting the player position once the player reaches water...
  // resetPlayer() {
  //   this.startingX = 100;
  //   this.startingY = 250;

  //   this.x = this.startingX;
  //   this.y = this.startingY;
  // }

  // method to handle the arrow key/console input
  // handleInput(direction) {
  //   switch (direction) {
  //     case "up":
  //       break;

  //     case "down":
  //       break;

  //     case "left":
  //       break;

  //     case "right":
  //       break;
  //   }
  // }
}

module.exports = Player;