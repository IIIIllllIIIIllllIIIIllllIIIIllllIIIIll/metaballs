const metaball = function(x, y, circles) {
  var sum = 0;
  for (var i = 0; i < circles.length; i++) {
    const c = circles[i];
    sum += c.field(x, y);
  }
  return sum;
};

module.exports = metaball;
