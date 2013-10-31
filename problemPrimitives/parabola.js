/**
 * Represents a parabolic arc in a Diagram.
 *
 * Equation: y - y0 = alpha * (x - x0)
 */

 kw.Parabola = new joe.ClassEx(
  // Static Defintion /////////////////////////////////////////////////////////
  null,

  // Instance Definition //////////////////////////////////////////////////////
  {
    x0: 0,
    y0: 0,
    alpha: 0,
    points: [],

    addPoint: function(x, y) {
      if (this.pointIsValid(x, y)) {
        if (this.points.length < 3) {
          this.points.push({x: x, y: y});
        }

        this.sortPointsLeftToRight();

        this.computeConstants();

        this.moveLastPointOntoCurve();
      }
    },

    getNumberOfPoints: function() {
      return this.points.length;
    },

    // Valid points in a two dimensional function cannot share x coordinates.
    pointIsValid: function(x, y) {
      var i = 0,
          bValid = true;

      for (i=0; i<this.points.length; ++i) {
        if (x === this.points[i].x) {
          bValid = false;
          break;
        }
      }

      return bValid;
    },

    sortPointsLeftToRight: function() {
      var iInner = 0,
          iOuter = 0,
          xMin = 0,
          xMinIndex = -1,
          tx = 0,
          ty = 0;

      for (iOuter=0; iOuter<this.points.length - 1; ++iOuter) {
        xMinIndex = iOuter;
        xMin = this.points[xMinIndex].x;

        for (iInner=iOuter+1; iInner<this.points.length; ++iInner) {
          if (this.points[iInner] < this.points[xMinIndex]) {
            xMinIndex = iInner;
            xMin = this.points[iInner].x;
          }
        }

        if (xMinIndex !== iOuter) {
          tx = this.points[iOuter].x;
          ty = this.points[iOuter].y;
          this.points[iOuter].x = this.points[xMinIndex].x;
          this.points[iOuter].y = this.points[xMinIndex].y;
          this.points[xMinIndex].x = tx;
          this.points[xMinIndex].y = ty;
        }
      }
    },

    computeConstants: function() {
      if (this.points.length >= 2) {
        this.x0 = this.points[1].x;
        this.y0 = this.points[1].y;
        this.alpha = (this.points[0].y - this.y0) / ((this.points[0].x - this.x0) * (this.points[0].x - this.x0));
      }
    },

    moveLastPointOntoCurve: function() {
      if (this.points.length === 3) {
        this.points[2].y = this.y0 + this.alpha * (this.points[2].x - this.x0) * (this.points[2].x - this.x0);
      }
    }
  }
);
