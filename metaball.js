var Circle = require("./Circle.js");

const metaball = function(x, y, circles) {
  var sum = 0;
  for (var i = 0; i < circles.length; i++) {
    const c = new Circle(circles[i].x, circles[i].y, circles[i].r2);
    sum += c.field(x, y);
  }
  return sum;
};

module.exports = metaball;
