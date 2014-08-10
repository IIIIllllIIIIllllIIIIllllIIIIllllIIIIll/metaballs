/**
 * Simulation using marching squares to draw just the contour lines.
 */

var cellTypeToPolyCorners = require("./cell-type-to-poly-corners.js");
var classifyCells = require("./classify-cells.js");
var lerp = require("./lerp.js");
var sample = require("./sample.js");
var threshold = require("./threshold.js");

var MarchingSquaresContour = function(options) {
  this.canvas = options.canvas;
  this.fn = options.fn;
  this.config = options.config;

  this.ctx = this.canvas.getContext("2d");
};

MarchingSquaresContour.prototype.tick = function() {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  var cornerSums = sample({
    minX: 0,
    maxX: this.canvas.width,
    stepX: this.config.pxSize,
    minY: 0,
    maxY: this.canvas.height,
    stepY: this.config.psSize,
    fn: this.fn
  });

  var cornerBools = threshold(cornerSums, this.config.threshold);
  var cellTypes = classifyCells(cornerBools);

  this.ctx.strokeStyle = "green";

  for (var i = 0; i < cellTypes.length; i++) {
    for (var j = 0; j < cellTypes[i].length; j++) {
      var cellType = cellTypes[i][j];
      var sumNW = cornerSums[i][j];
      var sumNE = cornerSums[i][j+1];
      var sumSW = cornerSums[i+1][j];
      var sumSE = cornerSums[i+1][j+1];

      var N = (cellType & 4) == (cellType & 8) ? 0.5 : lerp(sumNW, sumNE, 0, 1, this.config.threshold);
      var E = (cellType & 2) == (cellType & 4) ? 0.5 : lerp(sumNE, sumSE, 0, 1, this.config.threshold);
      var S = (cellType & 1) == (cellType & 2) ? 0.5 : lerp(sumSW, sumSE, 0, 1, this.config.threshold);
      var W = (cellType & 1) == (cellType & 8) ? 0.5 : lerp(sumNW, sumSW, 0, 1, this.config.threshold);

      var compassCoords = {
        "N" : [i    , j + N],
        "W" : [i + W, j    ],
        "E" : [i + E, j + 1],
        "S" : [i + 1, j + S],
      };

      var polyCompassCorners = cellTypeToPolyCorners[cellType];

      var drawLine = function(a, b) {
        var x0 = a[1] * this.config.pxSize;
        var y0 = a[0] * this.config.pxSize;
        var x1 = b[1] * this.config.pxSize;
        var y1 = b[0] * this.config.pxSize;

        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.stroke();
      }.bind(this);

      if (polyCompassCorners.length === 2) {
        drawLine(
          compassCoords[polyCompassCorners[0]],
          compassCoords[polyCompassCorners[1]]
        );
      } else if (polyCompassCorners.length === 4) {
        drawLine(
          compassCoords[polyCompassCorners[0]],
          compassCoords[polyCompassCorners[1]]
        );
        drawLine(
          compassCoords[polyCompassCorners[2]],
          compassCoords[polyCompassCorners[3]]
        );
      }
    };
  };
};

module.exports = MarchingSquaresContour;
