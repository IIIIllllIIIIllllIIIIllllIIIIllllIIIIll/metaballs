var _ = require("underscore");

var MarchingSquaresContour = require("./marching-squares-contour.js");


var config = {
  threshold: 1.0,
  numBalls: 40,
  pxSize: 5
};

var generateCircle = function() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: 2 * Math.random() - 1,
    vy: 2 * Math.random() - 1,
    r: 10 + 30 * Math.random()
  };
};

var circles = [];

var tickCircles = function() {
  while (config.numBalls > circles.length) {
    circles.push(generateCircle());
  }

  if (circles.length > config.numBalls) {
    circles = circles.slice(0, config.numBalls);
  }

  _.forEach(circles, function(circle, i) {
    if (circle.x + circle.r > canvas.width) {
      circle.vx = -Math.abs(circle.vx);
    } else if (circle.x - circle.r < 0) {
      circle.vx = +Math.abs(circle.vx);
    }

    if (circle.y + circle.r > canvas.height) {
      circle.vy = -Math.abs(circle.vy);
    } else if (circle.y - circle.r < 0) {
      circle.vy = +Math.abs(circle.vy);
    }

    circle.x += circle.vx;
    circle.y += circle.vy;
  });

  for (var i = 0; i < circles.length; i++) {
    circles[i].r2 = circles[i].r * circles[i].r;
  }
};

var metaball = function(x, y) {
  var sum = 0;
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    var dx = x - c.x;
    var dy = y - c.y;

    var d2 = dx * dx + dy * dy;
    sum += c.r2 / d2;
  }
  return sum;
};

var canvas = document.getElementById("main-canvas");
canvas.width = window.innerWidth;

var contour = new MarchingSquaresContour({
  canvas: canvas,
  fn: metaball,
  config: config
});

var tick = function() {
  tickCircles();

  contour.tick();

  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
