/**
 * The DrawParabola substate manages use input when editing parabolic arcs.
 */

kw.stateDrawParabolaHandlers = {
  // --------------------------------------------------------------------------
  // DrawParabola handlers:
  mouseUp: function(x, y, widget) {
    console.log("DrawParabola mouseUp");
    return true;
  },

  mouseDown: function(x, y, widget) {
    var curShape = this.primitives.length ? this.primitives[this.primitives.length - 1] : null;

    if (!curShape) {
      // Create a new parabola object.
      this.curShape = new kw.Parabola();
    }

    if (this.curShape instanceof kw.Parabola) {
      if (this.curShape.getNumberOfPoints() < 3) {
        this.curShape.addPoint(x, y);
      }
    }

    console.log("DrawParabola mouseDown");
    return true;
  },

  mouseDrag: function(x, y, widget) {
    console.log("DrawParabola mouseDrag");
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


