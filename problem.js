/**
 * Data structure that stores the diagrams, starting equations, and manipulation steps
 * of a given kinematics problem.
 */

kw.problem = new joe.ClassEx(
  // Static Definition ////////////////////////////////////////////////////////
  null,

  // Instance Definition //////////////////////////////////////////////////////
  {
    TEXT_SIZE: 30,

    font: null,
    diagram: null,
    description: [],
    equations: [],
    manipulations: [],
    DESCRIPTION_MARGIN_X: 20,
    color: null,

    init: function(font, color, description) {
      this.font = font;
      this.color = color || kw.DRAW_COLOR_LIGHT_BLUE;
      this.description = this.initDescription(description);

      this.diagram = new kw.Diagram();
    },

    initDescription: function(text) {
      // Break the description text up into center-justified lines.
      // Start by counting the number of words.
      var words       = text.split(" "),
          wordCount   = words.length,
          i           = 0,
          testString  = null,
          metrics     = null,
          bestString  = null,
          bAddWord    = false;

      for (i=0, testString=words[0]; i<wordCount; ++i) {
        metrics = this.font.measureText(testString, this.TEXT_SIZE);

        if (metrics.bounds.maxx - metrics.bounds.minx > kw.GAME_WIDTH - 2 * this.DESCRIPTION_MARGIN_X) {
          // Text was too large for allotted space.
          if (!bestString) {
            // ERROR: a single token is too large to fit onscreen.
            // Communicate the problem and exit the loop.
            this.description.push(kw.strings.MALFORMED_DESCRIPTION);
            break;
          }
          else {
            // Insert this line into the description and start over
            // with a fresh line.
            this.description.push(bestString);
            bestString = null;
            testString = words[i] + " ";
            bAddWord = true;
          }
        }
        else {
          bestString = testString;

          testString += " ";
          bAddWord = true;
        }

        if (bAddWord && i + 1 < words.length) {
          testString += words[i + 1];
        }
      }

      // Add the final line to the description.
      if (bestString) {
        metrics = this.font.measureText(bestString, this.TEXT_SIZE);
        if (metrics.bounds.maxx - metrics.bounds.minx <= kw.GAME_WIDTH - 2 * this.DESCRIPTION_MARGIN_X) {
          this.description.push(bestString);
        }
      }

      // Now that we have full description text,
      // we can generate Labels for the GUI.
      for (i=0; i<this.description.length; ++i) {
        // Replace the text with equivalent labels.
        this.description[i] = new joe.GUI.Label(this.description[i],
                                                this.font,
                                                this.color,
                                                this.TEXT_SIZE,
                                                kw.GAME_WIDTH / 2,
                                                kw.GAME_HEIGHT / 2 / 2 - this.description.length * this.TEXT_SIZE / 2 + i * this.TEXT_SIZE,
                                                null,
                                                0.5,
                                                0.5);
        joe.GUI.addWidget(this.description[i]);
      }
    },

    getDiagram: function() {
      return this.diagram;
    },

    getDescription: function() {
      return this.description;
    }
  }
);