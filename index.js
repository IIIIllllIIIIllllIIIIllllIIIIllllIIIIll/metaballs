var _ = require("underscore");

var Simulation = require("./simulation.js");
var Ellipse = require("./Ellipse.js");
var Circle = require("./Circle.js");
var Segment = require("./Segment.js");


var width = 700;
var height = 500;

var newCanvas = function() {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas;
};

var simulation = new Simulation({
  canvas: newCanvas(),
  cellSize: 1,
  numCircles: 0,
  draw: function() {
    this.drawBg();
    // this.drawThresholdedCells();
    this.drawCircles('grey');
    this.drawSmoothContours('white');
  }
});

// l'oie est la
simulation._circles.push(new Ellipse(
  300, 300, 180, 90, 80, -Math.PI/8, 0, 0
));
simulation._circles.push(new Segment(
  [
    {x: 300, y: 300},
    {x: 450, y: 120}, 
    {x: 500, y: 100}
  ],
  [
    25,
    8,
    4
  ]
));
simulation._circles.push(new Circle(
  500, 100, 20, 0, 0
));
simulation._circles.push(new Circle(
  530, 100, 6, 0, 0
));
simulation.draw();

setInterval(function() {
  simulation.tick();
  simulation.draw();
}, 10);

window.simulation = simulation;