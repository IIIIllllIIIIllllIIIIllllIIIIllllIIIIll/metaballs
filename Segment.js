const { add, sub, dot, mul, distance2, distance } = require('./util.js');

class Segment {
    constructor(points, radii) {
      this.points = points;
      this.radii = radii;
    }
    field(x, y) {

      const [v, w] = this.points;
      const [r1, r2] = this.radii;

      const l2 = distance2(v, w);
      const p = {x, y};

      var t = dot(sub(p, v), sub(w, v)) / l2;
      t = Math.max(0, Math.min(1, t));

      const proj = add(v, mul(t, sub(w, v)));

      const r = t * r1 + (1-t)*r2;

      return r * r / distance2(p, proj);
    }
    draw(ctx) {

      const [v, w] = this.points;

      ctx.beginPath();
      ctx.moveTo(v.x, v.y);
      ctx.lineTo(w.x, w.y);
      ctx.stroke();
    }
    tick(_ctx) {}
    static random(width, height) {
      const v = {
        x: Math.random() * width,
        y: Math.random() * height,
      };
      const w = {
        x: Math.random() * width,
        y: Math.random() * height,
      };
        
      return new Segment([v, w], 15 + 15 * Math.random(), 15 + 15 * Math.random());
    }
  }
  
  
  module.exports = Segment;