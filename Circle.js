class Circle {
  constructor(x, y, r2, vx, vy) {
    this.x = x;
    this.y = y;
    this.r2 = r2;
    this.vx = vx;
    this.vy = vy;
  }
  field(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;

      /*
      diamond
      
  var d2 = Math.abs(dx) + Math.abs(dy);
  d2 *= d2
  return this.r2 / d2;
      */

    var d2 = dx * dx + dy * dy;
    return this.r2 / d2;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, Math.sqrt(this.r2), 0, 2 * Math.PI);
    ctx.stroke();
  }
  static random(width, height) {
    var circle = {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 2 * Math.random() - 1,
      vy: 2 * Math.random() - 1,
      r: 30 + 30 * Math.random()
    };
  
    circle.r2 = circle.r * circle.r;
  
    return new Circle(circle.x, circle.y, circle.r2, circle.vx, circle.vy);
  }
}


module.exports = Circle;