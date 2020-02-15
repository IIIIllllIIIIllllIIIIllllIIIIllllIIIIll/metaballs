class Diamond {
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
        
      var d2 = Math.abs(dx) + Math.abs(dy);
      d2 *= d2
      return this.r2 / d2;
    }
    draw(ctx) {
      const r = Math.sqrt(this.r2);

      ctx.beginPath();
      ctx.moveTo(this.x - r, this.y);
      ctx.lineTo(this.x, this.y - r);
      ctx.stroke();
      ctx.lineTo(this.x + r, this.y);
      ctx.stroke();
      ctx.lineTo(this.x, this.y + r);
      ctx.stroke();
      ctx.lineTo(this.x - r, this.y);
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
    
      return new Diamond(circle.x, circle.y, circle.r2, circle.vx, circle.vy);
    }
  }
  
  
  module.exports = Diamond;