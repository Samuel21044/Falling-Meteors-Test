export default class player {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.w = 30; this.h = 62.5;
    this.speed = 0;
    this.maxSpeed = 120;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }
  update(deltaTime) {
    //speed x and y
    this.x += this.speed / deltaTime;

    //constrain
    if(this.x < 0 + 16) this.x = 16;
    if(this.x+this.w > 750-11) this.x = 750-this.w-11;
  }
  draw(ctx) {
    /*ctx.fillStyle = 'black';
    //black line
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = 'rgb(225, 125, 20)';
    //square itself
    ctx.fillRect(this.x + 5, this.y + 5, this.w-10, this.h-10);*/

    //the width and height is for the collision of the rocket ship. Not the actual rocket itslef
    ctx.drawImage(document.getElementById('defaultRocketShip'), this.x-12.5, this.y-15, 55, 97.5);
    ctx.fillStyle = 'rgb(255, 255, 255, 0.3)';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}