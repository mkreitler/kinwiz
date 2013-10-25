ig.module( 
  'games.kinwiz.stateShowProblem.stateShowProblem' 
)
.requires(
  'impact.game',
  'impact.font',

  'games.kinwiz.state'
)
.defines(function(){

  StateShowProblem = state.extend({
    problem: null,
    labelNextStep: null,
    labelTapHere: null,

    init: function(problem, font, inputHandler) {
      this.problem = problem;
      this.labelNextStep = new joe.GUI.Label(kw.strings.SHOW_PROBLEM,
                                             font,
                                             kw.DRAW_COLOR_YELLOW,
                                             kw.DEFAULT_TEXT_SIZE,
                                             kw.GAME_WIDTH / 2,
                                             kw.GAME_HEIGHT * 1 / 4 - kw.DEFAULT_TEXT_SIZE / 2,
                                             inputHandler,
                                             0.5,
                                             0.5);

      this.labelTapHere = new joe.GUI.Label(kw.strings.TAP_HERE,
                                            font,
                                            kw.DRAW_COLOR_YELLOW,
                                            kw.DEFAULT_TEXT_SIZE,
                                            kw.GAME_WIDTH / 2,
                                            kw.GAME_HEIGHT * 1 / 4 - kw.DEFAULT_TEXT_SIZE / 2 + kw.DEFAULT_TEXT_SIZE,
                                            inputHandler,
                                            0.5,
                                            0.5);
    },

    enter: function() {
      if (this.problem) {
        this.problem.showText();
        joe.GUI.addWidget(this.labelNextStep);
        joe.GUI.addWidget(this.labelTapHere);
      }
    },

    exit: function() {
      if (this.problem) {
        this.problem.hideText();
        joe.GUI.removeWidget(this.labelNextStep);
        joe.GUI.removeWidget(this.labelTapHere);
      }
    }
  });

});
