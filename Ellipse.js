class Ellipse {
  constructor(x, y, a1, a2, b, theta, vx, vy) {
    this.x = x;
    this.y = y;
    this.a1 = a1;
    this.a2 = a2;
    this.b = b;
    this.theta = theta;
    this.vx = vx;
    this.vy = vy;
  }
  field(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;

    var s1 = (dx*Math.cos(this.theta) + dy*Math.sin(this.theta));
    if (s1 > 0) {
      s1 /= this.a2;
    } else {
      s1 /= this.a1;
    }
    s1 *= s1;

    var s2 = (dx*Math.sin(this.theta) - dy*Math.cos(this.theta));
    s2 *= s2;

    return 1/(s1 + s2/(this.b*this.b));
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.a2, this.b, this.theta, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.ellipse(this.x, this.y, this.a1, this.b, this.theta, Math.PI / 2, -Math.PI / 2);
    ctx.stroke();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.a2 * Math.cos(this.theta), this.y + this.a2 * Math.sin(this.theta));
    ctx.stroke();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.a1 * Math.cos(this.theta), this.y - this.a1 * Math.sin(this.theta));
    ctx.stroke();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.b * Math.cos(Math.PI / 2 + this.theta), this.y + this.b * Math.sin(Math.PI/2 + this.theta));
    ctx.stroke();
  }
  tick(canvas) {
    if (this.x > canvas.width) {
      this.vx = -Math.abs(this.vx);
    } else if (this.x < 0) {
      this.vx = +Math.abs(this.vx);
    }

    if (this.y > canvas.height) {
      this.vy = -Math.abs(this.vy);
    } else if (this.y < 0) {
      this.vy = +Math.abs(this.vy);
    }

    this.x += this.vx;
    this.y += this.vy;
  }
  static random(width, height) {
    var e = {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 2 * Math.random() - 1,
      vy: 2 * Math.random() - 1,
      a1: 30 + 30 * Math.random(),
      a2: 30 + 30 * Math.random(),
      b: 30 + 30 * Math.random(),
      theta: Math.random() * Math.PI
    };
      
    return new Ellipse(e.x, e.y, e.a1, e.a2, e.b, e.theta, e.vx, e.vy);
  }
}
  
  
  module.exports = Ellipse;