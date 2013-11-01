/**
 * The DrawParabola substate manages use input when editing parabolic arcs.
 */

kw.stateDrawParabolaHandlers = {
  // --------------------------------------------------------------------------
  // DrawParabola handlers:
  mouseUp: function(x, y, widget) {
    var curShape = kw.Parabola.getCurrentParabola();

    if (curShape) {
      if (curShape.getNumberOfPoints() === 3 && curShape.isNew()) {
        curShape.completeCreation();
      }

      if (curShape.wantsUnselect()) {
        kw.Parabola.setCurrentParabola(null);
      }

      if (curShape.wantsDrag()) {
        curShape.setWantsDrag(false);
      }
    }

    return true;
  },

  mouseDown: function(x, y, widget) {
    var curShape = kw.Parabola.getCurrentParabola();
    var selShape = kw.Parabola.getParabolaAtPoint(x, y);
    var bStartingNewShape = false;
    var bBuildShape = false;

    if (selShape) {
      if (curShape === selShape) {
        // Selected existing shape. Toggle selection.
        curShape.setWantsUnselect(curShape.isSelected());
        selShape.setWantsDrag(true);
        selShape.setDragStart(x, y);
      }
      else if (curShape && curShape.isNew()) {
        // Continue building the shape.
        bBuildShape = true;
      }
      else {
        // Selected a new or different parabola. Select the new one.
        kw.Parabola.setCurrentParabola(selShape);
        selShape.setWantsUnselect(false);
        selShape.setWantsDrag(true);
        selShape.setDragStart(x, y);
      }
    }
    else {
      // Didin't click on an existing parabola.
      bBuildShape = true;
      bStartingNewShape = !curShape;
    }

    if (bStartingNewShape) {
      curShape = new kw.Parabola(this.getCurrentColor());
      this.primitives.push(curShape);
    }

    if (bBuildShape) {
      if (curShape.getNumberOfPoints() < 3) {
        curShape.addPoint(x, y);
      }

      curShape.setWantsUnselect(curShape.getNumberOfPoints() === 3);
      curShape.setWantsDrag(false);
      kw.Parabola.setCurrentParabola(curShape);
    }

    return true;
  },

  mouseDrag: function(x, y, widget) {
    var prim = kw.Parabola.getCurrentParabola();

    if (prim && prim.wantsDrag()) {
      kw.Parabola.drag[prim.getDragFunction()].call(prim, x, y);

      // Dragging cancels selection detoggle.
      prim.setWantsUnselect(false);
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


