const make_circle = function(c_x, c_y, r2) {
  return function(x, y) {
    var dx = x - c_x;
    var dy = y - c_y;

    var d2 = dx * dx + dy * dy;
    return r2 / d2;
  }
}

const metaball = function(x, y, circles) {
  var sum = 0;
  for (var i = 0; i < circles.length; i++) {
    const c = circles[i];
    const circle_field = make_circle(c.x, c.y, c.r2);
    sum += circle_field(x, y);
  }
  return sum;
};

module.exports = metaball;
