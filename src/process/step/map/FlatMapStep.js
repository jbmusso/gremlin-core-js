var inherits = require('util').inherits;

var AbstractStep = require('../../util/abstractstep');

function FlatMapStep(traversal) {
  this.fn = null;
  this.iterator = null;
  AbstractStep.call(this, traversal);
}

inherits(FlatMapStep, AbstractStep);

FlatMapStep.prototype.setFunction = function(fn) {
  console.log('==', this.constructor.name, 'setFunction()===');
  this.fn = fn;
};

/**
 * @return {Traverser}
 */
FlatMapStep.prototype.processNextStart = function() {
  console.log('==FlatMapStep.processNextStart()==', this.constructor.name);
  var traverser;

  while (true) {
    traverser = this.getNext();


    if (traverser) { //ok
      return traverser;
    }
  }
};

/**
 * @return {Traverser}
 */
FlatMapStep.prototype.getNext = function() {
  console.log('==FlatMapStep.getNext()==', this.constructor.name);

  var traverser;
  var itty;
  var next;

  if (this.iterator === null) {
    traverser = this.starts.next().value; // starts === ExpandableStepIterator

    itty = this.fn(traverser);

    this.iterator = new FlatMapStep.FlatMapTraverserIterator(traverser, this, itty);
    return null;
  } else {
    next = this.iterator.next();

    if (!next.done) {
      return next.value;
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
  console.log('==FlatMapTraverserIterator.next()==');
  var label = this.step.getLabel();
  var next = this.iterator.next();
  var child = this.head.makeChild(label, next);

  var ret = {
    value: child,
    done: next.done // equivalent to !!child
  };

  return ret;
};


module.exports = FlatMapStep;