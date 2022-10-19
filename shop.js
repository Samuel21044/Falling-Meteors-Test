import { collisionDetection } from './collide.js';

let canvas = document.getElementById('screen');
let rect = canvas.getBoundingClientRect();

export default class Shop {
  constructor(game, type, x, y, item) {
    this.tab = 1; this.type = type;
    this.item = item;
    this.x = x; this.y = y;
    this.w = 50; this.h = 50;
    this.game = game;
  }

  update() {
   canvas.addEventListener('click', (e) => {
    //defining x and y
    let x = e.clientX - rect.left; let y = e.clientY - rect.top;

    if(this.game.gamestate === 3) {
      if(collisionDetection(1, x, y, this)){
        // do something
        //I also need to show the type to make sure nothing  breaks and it changes the right thing
      }
    }
  });
  }
  draw(ctx) {
    //all of this is useless
    if(this.tab === 1) {
      if(this.type === 1) {
        ctx.drawImage(this.item, this.x, this.y, this.w, this.h);
      }
    }
    if(this.tab === 2) {
      if(this.type === 2) {
        ctx.drawImage(this.item, this.x, this.y, this.w, this.h);
      }
    }
    if(this.tab === 3) {
      if(this.type === 3) {
        ctx.drawImage(this.item, this.x, this.y, this.w, this.h);
      }
    }
  }
}