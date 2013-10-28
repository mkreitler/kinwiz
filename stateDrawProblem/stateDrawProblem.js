ig.module( 
	'games.kinwiz.stateDrawProblem.stateDrawProblem' 
)
.requires(
	'impact.game',
	'impact.font',

  // 'shared.kinWizLib.algebra2',
  'games.kinwiz.state'
)
.defines(function(){

StateDrawProblem = state.extend({
	
  MODEBAR_GROUP_ID: 1,
  COLORBAR_GROUP_ID: 2,
  TOOLBAR_GROUP_ID: 3,

  SUB_STATE: {
    none: null,
    intro: null,
    drawLine: null,
    drawVector: null,
    drawParabola: null 
  },

	font: null,

  modeBoxes: null, 
  colorBoxes: null,
  toolBoxes: null,
  diagramBox: null,

  subState: "intro",
  drawRegion: null,

  labelDiagram: null,
  instructions: [],

	init: function(sysFont, instInputHandler) {
    var boxX      = 0,
        boxY      = 0,
        boxDx     = 0,
        boxDy     = 0,
        i         = 0;

    // Initialize code modules ------------------------------------------------
    // Inherited...
    this.parent();

    // ...and local.
    this.loadModule(kw.drawProblemGUIhandlers);
    this.SUB_STATE.intro = {mouseUp: this.startDrawing.bind(this)};
    this.SUB_STATE.none = {mouseUp: this.continueDrawing.bind(this)};
    this.SUB_STATE.drawLine = null;
    this.SUB_STATE.drawVector = null;
    this.SUB_STATE.drawParabola = null;

    this.font = sysFont;

    this.drawRegion = new joe.MathEx.AABB(100, 10, kw.GAME_WIDTH - 110, Math.round(kw.GAME_HEIGHT / 2 - 20));

    for (i=0; i<kw.strings.DRAW_INSTRUCTIONS.length; ++i) {
      this.instructions.push(new joe.GUI.Label(kw.strings.DRAW_INSTRUCTIONS[i],
                                               this.font,
                                               kw.DRAW_COLOR_YELLOW,
                                               kw.DEFAULT_TEXT_SIZE,
                                               kw.GAME_WIDTH / 2,
                                               kw.GAME_HEIGHT * 1 / 4 + kw.DEFAULT_TEXT_SIZE * (i - Math.round(kw.strings.DRAW_INSTRUCTIONS.length / 2)),
                                               instInputHandler,
                                               0.5,
                                               0.5));
    }

    this.modeBoxes = [
      new joe.GUI.ToggleBox(10, 10, 75, 75, "#00ffff", "#007777", this.MODEBAR_GROUP_ID, {mouseDown: this.toggleLineMode.bind(this)}, this.lineModeDraw),
      new joe.GUI.ToggleBox(10, 95, 75, 75, "#00ffff", "#007777", this.MODEBAR_GROUP_ID, {mouseDown: this.toggleVectorMode.bind(this)}, this.vectorModeDraw),
      new joe.GUI.ToggleBox(10, 180, 75, 75, "#00ffff", "#007777", this.MODEBAR_GROUP_ID, {mouseDown: this.toggleArcMode.bind(this)}, this.arcModeDraw)
    ];

    this.colorBoxes = [
      new joe.GUI.ToggleBox(10, 265, 32, 32, kw.DRAW_COLOR_BLUE, "#222277", this.COLORBAR_GROUP_ID, {mouseDown: this.toggleColorBlue.bind(this)}, this.colorButtonDraw),
      new joe.GUI.ToggleBox(50, 265, 32, 32, kw.DRAW_COLOR_GREEN, "#007700", this.COLORBAR_GROUP_ID, {mouseDown: this.toggleColorGreen.bind(this)}, this.colorButtonDraw),
      new joe.GUI.ToggleBox(10, 305, 32, 32, kw.DRAW_COLOR_YELLOW, "#777700", this.COLORBAR_GROUP_ID, {mouseDown: this.toggleColorYellow.bind(this)}, this.colorButtonDraw),
      new joe.GUI.ToggleBox(50, 305, 32, 32, kw.DRAW_COLOR_RED, "#770000", this.COLORBAR_GROUP_ID, {mouseDown: this.toggleColorRed.bind(this)}, this.colorButtonDraw),
    ];

    this.toolBoxes = [
      new joe.GUI.ClickBox(10, 350, 75, 75, "#770000", kw.DRAW_COLOR_RED, {mouseUp: this.deleteElement.bind(this)}, this.deleteToolDraw),
    ];

    boxDx = kw.GAME_WIDTH - 110;
    boxDy = Math.round(kw.GAME_HEIGHT / 2 - 20);
    boxX = 100;
    boxY = kw.GAME_HEIGHT - 10 - boxDy;

    this.labelDiagram = new joe.GUI.Label(kw.strings.DIAGRAM, sysFont, "#aaaaaa", kw.DEFAULT_TEXT_SIZE, Math.round(boxDx * 0.5), Math.round(boxDy * 0.5), null, 0.5, 0.5);
    this.diagramBox = new joe.GUI.CaptureBox(boxX, boxY, boxDx, boxDy, "#ffffff", "#777777", this.SUB_STATE[this.subState], this.diagramDraw);
    this.diagramBox.widgetAddChild(this.labelDiagram);
	},

  defaultDiagramBoxInputHandler:
  {
    mouseUp: null,
  },

  enter: function() {
    var i = 0;

    for (i=0; i<kw.strings.DRAW_INSTRUCTIONS.length; ++i) {
      joe.GUI.addWidget(this.instructions[i]);
    }

    for (i=0; i<this.modeBoxes.length; ++i) {
      joe.GUI.addWidget(this.modeBoxes[i]);
    }

    for (i=0; i<this.colorBoxes.length; ++i) {
      joe.GUI.addWidget(this.colorBoxes[i]);
    }

    for (i=0; i<this.toolBoxes.length; ++i) {
      joe.GUI.addWidget(this.toolBoxes[i]);
    }

    joe.GUI.addWidget(this.diagramBox);
  },

  exit: function() {
    var i = 0;

    for (i=0; i<kw.strings.DRAW_INSTRUCTIONS.length; ++i) {
      joe.GUI.removeWidget(this.instructions[i]);
    }

    for (i=0; i<this.modeBoxes.length; ++i) {
      joe.GUI.removeWidget(this.modeBoxes[i]);
    }

    for (i=0; i<this.colorBoxes.length; ++i) {
      joe.GUI.removeWidget(this.colorBoxes[i]);
    }

    for (i=0; i<this.toolBoxes.length; ++i) {
      joe.GUI.removeWidget(this.toolBoxes[i]);
    }

    joe.GUI.removeWidget(this.diagramBox);
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
	
 //  onAlgebra2start: function() {
	// 	this.startPointSlopeAnalysis();
	// 	this.parent();
 //  },
		
 // 	onAlgebra2stop: function(dataOut) {
	// 	this.parent();
	// 	this.stopAnalysis();
	// 	this.setFocus();
	// },

  update: function(dt) {
  },

  draw: function() {
  }
});

});
