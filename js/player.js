const Entity = require("./entity.js");

class Player extends Entity {
  constructor(x, y, speed, sprite = "images/char-horn-girl.png") {
    super(x, y, speed);
    this.sprite = sprite;
  }

  // we do not need this cause the player position is changed on user input...
  update() {}

  // method to reset the player location when water is reached...
  resetPlayer() {
    this.x = 100;
    this.y = 250;
  }

  // method to handle the arrow key/console input
  handleInput(direction) {
    switch (direction) {
      case "up":
        if(this.y >= 0){
          this.y -= 50;
        }
        // after changing position, check if the user has reached water...
        if(this.y == -50){

          // increasing the speed of every bug...

          // resetting the player position...
          this.resetPlayer();

          // increasing the score...
          // here we can write the logic for increasing the score based on the speed of the bugs...
          
        }

        break;

      case "down":
        if (this.y < 250) {
          this.y += 50;
        }
        break;

      case "left":
        if (this.x > 0) {
          this.x -= 50;
        }
        break;

      case "right":
        if (this.x < 250) {
          this.x += 50;
        }
        break;
    }
  }
}

module.exports = Player;
