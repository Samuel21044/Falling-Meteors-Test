export default class player {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.w = 30; this.h = 62.5;
    this.Iw = 65; this.Ih = 97.5;
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
    //the width and height is for the collision of the rocket ship. Not the actual rocket itslef
    ctx.drawImage(document.getElementById('defaultRocketShip'), this.x-17.5, this.y-15, this.Iw, this.Ih);
  }
}