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

  while (true) {
    nextTraverser = this.starts.next();

    if (nextTraverser.done) {
      return nextTraverser;
    }

    traverser = nextTraverser.value;
    end = this.fn(traverser);

    if (end) {
      return { value: traverser.makeChild(this.getLabel(), end), done: false };
    }
  }
};

MapStep.prototype.setFunction = function(fn) {
  this.fn = fn;
};

module.exports = MapStep;