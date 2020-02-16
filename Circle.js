class Circle {
  constructor(x, y, r, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
  }
  field(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;

    var d2 = dx * dx + dy * dy;
    return this.r * this.r / d2;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
  }
  tick(canvas) {
    if (this.x + this.r > canvas.width) {
      this.vx = -Math.abs(this.vx);
    } else if (this.x - this.r < 0) {
      this.vx = +Math.abs(this.vx);
    }

    if (this.y + this.r > canvas.height) {
      this.vy = -Math.abs(this.vy);
    } else if (this.y - this.r < 0) {
      this.vy = +Math.abs(this.vy);
    }

    this.x += this.vx;
    this.y += this.vy;
  }
  static random(width, height) {
    var circle = {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 2 * Math.random() - 1,
      vy: 2 * Math.random() - 1,
      r: 30 + 30 * Math.random()
    };
    
    return new Circle(circle.x, circle.y, circle.r, circle.vx, circle.vy);
  }
}


module.exports = Circle;