ig.module( 
  'games.kinwiz.kinwiz' 
)
.requires(
  'impact.game',
  'impact.font',

  'games.kinwiz.stateDrawProblem',
  'shared.kinWizLib.algebra2'
)
.defines(function(){

KinWizMain = ig.Game.extend({
  
  // Load a font
  // font: new ig.Font( 'lib/games/kinwiz/media/bitsu.white.font.png' ),
  font: null,
  
  // Create a test equation.
  //testExpressions:  [
  //  ["2x + y = 0", "y + 3x = 2", "4x + 2y = 16"],
  //  ["3x + -y + 7 = 4x + y + -5", "2 * (x + 5) + y = 2y + 7 - x", "-x + -y + -10 = 7y + 4 * (x + 3)"],
  //  ["5 * (3x + 2y) = 2x + 4 * (5 + y)", "2 * (-2x + 2 * (y + 1)) = (2x + y) * (3 + -5)", "y * 3 * 4 + (x + 1) * 5 = (4y + -3x) * (8 + -1)"]
  //],
  testExpressions:  [
      ["2x + y = 0", "y + 3x = 2", "4x + 2y = 16"],
//    ["x / 2 / 3 = x / (2 / 3)", "y + 3x = 2", "4x + 2y = 16"],
//    ["5 * (2 + -x) = y", "y + 3x = 2", "4x + 2y = 16"],
//    ["((2 + 4) * y + 3) * x = 15", "y + 3x = 2", "4x + 2y = 16"],
//    ["4 * (x + 3) / (-2 * 2) = 15", "y + 3x = 2", "4x + 2y = 16"],
//    ["2 / 4 * x + 3 = 5y", "y + 3x = 2", "4x + 2y = 16"],
//    ["2x / 2 + 2 = 4", "y + 3x = 2", "4x + 2y = 16"],
//    ["2x / 3 + 2 / 4 + 3 / 5 = 2x / 3 + 2 / 4 + 3 / 5", "y + 3x = 2", "4x + 2y = 16"],
//    ["x = 2", "y + 3x = 2", "4x + 2y = 16"],
//    ["3 * (1 / 2 + x / 3) = 2y", "y + 3x = 2", "4x + 2y = 16"],
//    ["3 * (x / 2 / 3) * 3 = 2", "y + 3x = 2", "4x + 2y = 16"],
//    ["2x / 3 + 2y / 3 + 3 / 5 = 2 / 3 + 2 / 6 + 3y / 5", "y + 3x = 2", "4x + 2y = 16"],
//    ["4 * (x + 3) / (-2 * 2) = 5y", "y + 3x = 2", "4x + 2y = 16"],
//    ["4 + (x + 3) / (-2 * 2) + 6 = 5y", "y + 3x = 2", "4x + 2y = 16"],
//    ["(2 + 3) * (x + y + z) / (-2 * 2) = 15", "y + 3x = 2", "4x + 2y = 16"],
//    ["3 + 2x + 2y + 3 * 2 * 5 + 3 = 6", "y + 3x = 2", "4x + 2y = 16"],
//    ["3 / x / y = 6", "y + 3x = 2", "4x + 2y = 16"],
//    ["2x + y = 0", "y + 3x = 2", "4x + 2y = 16"],
    ["3x + -y + 7 = 4x + y + -5", "2 * (x + 5) + y = 2y + 7 - x", "-x + -y + -10 = 7y + 4 * (x + 3)"],
    ["5 * (3x + 2y) = 2x + 4 * (5 + y)", "y * 3 * 4 + (x + 1) * 5 = (4y + -3x) * 8", "(-2x + 2) * 7 = (x + -y) * (1 + 1)"]
  ],
  
  expIndeces: [0, 0, 0],
  
//  testExpression: "x + 2y = 3",
//  testExpression: "3 * (4 + 2x + y) = 9",   // TODO: what does this generate incorrect parentheses? Also TODO: use to verify distribution code.
//  testExpression: "2 + 5y = 2",
//  testExpression: "-y = 2x + 4",
//  testExpression: "3x + 4y = 5 + x",
//  testExpression: "1 * 2 / 3 * 4 + 5 * 6 = x",
//  testExpression: "2 + 3 * 3x + 4y = 5",
//  testExpression: "2 + 4y + 3 * 3x = 5",
//  testExpression: "y / 2 = x / 3",
//  testExpression: "3 * 3x + 2 + 4y = 5",
//  testExpression: "2 * 3 * 4 * 5 + 1 = x",
//  testExpression: "3 * 4 * 5 + 1 + 2",
//  testExpression: "x = 4 + -4",
//  testExpression: "2 + 3",
//  testExpression: "4x + -x = 2 + 3",
//  testExpression: "1/x = (3 + 2 * 4) / y + 1/(2 + -3)",
//  testExpression: "x * (15 + -4) = 2y / (5 + -7)",
//  testExpression: "2 * (3x + -4) / (7 * (y + 3)) = 17 / 4",
//  testExpression: "((2 + 4) * y + 3) * x = 15",
//  testExpression: "y = 2x + 3",
//  testExpression: "y + ((3 + 5) / (2 * 7)) / x = 6",
//  testExpression: "y / 4 / x = 1",
//  testExpression: "(1 + (2 + 3)) = x",
//  testExpression: "y = 1 / (x + 3)",
//  testExpression: "x * 2 / (y + 3) = 1",
//  testExpression: "17x + 43 + x / 2 = 1",
//  testExpression: "1 + 2 + x / 2 = 1",
//  testExpression: "1 = 17x + 43 + x / 2",
//  testExpression: "1 + (x / 2) = (x / 3)",

  curState: null,
  problems: [],

  loadFonts: function(font) {
    // TODO: update resource count.
    this.font = font;
    this.setState(new StateDrawProblem(this.font));
  },
  
  init: function() {
    // Initialize your game here; bind keys etc.
    this.setFocus();

    joe.KeyInput.addListener(this);
    joe.MouseInput.addListener(this);

    joe.UpdateLoop.start(true);

    joe.Graphics.setCanvas(ig.system.canvas);

    joe.Resources.loader.loadFont("../fonts/pirulen.ttf",
                                   this.loadFonts,
                                   function() { alert("Font load failed.") },
                                   this);

    kw.game = this;
  },

  createProblem: function() {
    var problem = new kw.problem();

    this.problems.push(problem);

    return problem;
  },

  deleteProblem: function(problem) {
    joe.Utility.erase(this.problems, problem);
  },

  setState: function(newState) {
    if (this.curState !== newState) {
      if (this.curState) {
        this.curState.exit();
      }

      if (newState) {
        newState.enter();
      }

      this.curState = newState;
    }
  },

  nonEvent: function(x, y) {
    // Do nothing.
  },

  setFocus: function() {
    // Deprecated.
  },
  
  mouseUp: function(x, y) {
    return this.curState ? this.curState.mouseUp(x, y) : false;
  },
  mouseDown: function(x, y) {
    return this.curState ? this.curState.mouseDown(x, y) : false;
  },
  mouseClick: function(x, y) {
    return this.curState ? this.curState.mouseClick(x, y) : false;
  },
  mouseDoubleClick: function(x, y) {
    return this.curState ? this.curState.mouseDoubleClick(x, y) : false;
  },
  mouseDrag: function(x, y) {
    return this.curState ? this.curState.mouseDrag(x, y) : false;
  },
  mouseHold: function(x, y) {
    return this.curState ? this.curState.mouseHold(x, y) : false;
  },

  // mouseClickKW: function(x, y) {
  //  var screenDivisionWidth = ig.system.width / 3;
  //  var sector = parseInt(x / screenDivisionWidth);
  //  sector = Math.min(this.testExpressions.length - 1, sector);
  //  sector = Math.max(0, sector);
    
  //  if (Math.abs(y - ig.system.height / 2) < 2 * this.font.height) {
  //    this.activateAlgebra2(this.testExpressions[sector][this.expIndeces[sector]]);
      
  //    this.expIndeces[sector] = (this.expIndeces[sector] + 1) % this.testExpressions.length;
  //  }
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
    this.parent(dt);
    joe.UpdateLoop.update();

    if (this.curState) {
      this.curState.update(dt);
    }
  },
    
  draw: function() {
    // Draw all entities and backgroundMaps
    this.parent();
    
    if (this.isAlgebra2transitioning()) {
        this.drawAl2transition();
    }
    
    if (this.curState && !this.isAlgebra2active() && !this.isAlgebra2transitioning()) {   
      this.curState.draw();
    }
  }

  // draw: function() {
  //   // Draw all entities and backgroundMaps
  //   this.parent();
    
  //   if (this.isAlgebra2transitioning()) {
  //       this.drawAl2transition();
  //   }
    
  //   if (!this.isAlgebra2active() && !this.isAlgebra2transitioning()) {    
  //     // Add your own drawing code here
  //     var screenDivisionWidth = ig.system.width / 3;
  //     var labels = ["Easy", "Medium", "Hard"];
      
  //     for (var i=0; i<3; ++i) {
  //       var x = screenDivisionWidth * (i + 1) - screenDivisionWidth / 2,
  //           y = ig.system.height/2;
            
  //         this.font.draw(labels[i], x, y, ig.Font.ALIGN.CENTER);
  //     }
  //   }
  // }
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', KinWizMain, 60, 1024, 768, 1 );

});
