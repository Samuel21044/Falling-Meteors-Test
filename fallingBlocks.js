
import { collisionDetection } from './collide.js';

export default class fallingBlocks {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.w = 25; this.h = 30;

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
          game.meteorsL = [];
          game.timerTillPoints = 600;
          //add save file here for points
        }
      }, 1000);
  
      //adding points
      game.totalPoints += game.pointsScored;
    }
  }
  draw(ctx) {
    //the width and height is for the collision of the rocket ship. Not the actual rocket itslef
    ctx.drawImage(document.getElementById('meteorOnFire'), this.x, this.y-20, 25, 50);
  }
}