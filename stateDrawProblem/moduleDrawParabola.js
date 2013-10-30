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


