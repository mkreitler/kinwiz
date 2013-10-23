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

	font: null,

  modeBoxes: null, 
  colorBoxes: null,
  toolBoxes: null,
  diagramBox: null,

  subState: null,
  drawRegion: null,

  labelDiagram: null,

	init: function(sysFont) {
    var i = 0;

    // Initialize code modules ------------------------------------------------
    // Inherited...
    this.parent();

    // ...and local.
    this.loadModule(kw.drawProblemGUIhandlers);

    this.font = sysFont;

    this.drawRegion = new joe.MathEx.AABB(100, 10, kw.GAME_WIDTH - 110, Math.round(kw.GAME_HEIGHT / 2 - 20));

    this.modeBoxes = [
      new joe.GUI.ToggleBox(10, 10, 75, 75, "#00ffff", "#007777", this.toggleLineMode.bind(this), this.MODEBAR_GROUP_ID, this.lineModeDraw),
      new joe.GUI.ToggleBox(10, 95, 75, 75, "#00ffff", "#007777", this.toggleVectorMode.bind(this), this.MODEBAR_GROUP_ID, this.vectorModeDraw),
      new joe.GUI.ToggleBox(10, 180, 75, 75, "#00ffff", "#007777", this.toggleArcMode.bind(this), this.MODEBAR_GROUP_ID, this.arcModeDraw)
    ];

    this.colorBoxes = [
      new joe.GUI.ToggleBox(10, 265, 32, 32, kw.DRAW_COLOR_BLUE, "#222277", this.toggleColorBlue.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
      new joe.GUI.ToggleBox(50, 265, 32, 32, kw.DRAW_COLOR_GREEN, "#007700", this.toggleColorGreen.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
      new joe.GUI.ToggleBox(10, 305, 32, 32, kw.DRAW_COLOR_YELLOW, "#777700", this.toggleColorYellow.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
      new joe.GUI.ToggleBox(50, 305, 32, 32, kw.DRAW_COLOR_RED, "#770000", this.toggleColorRed.bind(this), this.COLORBAR_GROUP_ID, this.colorButtonDraw),
    ];

    this.toolBoxes = [
      new joe.GUI.ClickBox(10, 350, 75, 75, "#770000", kw.DRAW_COLOR_RED, this.toggleLineMode.bind(this), this.deleteToolDraw),
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
    this.diagramBox = new joe.GUI.CaptureBox(100, 10, kw.GAME_WIDTH - 110, Math.round(kw.GAME_HEIGHT / 2 - 20), "#ffffff", "#777777", this, this.diagramDraw);
    this.diagramBox.widgetAddChild(this.labelDiagram);
    joe.GUI.addWidget(this.diagramBox);
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
    if (this.subState) {
      this.subState.update(dt);
    }
  },

  draw: function() {
  }
});

});
