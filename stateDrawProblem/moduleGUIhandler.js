/**
 * Contains routines to handle the GUI events generated during stateDrawProblem.
 */

kw.drawProblemGUIhandlers = {
  // Capture Box Callbacks ////////////////////////////////////////////////////
  // Executes in the CaptureBox context
  diagramDraw: function(context, worldX, worldY) {
    this.AABBdraw(context, this.isOn() ? this.onColor : this.offColor);

    if (this.customData && !this.isOn()) {
      this.customData.label.draw(context, worldX + this.bounds.x, worldY + this.bounds.y);
    }
  },

  // Draw Box Handlers ////////////////////////////////////////////////////////
  startDrawing: function(x, y) {
    this.diagramBox.widgetRemoveChild(this.labelDiagram);

    // Set up normal draw input handler.
    this.setDiagramBoxStateNone();
    this.hideInstructions();
    this.setWidgetsActive(true);

    this.diagramBox.widgetAddChild(this.labelDone);

    return true;
  },

  setDiagramBoxStateNone: function() {
    this.diagramBox.inputCallbacks = {
      mouseUp: this.noop.bind(this),
      mouseDown: this.noop.bind(this),
      mouseDrag: this.noop.bind(this),
      mouseOver: this.noop.bind(this),
      mouseHold: this.noop.bind(this),
      mouseClick: this.noop.bind(this),
      mouseDoubleClick: this.noop.bind(this),
    }
  },

  noop: function(x, y) {
    console.log("No tool selected.");

    return true;
  },

  // Toggle Button Callbacks //////////////////////////////////////////////////
  // These functions are executed in the context of the button.
  toggleLineMode: function(x, y, widget) {
    return true;
  },

  toggleVectorMode: function(x, y, widget) {
    return true;
  },

  toggleArcMode: function(x, y, widget) {
    if (widget.isOn()) {
      this.diagramBox.inputCallbacks = {
        mouseUp: kw.stateDrawParabolaHandlers.mouseUp.bind(this),
        mouseDown: kw.stateDrawParabolaHandlers.mouseDown.bind(this),
        mouseDrag: kw.stateDrawParabolaHandlers.mouseDrag.bind(this),
        mouseOver: kw.stateDrawParabolaHandlers.mouseOver.bind(this),
        mouseHold: kw.stateDrawParabolaHandlers.mouseHold.bind(this),
        mouseClick: kw.stateDrawParabolaHandlers.mouseClick.bind(this),
        mouseDoubleClick: kw.stateDrawParabolaHandlers.mouseDoubleClick.bind(this)
      };

      this.toolBoxes[0].widgetSetInputCallbacks({
        mouseUp: function(x, y, widget) {
          var curParabola = kw.Parabola.getCurrentParabola();

          if (curParabola) {
            joe.Utility.erase(this.primitives, curParabola);
            curParabola.delete();
          }

          return true;
        }.bind(this)
      });
    }
    else {
      this.reset();
    }

    return true;
  },

  toggleColorBlue: function(x, y, widget) {
    return true;
  },

  toggleColorGreen: function(x, y, widget) {
    return true;
  },

  toggleColorYellow: function(x, y, widget) {
    return true;
  },

  toggleColorRed: function(x, y, widget) {
    return true;
  },

  deleteElement: function(x, y, widget) {
    return true;
  },

  // Toggle Button Custom Draw Routines ///////////////////////////////////////
  // (will be executed in the context of the appropriate ToggleBox object)
  // //////////////////////////////////////////////////////////////////////////
  deleteToolDraw: function(context, worldX, worldY) {
    var bounds = this.AABBgetRef();

    var dx = Math.round(bounds.width * 0.5);
    var dy = Math.round(bounds.height * 0.5);
    var x0 = Math.round((bounds.width - dx) * 0.5);
    var y0 = Math.round((bounds.height - dx) * 0.5);

    context.save();
    context.translate(bounds.x + worldX + x0, bounds.y + worldY + y0);
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(dx, dy);
    context.moveTo(0, dy);
    context.lineTo(dy, 0);
    context.stroke();

    context.restore();
  },
  
  colorButtonDraw: function(context, worldX, worldY) {
    var bounds = this.AABBgetRef();

    context.save();
    context.translate(worldX + bounds.x, worldY + bounds.y);

    if (this.isOn()) {
      context.lineWidth = 2;
      context.strokeStyle = "#ffffff";
    }

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(bounds.width, 0);
    context.lineTo(bounds.width, bounds.height);
    context.lineTo(0, bounds.height);
    context.closePath();
    context.fill();

    if (this.isOn()) {
      context.stroke();
    }

    context.restore();
  },

  lineModeDraw: function(context, worldX, worldY) {
    var bounds = this.AABBgetRef(),
        lw = 2,
        w = Math.round(2 * bounds.width / 3),
        h = Math.round(2 * bounds.height / 3),
        x0 = Math.round((bounds.width - w) / 2 - lw / 2),
        y0 = Math.round((bounds.height - h) / 2 - lw / 2);

      context.save();
      context.translate(worldX + bounds.x, worldY + bounds.y);
      context.lineWidth = lw;

      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x0, y0 + Math.round(h / 2));
      context.lineTo(x0 + w, y0 + Math.round(h / 2));
      context.lineTo(x0 + w, y0 + h);
      context.stroke();

      context.restore();
  },

  vectorModeDraw: function(context, worldX, worldY) {
    var bounds = this.AABBgetRef(),
        lw = 2,
        w = Math.round(2 * bounds.width / 3),
        h = Math.round(2 * bounds.height / 3),
        x0 = Math.round((bounds.width - w) / 2 - lw / 2),
        y0 = Math.round((bounds.height - h) / 2 - lw / 2),
        ym = Math.round(y0 + h / 2);

      context.save();
      context.translate(worldX + bounds.x, worldY + bounds.y);
      context.lineWidth = lw;

      context.beginPath();
      context.moveTo(x0, ym);
      context.lineTo(x0 + w, ym);
      context.lineTo(x0 + w - Math.round(w / 10), ym - Math.round(h / 10));
      context.moveTo(x0 + w, ym);
      context.lineTo(x0 + w - Math.round(w / 10), ym + Math.round(h / 10));
      context.stroke();

      context.restore();
  },

  arcModeDraw: function(context, worldX, worldY) {
    var bounds = this.AABBgetRef(),
        lw = 2,
        w = Math.round(2 * bounds.width / 3),
        h = Math.round(2 * bounds.height / 3),
        x0 = Math.round((bounds.width - w) / 2 - lw / 2),
        y0 = Math.round((bounds.height - h) / 2 - lw / 2),
        xm = Math.round(x0 + w / 2),
        x = 0,
        a = 0.09,
        pointsPerSide = 3,
        i = 0,
        y = function(x) { return Math.round(y0 + a * (x - xm) * (x - xm)); };

      context.save();
      context.translate(worldX + bounds.x, worldY + bounds.y);
      context.lineWidth = lw;

      context.beginPath();
      for (i=-pointsPerSide; i<=pointsPerSide; ++i) {
        x = Math.round(xm + i * w / (2 * pointsPerSide));
        if (i === -pointsPerSide) {
          context.moveTo(x, y(x));
        }
        else {
          context.lineTo(x, y(x));
        }
      }
      context.stroke();

      context.restore();
  }
};
