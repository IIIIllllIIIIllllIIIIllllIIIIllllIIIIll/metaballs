/**
 * Simulation using marching squares to draw just corner samples and number IDs
 * for squares.
 */
var threshold = require("./threshold.js");
var classifyCells = require("./classify-cells.js");

var MarchingSquaresClassification = function(options) {
  this.canvas = options.canvas;
  this.config = options.config;

  this.ctx = this.canvas.getContext("2d");
};

MarchingSquaresClassification.prototype.tick = function(samples) {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  var cornerBools = threshold(samples, this.config.threshold);

  var cellTypes = classifyCells(cornerBools);

  this.ctx.fillStyle = '#888';
  for (var i = 0; i < cellTypes.length; i++) {
    for (var j = 0; j < cellTypes[i].length; j++) {
      var x = (j + 0.3) * this.config.pxSize;
      var y = (i + 0.75) * this.config.pxSize;

      this.ctx.fillText(cellTypes[i][j], x, y);
    }
  }

  for (var i = 0; i < cornerBools.length; i++) {
    for (var j = 0; j < cornerBools[i].length; j++) {
      var x = j * this.config.pxSize;
      var y = i * this.config.pxSize;

      if (cornerBools[i][j]) {
        this.ctx.fillStyle = "#0f0";
      } else {
        this.ctx.fillStyle = "#888";
      }
      this.ctx.fillRect(x, y, 2, 2);
    }
  };
};

module.exports = MarchingSquaresClassification;
