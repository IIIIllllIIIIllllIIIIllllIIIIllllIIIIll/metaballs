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
  cellSize: 40,
  numCircles: 10,
  draw: function() {
    this.drawBg();
    this.drawCircles();
  }
});

simulation.draw();

simulation.clone({
  canvas: newCanvas(),
  draw: function() {
    this.drawBg();
    this.drawThresholdedCells();
    this.drawGridLines(this._cellSize / 2, this._cellSize / 2);
    this.drawCircles('#900');
    this.drawCornerSamples();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  cellSize: 5,
  draw: function() {
    this.drawBg();
    this.drawThresholdedCells();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  cellSize: 40,
  numCircles: 10,
  draw: function() {
    this.drawBg();
    this.drawCircles();
    this.drawGridLines();
    this.drawCornerSamples();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  draw: function() {
    this.drawBg();
    this.drawCircles();
    this.drawCornerSamples();
    this.drawGridLines();
    this.drawThresholdedCorners();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  draw: function() {
    this.drawBg();
    this.drawThresholdedCorners();
    this.drawGridLines();
    this.drawCellClassification();
    this.draw45DegContours();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  cellSize: 5,
  draw: function() {
    this.drawBg();
    this.draw45DegContours();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  draw: function() {
    this.drawBg();
    this.drawGridLines();
    this.drawSmoothContours();
  }
}).draw();

simulation.clone({
  canvas: newCanvas(),
  cellSize: 5,
  draw: function() {
    this.drawBg();
    this.drawSmoothContours();
  }
}).draw();
