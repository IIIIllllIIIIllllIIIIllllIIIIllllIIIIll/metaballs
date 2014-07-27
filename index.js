var _ = require('underscore');

var canvas = document.getElementById('main-canvas');
var screenCtx = canvas.getContext('2d');
var dat = require('exports?dat!./dat.gui.js');
var Stats = require('exports?Stats!./Stats.js');

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var config = {
  threshold: 1.0,
  numBalls: 40,
  pxSize: 10
};

var gui = new dat.GUI();
gui.add(config, 'threshold', 0.5, 2.0);
gui.add(config, 'numBalls', 10, 100);
gui.add(config, 'pxSize', 1, 50);

var generateCircle = function() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: 20 * Math.random() - 10,
    vy: 20 * Math.random() - 10,
    r: 10 + 30 * Math.random(),
    red: Math.random() * 170 + 20,
    green: Math.random() * 170 + 20,
    blue: Math.random() * 170 + 20,
  };
};

var circles = [];

var backBuffer = document.createElement('canvas');
backBuffer.width = canvas.width;
backBuffer.height = canvas.height;
var ctx = backBuffer.getContext('2d');

var mouseX = 100;
var mouseY = 100;

canvas.addEventListener('mousemove', function(evt) {
  mouseX = evt.offsetX;
  mouseY = evt.offsetY;
});

var draw = function() {
  stats.begin();

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  while (config.numBalls > circles.length) {
    circles.push(generateCircle());
  }

  if (circles.length > config.numBalls) {
    circles = circles.slice(0, config.numBalls);
  }

  if (circles.length > 0) {
    circles.pop();
  }

  circles.push({
    x: mouseX,
    y: mouseY,
    vx: 0,
    vy: 0,
    r: 50,
    red: 255,
    green: 255,
    blue: 255
  });

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

  for (var x = 0; x < canvas.width; x += config.pxSize) {
    for (var y = 0; y < canvas.height; y += config.pxSize) {
      var sum = 0;
      var red = 0;
      var green = 0;
      var blue = 0;

      var closestDist = Infinity;

      for (var i = 0; i < circles.length; i++) {
        var c = circles[i];
        var dx = x - c.x;
        var dy = y - c.y;

        var d2 = dx * dx + dy * dy;

        var contrib = c.r * c.r / (dx * dx + dy * dy);
        sum += contrib;

        if (d2 < closestDist) {
          closestDist = d2;
          red = c.red;
          green = c.green;
          blue = c.blue;
        }
      }

      red = Math.floor(red);
      green = Math.floor(green);
      blue = Math.floor(blue);

      if (sum > config.threshold) {
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, y, config.pxSize, config.pxSize);
      }
    }
  }

  screenCtx.drawImage(backBuffer, 0, 0);

  requestAnimationFrame(draw);
  stats.end();
};

requestAnimationFrame(draw);
