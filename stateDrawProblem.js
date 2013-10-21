ig.module( 
	'games.kinwiz.stateDrawProblem' 
)
.requires(
	'impact.game',
	'impact.font',

	'shared.kinWizLib.algebra2'
)
.defines(function(){

StateDrawProblem = ig.Class.extend({
	
  MODEBAR_GROUP_ID: 1,
  COLORBAR_GROUP_ID: 2,
  TOOLBAR_GROUP_ID: 3,

	// Load a font
	font: null,
  modeBoxes: null, 
  colorBoxes: null,
  toolBoxes: null,

  subState: null,
  drawRegion: null,

  labelDiagram: null,

	init: function(sysFont) {
    var i = 0;

    this.font = sysFont;

    this.drawRegion = new joe.MathEx.AABB(100, 10, 1024 - 110, Math.round(768 / 2 - 20));

    this.modeBoxes = [
      new joe.GUI.ToggleBox(10, 10, 75, 75, "#00ffff", "#007777", this.toggleLineMode.bind(this), this.MODEBAR_GROUP_ID, this.lineModeDraw),
      new joe.GUI.ToggleBox(10, 95, 75, 75, "#00ffff", "#007777", this.toggleVectorMode.bind(this), this.MODEBAR_GROUP_ID, this.vectorModeDraw),
      new joe.GUI.ToggleBox(10, 180, 75, 75, "#00ffff", "#007777", this.toggleArcMode.bind(this), this.MODEBAR_GROUP_ID, this.arcModeDraw)
    ];

    this.colorBoxes = [
      new joe.GUI.ToggleBox(10, 265, 32, 32, "#4444ff", "#222277", this.toggleColorBlue.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
      new joe.GUI.ToggleBox(50, 265, 32, 32, "#00ff00", "#007700", this.toggleColorGreen.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
      new joe.GUI.ToggleBox(10, 305, 32, 32, "#ffff00", "#777700", this.toggleColorYellow.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
      new joe.GUI.ToggleBox(50, 305, 32, 32, "#ff0000", "#770000", this.toggleColorRed.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
    ];

    this.toolBoxes = [
      new joe.GUI.ToggleBox(10, 350, 75, 75, "#ff0000", "#770000", this.toggleLineMode.bind(this), this.TOOLBAR_GROUP_ID, this.deleteToolDraw),
    ];

    for (i=0; i<this.modeBoxes.length; ++i) {
      joe.GUI.addWidget(this.modeBoxes[i]);
    }

    for (i=0; i<this.colorBoxes.length; ++i) {
      joe.GUI.addWidget(this.colorBoxes[i]);
    }

    for (i=0; i<this.toolBoxes.length; ++i) {
      joe.GUI.addWidget(this.toolBoxes[i]);
    }

    this.labelDiagram = new joe.GUI.Label(kw.strings.DIAGRAM, sysFont, "#aaaaaa", 30, 102, 12);
    joe.GUI.addWidget(this.labelDiagram);
	},

  // Toggle Button Callbacks //////////////////////////////////////////////////
  toggleLineMode: function() {

  },

  toggleVectorMode: function() {

  },

  toggleArcMode: function() {

  },

  toggleColorBlue: function() {

  },

  toggleColorGreen: function() {

  },

  toggleColorYellow: function() {

  },

  toggleColorRed: function() {

  },

  // Toggle Button Custom Draw Routines ///////////////////////////////////////
  // (will be executed in the context of the appropriate ToggleBox object)
  // //////////////////////////////////////////////////////////////////////////
  deleteToolDraw: function(context, worldX, worldY) {

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
  },

  /////////////////////////////////////////////////////////////////////////////
  // State Processing
  /////////////////////////////////////////////////////////////////////////////
  enter: function() {

  },

  exit: function() {

  },
	
	update: function() {
	},
	
  /////////////////////////////////////////////////////////////////////////////
  // Input Event Handlers
  /////////////////////////////////////////////////////////////////////////////
  mouseUp: function(x, y) {
    return joe.GUI.mouseUp(x, y);
  },

  mouseDown: function(x, y) {
    return joe.GUI.mouseDown(x, y);
  },

  mouseDrag: function(x, y) {
    return joe.GUI.mouseDrag(x, y);
  },

  mouseOver: function(x, y) {
    return joe.GUI.mouseOver(x, y);
  },

  mouseHold: function(x, y) {
    return joe.GUI.mouseHold(x, y);
  },

  mouseClick: function(x, y) {
    return joe.GUI.mouseClick(x, y);
  },

  mouseDoubleClick: function(x, y) {
    return joe.GUI.mouseDoubleClick(x, y);
  },

	// mouseClickKW: function(x, y) {
	// 	var screenDivisionWidth = ig.system.width / 3;
	// 	var sector = parseInt(x / screenDivisionWidth);
	// 	sector = Math.min(this.testExpressions.length - 1, sector);
	// 	sector = Math.max(0, sector);
		
	// 	if (Math.abs(y - ig.system.height / 2) < 2 * this.font.height) {
	// 		this.activateAlgebra2(this.testExpressions[sector][this.expIndeces[sector]]);
			
	// 		this.expIndeces[sector] = (this.expIndeces[sector] + 1) % this.testExpressions.length;
	// 	}
	// },
	
  onAlgebra2start: function() {
		this.startPointSlopeAnalysis();
		this.parent();
  },
		
 	onAlgebra2stop: function(dataOut) {
		this.parent();
		this.stopAnalysis();
		this.setFocus();
	},

  update: function(dt) {
    if (this.subState) {
      this.subState.update(dt);
    }
  },

  draw: function() {
    var context = joe.Graphics.getActiveContext();

    if (this.drawRegion) {
      this.drawRegion.AABBdraw(context, "#444444");
    }
    joe.GUI.draw(context);
    // this.font.draw(joe.Graphics.getActiveContext(), "State Draw Problems", 100, 50, "#00FF00", null, "50px");
  }
});

});
