ig.module( 
	'games.kinwiz.state' 
)
.requires(
	'impact.game'
)
.defines(function(){

  state = ig.Class.extend({
    defaultState: {
      mouseUp: function(x, y) {return true;},
      mouseDown: function(x, y) {return true;},
      mouseDrag: function(x, y) {return true;},
      mouseOver: function(x, y) {return true;},
      mouseHold: function(x, y) {return true;},
      mouseClick: function(x, y) {return true;},
      mouseDoubleClick: function(x, y) {return true;}
    },

    init: function() {
      this.reset();
    },

    // loadModule allows us to swap one set of methods for another.
    loadModule: function(module) {
      var key = null;

      for (key in module) {
        this[key] = module[key];
      }
    },  
    
    reset: function() {
      this.loadModule(this.defaultState);
    },

    enter: function() {
    },

    exit: function() {
    },

    update: function(dt) {
    },

    draw: function() {
    }
  });

});

