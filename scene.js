export default class star{
  constructor(x, y) {
    this.x = x; this.y = y;
    this.size = 5;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  drawSun(ctx) {
    ctx.fillStyle = 'rgb(255, 218, 66, 0.95)';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

let stars = [];
for(let i = 0; i < 100; i++) {
  stars.push(new star(Math.floor(Math.random() * 750), Math.floor(Math.random() * 640)));
}
let sun = [];
for(let i = 0; i < 400; i++) {
  sun.push(new star(Math.floor(Math.random() * 750) / i, Math.floor(Math.random() * 500) / i));
}
export function mainBackground(ctx) {
  //stars and sun
  for(let i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
  }
  for(let i = 0; i < stars.length; i++) {
    sun[i].drawSun(ctx);
  }
}