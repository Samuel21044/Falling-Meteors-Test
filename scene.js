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
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

let stars = [];
for(let i = 0; i < 100; i++) {
  stars.push(new star(Math.floor(Math.random() * 750), Math.floor(Math.random() * 640)));
}

export function mainBackground(ctx) {
  //do someting
  for(let i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
  }
}