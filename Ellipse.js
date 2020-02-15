class Ellipse {
    constructor(x, y, a, b, theta, vx, vy) {
      this.x = x;
      this.y = y;
      this.a = a;
      this.b = b;
      this.theta = 0;
      this.vx = vx;
      this.vy = vy;
    }
    field(x, y) {
      var dx = x - this.x;
      var dy = y - this.y;
  
      var s1 = (dx*Math.cos(this.theta) + dy*Math.sin(this.theta));
      s1 *= s1;

      var s2 = (dx*Math.sin(this.theta) - dy*Math.cos(this.theta));
      s2 *= s2;

      return 1/(s1/(this.a*this.a) + s2/(this.b*this.b));
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.a, this.b, this.theta, 0, 2*Math.PI);
      ctx.stroke();
    }
    static random(width, height) {
      var e = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 2 * Math.random() - 1,
        vy: 2 * Math.random() - 1,
        a: 30 + 30 * Math.random(),
        b: 30 + 30 * Math.random(),
        theta: Math.random() * Math.PI
      };
        
      return new Ellipse(e.x, e.y, e.a, e.b, e.theta, e.vx, e.vy);
    }
  }
  
  
  module.exports = Ellipse;