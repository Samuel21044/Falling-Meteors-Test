import { collisionDetection } from './collide.js';

export default class fallingBlocks {
  constructor(x, y, w, h) {
    this.x = x; this.y = y;
    this.w = 25; this.h = 25;
    this.speed = 0; this.maxSpeed = 100;
    this.timerTillNextBlock = 50;
  }

  moveDown() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }
  update(deltaTime, blockArray, player, game) {
    //speed
    this.y += this.speed / deltaTime;

    //delete when reaches end
    if(this.y > 700) {
      blockArray.shift();
    }

    //collide with player
    if(collisionDetection(2, 0, 0, this, player)) {

      //timers
      setTimeout(() => {
        for(let i = 0; i < game.fallingBlocksL.length; i++) {
          this.[i]stop();
        }
      }, 10);
      setTimeout(() => {
        //game.gamestate = 1;
      }, 1000);
  
      //adding points
      game.pointsScored = game.Score;
      game.totalPoints += game.pointsScored;
    }
  }
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}