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

module.exports = { add, sub, dot, mul, distance2, distance };