const Entity = require('./entity.js');

class Enemy extends Entity{

  constructor(x, y, speed, sprite='images/enemy-bug.png'){
    super(x, y, speed);
    this.sprite = sprite;
  }

  update(td){
    // updating the enemy x-coordinate every time...
    console.log(this);
    this.x += this.speed * td;

    // resetting enemy position and speed when the reach to the edge...
    if(this.x > 250){
      this.x = -50;
    }
    // collision detection code goes here...

  }
}

module.exports = Enemy;