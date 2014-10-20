var inherits = require('util').inherits;

var AbstractStep = require('../../util/abstractstep');


function SideEffectStep(traversal) {
  this.consumer = null;
  AbstractStep.call(this, traversal);
}

inherits(SideEffectStep, AbstractStep);

SideEffectStep.prototype.setConsumer = function(consumer) {
  this.consumer = consumer;
};

/**
 * @return {value/done}
 */
SideEffectStep.prototype.processNextStart = function() {
  var traverser;
  var nextTraverser = this.starts.next(); // this.starts === is an instanceof ExpandableStepIterator

  if (nextTraverser.done) {
    return nextTraverser; // exit loop
  }

  traverser = nextTraverser.value;

  if (this.consumer) {
    this.consumer.accept(traverser);
  }

  return { value: traverser, done: false };
};

module.exports = SideEffectStep;