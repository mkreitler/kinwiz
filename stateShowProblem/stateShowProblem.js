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

    init: function(problem) {
      this.problem = problem;
    },
  });

});
