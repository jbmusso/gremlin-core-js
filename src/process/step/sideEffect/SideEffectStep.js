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
 * @return {Traverser}
 */
SideEffectStep.prototype.processNextStart = function() {
  console.log('  - SideEffectStep.processNextStart==', this.constructor.name);
  var nextTraverser = this.starts.next(); // this.starts === ExpandableStepIterator

  var traverser = nextTraverser.value;


  if (this.consumer) {
    this.consumer.accept(traverser);
  }

  return traverser;
};

SideEffectStep.addToCollection = function(collection, s, bulk) {
  if (collection instanceof BulkList) {
    collection.add(s, bulk);
  } else if (collection instanceof Set) {
    collection.add(s); //todo: add Set class
  } else {
    for (var i = 0; i < bulk.length; i++) {
      collection.add(s);
    }
  }
};

module.exports = SideEffectStep;