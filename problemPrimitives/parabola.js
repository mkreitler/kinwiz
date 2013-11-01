/**
 * Represents a parabolic arc in a Diagram.
 *
 * Equation: y - y0 = alpha * (x - x0)
 */

 kw.Parabola = new joe.ClassEx(
  // Static Defintion /////////////////////////////////////////////////////////
  {
    parabolas: [],
    curParabola: null,

    POINT_HALF_DENSITY: 10,

    drag: {
      dragLeftControlPoint: function(x, y) {
        var idealX = 0,
            idealY = 0;

        if (this.getNumberOfPoints() === 3) {
          // Preserve the form of the parabola.
          x = Math.min(x, this.x0 - 1);

          if (this.alpha > 0) {
            y = Math.max(y, this.y0 + 1);
          }
          else {
            y = Math.min(y, this.y0 - 1);
          }

          idealX = this.xAty(y, -1);
          idealY = this.yAtx(x);

          if (Math.abs(x - idealX) > Math.abs(y - idealY)) {
            // The mouse x-coordinate is closer to the curve, so
            // fit the curve to that point.
            this.points[0].x = x;
            this.points[0].y = this.yAtx(x);
          }
          else {
            // The mouse y-coordinate is closer to the curve, so
            // fit the curve to that point.

            this.points[0].y = y;
            this.points[0].x = this.xAty(y, -1);
          }

          this.computeBoundingBox();
        }
      },

      dragRightControlPoint: function(x, y) {
        var idealX = 0,
            idealY = 0;

        if (this.getNumberOfPoints() === 3) {
          x = Math.max(x, this.x0 + 1);
          
          // Preserve the form of the parabola.
          if (this.alpha > 0) {
            y = Math.max(y, this.y0 + 1);
          }
          else {
            y = Math.min(y, this.y0 - 1);
          }

          idealX = this.xAty(y, +1);
          idealY = this.yAtx(x);

          if (Math.abs(x - idealX) > Math.abs(y - idealY)) {
            // The mouse x-coordinate is closer to the curve, so
            // fit the curve to that point.
            this.points[2].x = x;
            this.points[2].y = this.yAtx(x);
          }
          else {
            // The mouse y-coordinate is closer to the curve, so
            // fit the curve to that point.
            
            this.points[2].y = y;
            this.points[2].x = this.xAty(y, +1);
          }

          this.computeBoundingBox();
        }
      },

      dragParabola: function(x, y) {
        var dx = x - this.dragStart.x,
            dy = y - this.dragStart.y,
            i = 0;

        if (this.getNumberOfPoints() === 3) {
          for (i=0; i<this.points.length; ++i) {
            this.points[i].x += dx;
            this.points[i].y += dy;
          }

          // Update geometrical constants.
          this.x0 = this.points[1].x;
          this.y0 = this.points[1].y;
          this.computeBoundingBox();

          this.setDragStart(x, y);
        }
      }
    },

    addParabola: function(newParabola) {
      this.parabolas.push(newParabola);
    },

    removeParabola: function(parabola) {
      joe.Utility.erase(this.parabolas, parabola);

      if (parabola === this.curParabola) {
        this.curParabola = null;
      }
    },

    setCurrentParabola: function(parabola) {
      this.curParabola = parabola;
    },

    getCurrentParabola: function() {
      return this.curParabola;
    },

    getParabolaAtPoint: function(x, y) {
      var i = 0,
          prim = null,
          xIdeal = 0,
          yIdeal = 0,
          testDist = 0,
          bestPrim = null,
          dx = 0,
          dy = 0,
          leftDistSq = Number.POSITIVE_INFINITY,
          rightDistSq = Number.POSITIVE_INFINITY,
          bestDist = Number.POSITIVE_INFINITY;

      for (i=0; i<this.parabolas.length; ++i) {
        prim = this.parabolas[i];

        if (prim.getNumberOfPoints() === 3 && prim.AABBcontainsPoint(x, y)) {
          // Keep the parabola to which we clicked most
          // closely, within a certain threshold.
          yIdeal = prim.yAtx(x);
          xIdeal = prim.xAty(y, x > this.x0 ? +1 : -1);

          testDist = Math.min(Math.abs(y - yIdeal), Math.abs(x - xIdeal));

          if (testDist < bestDist && testDist < kw.MIN_SELECT_DIST) {
            bestDist = testDist;
            bestPrim = prim;

            // CHECK: is the user grabbing the left or right control point?
            dx = (x - bestPrim.points[0].x);
            dy = (y - bestPrim.points[0].y);
            leftDistSq = dx * dx + dy * dy;

            dx = (x - bestPrim.points[2].x);
            dy = (y - bestPrim.points[2].y);
            rightDistSq = dx * dx + dy * dy;

            prim.setDragFunction("dragParabola");
            if (leftDistSq < rightDistSq && leftDistSq < kw.MIN_SELECT_DIST * kw.MIN_SELECT_DIST) {
              prim.setDragFunction("dragLeftControlPoint");
            }
            else if (rightDistSq < leftDistSq && rightDistSq < kw.MIN_SELECT_DIST * kw.MIN_SELECT_DIST) {
              prim.setDragFunction("dragRightControlPoint");
            }
          }
        }
      }

      return bestPrim;
    }
  },

  // Instance Definition //////////////////////////////////////////////////////
  [
    joe.MathEx.AABBmodule,
    {
      x0: 0,
      y0: 0,
      alpha: 0,
      points: [],
      bWantsDrag: false,
      dragFunction: "dragParabola",
      dragStart: {x:0, y:0},
      color: null,
      bIsNew: true,
      bWantsUnselect: false,

      completeCreation: function() {
        this.bIsNew = false;
      },

      setWantsUnselect: function(bWantsUnselect) {
        this.bWantsUnselect = bWantsUnselect;
      },

      wantsUnselect: function() {
        return this.bWantsUnselect;
      },

      isNew: function() {
        return this.bIsNew;
      },

      isSelected: function() {
        return kw.Parabola.getCurrentParabola() === this;
      },

      setDragFunction: function(dragFn) {
        this.dragFunction = dragFn;
      },

      getDragFunction: function() {
        return this.dragFunction;
      },

      setWantsDrag: function(bWantsDrag) {
        this.bWantsDrag = bWantsDrag;
      },

      wantsDrag: function() {
        return this.bWantsDrag;
      },

      setDragStart: function(x, y) {
        this.dragStart.x = x;
        this.dragStart.y = y;
      },

      init: function(color) {
        var prevParabola = kw.Parabola.getCurrentParabola();

        // Remove any partially-constructed parabola.
        if (prevParabola) {
          prevParabola.delete();
        }

        this.color = color;

        kw.Parabola.addParabola(this);
        kw.Parabola.setCurrentParabola(this);
      },

      delete: function() {
        kw.Parabola.removeParabola(this);
      },

      drawPoints: function(context) {
        var i = 0,
            x = 0,
            y = 0;

        context.save();
        context.lineWidth = 1;
        context.strokeStyle = this.isSelected() ? kw.DRAW_COLOR_WHITE : this.color;
        context.fillStyle = this.isSelected() ? kw.DRAW_COLOR_WHITE : this.color;

        for (i=0; i<this.points.length; ++i) {
          context.beginPath();

          x = this.points[i].x;
          y = this.points[i].y;

          context.moveTo(x - kw.POINT_HALF_DX, y);
          context.lineTo(x, y - kw.POINT_HALF_DY);
          context.lineTo(x + kw.POINT_HALF_DX, y);
          context.lineTo(x, y + kw.POINT_HALF_DY);

          context.closePath();
          context.fill();
          context.stroke();
        }

        context.restore();
      },

      yAtx: function(x) {
        return Math.round(this.y0 + this.alpha * (x - this.x0) * (x - this.x0));
      },

      xAty: function(y, sign) {
        return Math.round(this.x0 + sign * Math.sqrt((y - this.y0) / this.alpha));
      },

      drawParabola: function(context) {
        var nPoints = 0,
            dx = 0,
            dy = 0,
            i = 0,
            param = 0,
            x = 0
            y = 0;

        // Compute the number of points based on the horizontal
        // range.
        dx = this.points[2].x - this.points[0].x;
        nPoints = Math.round(dx / kw.Parabola.POINT_HALF_DENSITY);

        context.save();
        context.lineWidth = kw.PRIMITIVE_LINEWIDTH;
        context.strokeStyle = this.isSelected() ? kw.DRAW_COLOR_WHITE : this.color;

        // Draw the left half of the parabola.
        dx = this.points[1].x - this.points[0].x;
        dy = this.points[1].y - this.points[0].y;
        for (i=0; i<=nPoints; ++i) {
          param = i / nPoints;

          x = this.points[0].x + dx * param;
          y = this.yAtx(x);

          if (i === 0) {
            context.moveTo(x, y)
          }
          else {
            context.lineTo(x, y);
          }
        }

        // Draw the right half of the parabola.
        dx = this.points[2].x - this.points[1].x;
        dy = this.points[2].y - this.points[1].y;
        for (i=0; i<=nPoints; ++i) {
          param = i / nPoints;

          x = this.points[1].x + dx * param;
          y = this.yAtx(x);
          context.lineTo(x, y);
        }

        context.stroke();
        context.restore();
      },

      draw: function(context, color) {
        this.drawPoints(context, color);

        if (this.points.length === 3) {
          this.drawParabola(context, color);

          if (kw.DEBUG) {
            this.AABBdraw(context, "#888888");
          }
        }
      },

      addPoint: function(x, y) {
        if (this.pointIsValid(x, y)) {
          if (this.points.length < 3) {
            this.points.push({x: x, y: y});

            if (this.points.length === 3) {
              this.sortPointsLeftToRight();
              this.computeConstants();
              this.moveLastPointOntoCurve();

              this.computeBoundingBox();
            }
          }
        }
      },

      computeBoundingBox: function() {
        // Only called when we have exactly three points in the primitive.
        var xMin = kw.GAME_WIDTH,
            xMax = 0,
            yMin = kw.GAME_HEIGHT,
            yMax = 0;

        xMin = Math.min(this.points[0].x, this.points[1].x);
        xMin = Math.min(xMin, this.points[2].x);

        xMax = Math.max(this.points[0].x, this.points[1].x);
        xMax = Math.max(xMax, this.points[2].x);

        yMin = Math.min(this.points[0].y, this.points[1].y);
        yMin = Math.min(yMin, this.points[2].y);

        yMax = Math.max(this.points[0].y, this.points[1].y);
        yMax = Math.max(yMax, this.points[2].y);

        this.AABBset(xMin - kw.POINT_HALF_DX, yMin - kw.POINT_HALF_DY, xMax - xMin + 2 * kw.POINT_HALF_DX, yMax - yMin + 2 * kw.POINT_HALF_DY);
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
            if (this.points[iInner].x < this.points[xMinIndex].x) {
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
          if (this.points[0].y > this.y0) {
            this.points[2].x = this.xAty(Math.max(this.points[2].y, this.y0 + 1), +1);
          }
          else {
            this.points[2].x = this.xAty(Math.min(this.points[2].y, this.y0 - 1), +1);
          }

          this.points[2].y = this.yAtx(this.points[2].x);
        }
      }
    }
  ]
);
