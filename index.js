var _ = require("underscore");

const Simulation = require("./simulation.js");
const goose = require("./goose.js");

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
  numCircles: 0,
  draw: function() {
    this.drawBg();
    // this.drawThresholdedCells();
    this.drawCircles('grey');
    this.drawSmoothContours('white');
  }
});

goose(simulation._circles);



simulation.draw();

setInterval(function() {
  simulation.tick();
  simulation.draw();
}, 10);

window.simulation = simulation;