var _ = require("underscore");
var dat = require("exports?dat!./dat.gui.js");
var Stats = require("exports?Stats!./Stats.js");

var sample = require("./sample.js");
var threshold = require("./threshold.js");
var classifyCells = require("./classify-cells.js");
var cellTypeToPolyCorners = require("./cell-type-to-poly-corners.js");

var canvas = document.getElementById("main-canvas");
var screenCtx = canvas.getContext("2d");

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var config = {
  threshold: 1.0,
  numBalls: 40,
  pxSize: 30,
  polarity: false
};

var gui = new dat.GUI();
gui.add(config, "threshold", 0.1, 1.0);
gui.add(config, "numBalls", 10, 100).step(1);
gui.add(config, "pxSize", 1, 50).step(1);
gui.add(config, "polarity");

var generateCircle = function() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: 20 * Math.random() - 10,
    vy: 20 * Math.random() - 10,
    r: 10 + 30 * Math.random()
  };
};

var circles = [];

var backBuffer = document.createElement("canvas");
backBuffer.width = canvas.width;
backBuffer.height = canvas.height;
var ctx = backBuffer.getContext("2d");

var mouseX = 100;
var mouseY = 100;

canvas.addEventListener("mousemove", function(evt) {
  mouseX = evt.offsetX;
  mouseY = evt.offsetY;
});

var tickCircles = function() {
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
    r: 50
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

    /*
    circle.x += circle.vx;
    circle.y += circle.vy;
    */
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

var tick = function() {
  stats.begin();

  tickCircles();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var cornerSums = sample({
    minX: 0,
    maxX: canvas.width,
    stepX: config.pxSize,
    minY: 0,
    maxY: canvas.height,
    stepY: config.psSize,
    fn: metaball
  });

  var cornerBools = threshold(cornerSums, config.threshold);
  var cellTypes = classifyCells(cornerBools);

  _.forEach(cellTypes, function(typeRow, i) {
    _.forEach(typeRow, function(cellType, j) {

      var compassCoords = {
        "NW": [i       , j      ],
        "N" : [i       , j + 0.5],
        "NE": [i       , j + 1  ],
        "W" : [i + 0.5 , j      ],
        "E" : [i + 0.5 , j + 1  ],
        "SW": [i + 1   , j      ],
        "S" : [i + 1   , j + 0.5],
        "SE": [i + 1   , j + 1  ]
      };

      var polyCompassCorners = cellTypeToPolyCorners[cellType];

      ctx.fillStyle = "#f00";
      ctx.beginPath();
      _.forEach(polyCompassCorners, function(polyCorner, k) {
        var coords = compassCoords[polyCorner];
        var x = coords[1] * config.pxSize;
        var y = coords[0] * config.pxSize;

        if (k === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#fff";
      ctx.fillText(
        cellType,
        (j + 0.5) * config.pxSize,
        (i + 0.5) * config.pxSize
      );
    });
  });

  _.forEach(cornerBools, function(boolRow, i) {
    _.forEach(boolRow, function(cell, j) {
        if (cell) {
          ctx.fillStyle = "#fff";
        } else {
          ctx.fillStyle = "#933";
        }
        ctx.fillRect(
          j * config.pxSize,
          i * config.pxSize,
          5,
          5
        );
    });
  });

  screenCtx.drawImage(backBuffer, 0, 0);

  requestAnimationFrame(tick);
  stats.end();
};

requestAnimationFrame(tick);
