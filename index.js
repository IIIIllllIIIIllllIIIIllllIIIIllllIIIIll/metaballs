var _ = require("underscore");

var Simulation = require("./simulation.js");

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
  cellSize: 5,
  numCircles: 10,
  draw: function() {
    this.drawBg();
    // this.drawThresholdedCells();
    this.drawCircles('red');
    this.drawSmoothContours('white');
  }
});

simulation.draw();

window.simulation = simulation;