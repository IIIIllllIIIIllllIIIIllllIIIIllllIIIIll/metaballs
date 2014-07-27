var _ = require('underscore');
var sylvester = require('sylvester');

var canvas = document.getElementById('main-canvas');
var screenCtx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var $V = sylvester.Vector.create;

var circles = _.range(40).map(function() {
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
});

var backBuffer = document.createElement('canvas');
backBuffer.width = canvas.width;
backBuffer.height = canvas.height;
var ctx = backBuffer.getContext('2d');

var draw = function() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  var CHUNK_SIZE = Math.floor(canvas.height / 100);
  for (var x = 0; x < canvas.width; x += CHUNK_SIZE) {
    for (var y = 0; y < canvas.height; y += CHUNK_SIZE) {
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

      if (sum > 1.0) {
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(x, y, CHUNK_SIZE, CHUNK_SIZE);
      }
    }
  }

  screenCtx.drawImage(backBuffer, 0, 0);

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
