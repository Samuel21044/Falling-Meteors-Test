
import { collisionDetection } from './collide.js';

export default class fallingBlocks {
  constructor(x, y, w, h) {
    this.x = x; this.y = y;
    this.w = 30; this.h = 30;
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
      game.gameOver = true;
      player.stop();

      //timer
      setTimeout(() => {
        if(game.gameOver) {
          game.gamestate = 1;
          game.gameOver = false;
          player.x = 375 - player.w / 2;
          game.fallingBlocksL = [];
          game.timerTillPoints = 600;
          //add save file here for points
        }
      }, 1000);
  
      //adding points
      game.totalPoints += game.pointsScored;
    }
  }
  draw(ctx) {
    ctx.fillStyle = 'white';
    //ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(document.getElementById('meteor'), this.x, this.y, this.w, this.h);
  }
}