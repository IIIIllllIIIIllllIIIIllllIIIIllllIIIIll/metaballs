const add = function(v, w) {
  return {
    x: v.x + w.x,
    y: v.y + w.y
  }
}

const sub = function(v, w) {
  return {
    x: v.x - w.x,
    y: v.y - w.y
  }
}

const dot = function(v, w) {
  return v.x*w.x + v.y*w.y;
}

const mul = function(k, v) {
  return {
    x: k*v.x,
    y: k*v.y
  }
}

const distance2 = function(v, w) {
  var x2 = v.x - w.x;
  x2 *= x2;
  var y2 = v.y - w.y;
  y2 *= y2;
  return x2 + y2;
}

const distance = function(v, w) {
  return Math.sqrt(distance2(v, w));
}

class Segment {
    constructor(v, w, r) {
      this.v = v;
      this.w = w;
      this.r = r;
    }
    field(x, y, debug) {
      const l2 = distance2(this.v, this.w);
      const p = {x, y};

      if (l2 == 0) return distance(p, this.v);

      var t = dot(sub(p, this.v), sub(this.w, this.v)) / l2;
      t = Math.max(0, Math.min(1, t));

      const proj = add(this.v, mul(t, sub(this.w, this.v)));

      const r1 = this.r * 0.4;
      const r2 = this.r * 1.5;

      const r = t * r1 + (1-t)*r2;

      if (debug) {
        console.log(proj);
        console.log(distance(p, proj));
        console.log( r * r / distance(p, proj));
      }


      return r * r / distance2(p, proj);
    }
    draw(ctx) {

      ctx.beginPath();
      ctx.moveTo(this.v.x, this.v.y);
      ctx.lineTo(this.w.x, this.w.y);
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
        
      return new Segment(v, w, 15 + 15 * Math.random());
    }
  }
  
  
  module.exports = Segment;