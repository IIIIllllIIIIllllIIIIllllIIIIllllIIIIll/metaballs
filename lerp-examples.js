var cellTypeToPolyCorners = require("./cell-type-to-poly-corners.js");
var classifyCells = require("./classify-cells.js");
var lerp = require("./lerp.js");

var width = 700;
var height = 200;

var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

var samples = [
  // NW, NE, SW, SE
  [0,   0,   0,   2  ],
  [0,   0,   0,   5  ],
  [0,   0,   0,   1.3],
  [0,   0, 0.7,   2  ],
  [0, 0.7,   0,   2  ]
];

var cellSize = 80;

ctx.fillRect(0, 0, width, height);

ctx.translate(40, 50);
samples.forEach(function(sample) {
  var NW = sample[0];
  var NE = sample[1];
  var SW = sample[2];
  var SE = sample[3];

  ctx.font = '16px monospace';
  ctx.strokeStyle = '#888';
  ctx.strokeRect(0, 0, cellSize, cellSize);

  ctx.fillStyle = '#888';
  ctx.fillText(NW, -5, -10);
  ctx.fillRect(-5, -5, 10, 10);

  ctx.fillText(NE, -5 + cellSize, -10);
  ctx.fillRect(-5 + cellSize, -5, 10, 10);

  ctx.fillText(SW, -5, cellSize + 21);
  ctx.fillRect(-5, -5 + cellSize, 10, 10);

  ctx.fillText(SE, -5 + cellSize, cellSize + 21);
  ctx.fillStyle = '#0f0';
  ctx.fillRect(-5 + cellSize, -5 + cellSize, 10, 10);

  var x = lerp(SW, SE, 0, cellSize, 1);
  var y = lerp(NE, SE, 0, cellSize, 1);

  console.log(x, y);

  ctx.strokeStyle = '#0f0';
  ctx.beginPath();
  ctx.moveTo(x, cellSize);
  ctx.lineTo(cellSize, y);
  ctx.stroke();

  ctx.translate(cellSize + 50, 0);
});
