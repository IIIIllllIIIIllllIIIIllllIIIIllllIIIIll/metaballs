const Ellipse = require("./Ellipse.js");
const Circle = require("./Circle.js");
const Segment = require("./Segment.js");

module.exports = function(_circles) {
  // le corps
  _circles.push(new Ellipse(
    300, 270, 160, 80, 70, -Math.PI/8, 0, 0
  ));
  // le cou
  _circles.push(new Segment(
    [
      {x: 300, y: 270},
      {x: 450, y: 120}, 
      {x: 500, y: 100}
    ],
    [
      25,
      8, // todo: interpolate this
      4
    ]
  ));
  // la tete
  _circles.push(new Circle(
    500, 100, 20, 0, 0
  ));
  _circles.push(new Circle(
    530, 100, 6, 0, 0
  ));
  // les jambes
  _circles.push(new Segment(
    [
      {x: 240, y: 350},
      {x: 230, y: 430},
      {x: 260, y: 470}
    ],
    [
      10,
      10,
      6
    ]
  ));
}
