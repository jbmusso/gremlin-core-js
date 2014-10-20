var inherits = require('util').inherits;

var AbstractStep = require('../../util/AbstractStep');

function MapStep(traversal) {
  this.fn = null;
  AbstractStep.call(this, traversal);
}

inherits(MapStep, AbstractStep);

MapStep.prototype.processNextStart = function() {
  var nextTraverser;
  var traverser;
  var end;
  var value;

  while (true) {
    nextTraverser = this.starts.next();

    if (nextTraverser.done) {
      return nextTraverser; // exit
    }

    traverser = nextTraverser.value;
    end = this.fn(traverser);

    if (end) {
      value = traverser.makeChild(this.getLabel(), end);
      return { value: value, done: false };
    }
  }
};

MapStep.prototype.setFunction = function(fn) {
  this.fn = fn;
};

module.exports = MapStep;