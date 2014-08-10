var _ = require("underscore");

var sample = require("./sample.js");

var MarchingSquaresContour = require("./marching-squares-contour.js");
var MarchingSquaresClassification = require("./marching-squares-classification.js");


var config = {
  threshold: 1.0,
  numBalls: 20,
  pxSize: 20
};

var width = window.innerWidth;
var height = 200;

var generateCircle = function() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
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
    if (circle.x + circle.r > width) {
      circle.vx = -Math.abs(circle.vx);
    } else if (circle.x - circle.r < 0) {
      circle.vx = +Math.abs(circle.vx);
    }

    if (circle.y + circle.r > height) {
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

var setupCanvas = function(id) {
  var canvas = document.getElementById(id);
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

var contour = new MarchingSquaresContour({
  canvas: setupCanvas("ms-contour"),
  config: config,
  lerp: false
});

var contourLerp = new MarchingSquaresContour({
  canvas: setupCanvas("ms-contour-lerp"),
  config: config,
  lerp: true
});

var classification = new MarchingSquaresClassification({
  canvas: setupCanvas("ms-classification-corners"),
  config: config
});

var tick = function() {
  tickCircles();

  var cornerSums = sample({
    minX: 0,
    maxX: width,
    stepX: config.pxSize,
    minY: 0,
    maxY: height,
    stepY: config.pxSize,
    fn: metaball
  });

  contour.tick(cornerSums);
  contourLerp.tick(cornerSums);
  classification.tick(cornerSums);

  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
