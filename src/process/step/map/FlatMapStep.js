var inherits = require('util').inherits;

var AbstractStep = require('../../util/AbstractStep');

function FlatMapStep(traversal) {
  this.fn = null;
  this.iterator = null;
  AbstractStep.call(this, traversal);
}

inherits(FlatMapStep, AbstractStep);

FlatMapStep.prototype.setFunction = function(fn) {
  this.fn = fn;
};

/**
 * @return {value/done}
 */
FlatMapStep.prototype.processNextStart = function() {
  var traverser;
  var ret;

  while (true) {
    traverser = this.getNext();

    if (traverser) {
      return traverser;
    }
  }
};

/**
 * @return {value/done}
 */
FlatMapStep.prototype.getNext = function() {

  var next;
  var nextIterator;
  var traverser;
  var iterator;

  if (!this.iterator) {
    nextIterator = this.starts.next(); // starts === ExpandableStepIterator
    traverser = nextIterator.value;

    // Because the iterator is empty, there's
    if (nextIterator.done) { // Mimic thrown error in Java
      return nextIterator;
    }

    iterator = this.fn(traverser);

    this.iterator = new FlatMapStep.FlatMapTraverserIterator(traverser, this, iterator);
    return null;
  } else {
    next = this.iterator.next();

    if (!next.done) {
      return next;
    } else {
      this.iterator = null;
      return null;
    }
  }
};

FlatMapStep.prototype.reset = function() {
  AbstractStep.prototype.reset.call(this);
  this.iterator = null;
};


FlatMapStep.FlatMapTraverserIterator = function(head, step, iterator) {
  this.head = head;
  this.step = step;
  this.iterator = iterator;
};

FlatMapStep.FlatMapTraverserIterator.prototype.next = function() {
  var label = this.step.getLabel();
  var next = this.iterator.next();
  var element = next.value; // vertex, edge, etc.
  var child;
  var ret;

  if (!next.done) {
    child = this.head.makeChild(label, element);
    ret = { value: child, done: false };
    return ret;
  } else {
    return next; // exit loop
  }
};


module.exports = FlatMapStep;
