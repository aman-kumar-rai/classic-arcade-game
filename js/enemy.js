const Entity = require("./entity.js");

class Enemy extends Entity {
  constructor(x, y, speed, sprite = "images/enemy-bug.png") {
    super(x, y, speed);
    this.sprite = sprite;
  }

  speedUp(value) {
    if (this.speed <= 500) {
      this.speed += value;
    }
  }

  update(td) {
    // updating the enemy x-coordinate every tick...
    this.x += this.speed * td;

    // resetting enemy position and speed when the reach to the edge...
    if (this.x > 300) {
      this.x = -50;

      this.speedUp(5);
    }
    // collision detection code goes here...
  }
}

module.exports = Enemy;
