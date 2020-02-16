const { add, sub, dot, mul, distance2, distance } = require('./util.js');

const distance2_point_segment = function(p, v, w) {
  const l2 = distance2(v, w);

  var t = dot(sub(p, v), sub(w, v)) / l2;
  t = Math.max(0, Math.min(1, t));

  const proj = add(v, mul(t, sub(w, v)));

  return {
    t,
    'distance2': distance2(p, proj)
  }
}

const distance2_point_polysegment = function(p, vertices) {
  var candidates = [];
  for (var i=0; i<this.points.length - 1; i++) {
    candidates.push(distance2_point_segment(p, vertices[i], vertices[i+1]));
  }
  var min_idx = 0;
  for (var i=0; i<candidates.length; i++) {
    if (candidates[i].distance2 < candidates[min_idx].distance2) {
      min_idx = i;
    }
  }
  return candidates[min_idx];
}

class Segment {
    constructor(points, radii) {
      this.points = points;
      this.radii = radii;
    }
    field(x, y) {

      const p = {x, y};
      
      const [v, w] = this.points;
      const [r1, r2] = this.radii;

      const {t, 'distance2': d2} = distance2_point_segment(p, v, w);

      const r = t * r1 + (1-t)*r2;

      return r * r / d2;
    }
    draw(ctx) {
      ctx.beginPath();
      for (var i=0; i<this.points.length - 1; i++) {
        const v = this.points[i];
        const w = this.points[i+1];
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(w.x, w.y);
        ctx.stroke();  
      }
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