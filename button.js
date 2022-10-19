import { collisionDetection } from './collide.js';

let canvas = document.getElementById('screen');
let rect = canvas.getBoundingClientRect();

export default class Button {
  constructor(game, x, y, w, h, text, round, fontSize, fontType, color, textColor){
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.text = text || '';
    this.round = round || 0;
    this.fontSize = fontSize || '20px'; 
    this.fontType = fontType || ' black Times New Roman';
    this.color = color || 'rgb(200, 200, 200)'; 
    this.textColor = textColor || 'rgb(0, 0, 0)';
    this.game = game;
  }

  shopUpdate() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 1) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 3;
        }
      }
    });
  }
  goBackUpdate() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          this.game.gamestate = 1;
        }
      }
    });
  }
  shop1Update() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          for(let i = 0; i < this.game.shopItems.length; i++) {
            this.game.shopItems[i].tab = 1;
          }
        }
      }
    });
  }
  shop2Update() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          for(let i = 0; i < this.game.shopItems.length; i++) {
            this.game.shopItems[i].tab = 2;
          }
        }
      }
    });
  }
  shop3Update() {
    canvas.addEventListener('mousemove', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      //mouse is over button
      if(collisionDetection(1, x, y, this)){
        this.color = 'rgb(180, 180, 180)';
      } else {
        this.color = 'rgb(200, 200, 200)';
      }
    });
    //clicking
    canvas.addEventListener('click', (e) => {
      //defining x and y
      let x = e.clientX - rect.left; let y = e.clientY - rect.top;

      if(this.game.gamestate === 3) {
        if(collisionDetection(1, x, y, this)){
          for(let i = 0; i < this.game.shopItems.length; i++) {
            this.game.shopItems[i].tab = 3;
          }
        }
      }
    });
  }

  draw(ctx){
    //draw
    //rect
    //ctx.fillRect(this.x,this.y,this.w,this.h);
    ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.w, this.h, [this.round]);
      ctx.fillStyle = this.color;
      ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.fill();
    //text
    ctx.textAlign = 'center'; ctx.fillStyle = this.textColor; 
    ctx.font = this.fontSize + this.fontType;
    ctx.fillText(this.text,this.x + this.w/2,this.y + this.h/2 + parseFloat(this.fontSize) * 0.7 / 2);
  }
}