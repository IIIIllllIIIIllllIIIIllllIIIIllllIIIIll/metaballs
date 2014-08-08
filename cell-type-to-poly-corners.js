/**
 * Maps from 0-15 cell classification to compass points indicating a sequence of
 * corners to visit to form a polygon based on the pmapping described on
 * http://en.wikipedia.org/wiki/Marching_squares
 */
module.exports = {
  // ..
  // ..
  0: [],

  // ..
  // #.
  1: ["SW", "W", "S"],

  // ..
  // .#
  2: ["SE", "E", "S"],

  // ..
  // ##
  3: ["SW", "W", "E", "SE"],

  // .#
  // ..
  4: ["N", "NE", "E"],

  // .#
  // #.
  5: ["N", "NE", "E", "S", "SW", "W"],

  // .#
  // .#
  6: ["N", "NE", "SE", "S"],

  // .#
  // ##
  7: ["N", "NE", "SE", "SW", "W"],

  // #.
  // ..
  8: ["NW", "N", "W"],

  // #.
  // #.
  9: ["NW", "N", "S", "SW"],

  // #.
  // .#
  10: ["NW", "N", "E", "SE", "S", "W"],

  // #.
  // ##
  11: ["NW", "N", "E", "SE", "SW"],

  // ##
  // ..
  12: ["NW", "NE", "E", "W"],

  // ##
  // #.
  13: ["NW", "NE", "E", "S", "SW"],

  // ##
  // .#
  14: ["NW", "NE", "SE", "S", "W"],

  // ##
  // ##
  15: []
};
