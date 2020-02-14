class Circle {
    constructor(x, y, r2) {
      this.x = x;
      this.y = y;
      this.r2 = r2;
    }
    field(x, y) {
      var dx = x - this.x;
      var dy = y - this.y;
  
        /*
        diamond
        
    var d2 = Math.abs(dx) + Math.abs(dy);
    d2 *= d2
    return this.r2 / d2;
        */

      var d2 = dx * dx + dy * dy;
      return this.r2 / d2;
    }
  }


module.exports = Circle;