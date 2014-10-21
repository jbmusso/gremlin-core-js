var inherits = require('util').inherits;

var AbstractStep = require('../../util/AbstractStep');
var GraphSystem = require('../../../structure/graph.system.js');

function CountStep(traversal) {
  AbstractStep.call(this, traversal);
}

inherits(CountStep, AbstractStep);

CountStep.COUNT_KEY = GraphSystem.system("count");

CountStep.prototype.processNextStart = function() {
  var counter = this.getTraversal().getSideEffects().getOrCreate(CountStep.COUNT_KEY, function() { return 0; });
  var next;

  while (true) {
    next = this.starts.next();

    if (next.done) {
      this.getTraversal().getSideEffects().set(CountStep.COUNT_KEY, counter);

      return next; // exit loop
    }

    counter = counter + next.value.getBulk();
  }
};

CountStep.prototype.reset = function() {
  AbstractStep.prototype.reset.call(this);
  this.getTraversal().getSideEffects().remove(CountStep.COUNT_KEY);
};

CountStep.prototype.getSideEffectKey = function() {
  return CountStep.COUNT_KEY;
};

module.exports = CountStep;