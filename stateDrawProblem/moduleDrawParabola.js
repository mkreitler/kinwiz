/**
 * The DrawParabola substate manages use input when editing parabolic arcs.
 */

kw.stateDrawParabolaHandlers = {
  // --------------------------------------------------------------------------
  // DrawParabola handlers:
  mouseUp: function(x, y, widget) {
    var curShape = kw.Parabola.getCurrentParabola() ||
                   kw.Parabola.selectExistingParabola(x,y);

    if (curShape) {
      curShape.setWantsDrag(false);

      if (curShape.getNumberOfPoints() === 3) {
        kw.Parabola.setCurrentParabola(null);
      }
    }

    return true;
  },

  mouseDown: function(x, y, widget) {
    var curShape = kw.Parabola.getCurrentParabola() ||
                   kw.Parabola.selectExistingParabola(x, y);

    if (!curShape) {
      // Create a new parabola object.
      curShape = new kw.Parabola(this.getCurrentColor());
      this.primitives.push(curShape);
    }

    if (curShape) {
      if (curShape.getNumberOfPoints() < 3) {
        curShape.addPoint(x, y);
      }
      else {
        curShape.setWantsDrag(true);
        curShape.setDragStart(x, y);
      }
    }

    return true;
  },

  mouseDrag: function(x, y, widget) {
    var prim = kw.Parabola.getCurrentParabola();

    if (prim && prim.wantsDrag()) {
      kw.Parabola.drag[prim.getDragFunction()].call(prim, x, y);
    }

    return true;
  },

  mouseOver: function(x, y, widget) {
    console.log("DrawParabola mouseOver");
    return true;
  },

  mouseHold: function(x, y, widget) {
    console.log("DrawParabola mouseHold");
    return true;
  },

  mouseClick: function(x, y, widget) {
    console.log("DrawParabola mouseClick");
    return true;
  },

  mouseDoubleClick: function(x, y, widget) {
    console.log("DrawParabola mouseDoubleClick");
    return true;
  }
};


