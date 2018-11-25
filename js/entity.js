const {get} = require('./resources.js');

class Entity{
  constructor(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  render(){
    context.drawImage(get(this.sprite), this.x, this.y, 50, 50);
  }
}

module.exports = Entity;