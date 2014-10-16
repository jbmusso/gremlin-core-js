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
  var nextTraverser = this.starts.next(); // this.starts === is an instanceof ExpandableStepIterator
  var traverser;

  if (!nextTraverser || nextTraverser.done) { // equivalent of catching an error which this.starts.next() may throw in the Java source
    // maybe this should be made more abstract and moved to the parent (calling) function
    // throw new Error('processNextStart should not handle a missing value');
    // the !nextTraverser check may not be required

    return { value: undefined, done: true };
  }

  traverser = nextTraverser.value;

  if (this.consumer) {
    this.consumer.accept(traverser);
  }

  return { value: traverser, done: false };
};

module.exports = SideEffectStep;