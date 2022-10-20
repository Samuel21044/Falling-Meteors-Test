export default class star{
  constructor(x, y) {
    this.x = x; this.y = y;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, 5, 5);
  }
}

let stars = [];
for(let i = 0; i < 500; i++) {
  stars.push(new star(Math.floor(Math.random() * 1350), Math.floor(Math.random() * 640)));
}

export function mainBackground(ctx) {
  //do someting
  for(let i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
  }
}