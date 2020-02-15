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
  numCircles: 1,
  draw: function() {
    this.drawBg();
    // this.drawThresholdedCells();
    this.drawCircles('grey');
    this.drawSmoothContours('white');
  }
});

simulation.draw();

console.log("f(0, 0)=", simulation._circles[0].field(0, 0, true));

window.simulation = simulation;