/**
 * Data structure that stores the diagrams, starting equations, and manipulation steps
 * of a given kinematics problem.
 */

kw.problem = new joe.ClassEx(
  // Static Definition ////////////////////////////////////////////////////////
  null,

  // Instance Definition //////////////////////////////////////////////////////
  {
    primitives: [],
    equations: [],
    manipulations: [],

    addPrimitive: function(newPrim) {
      var primID = [];

      // Create a primitive and add it here.

      this.primitives.push(primID);

      return primID;
    },

    changePrimitivie: function(primID, newPrim) {

    },

    removePrimitive: function(primID) {
      joe.Utility.erase(this.primitives, primID);
    }
  }
);