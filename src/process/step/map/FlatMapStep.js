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

FlatMapStep.prototype.processNextStart = function() {
  console.log('==', this.constructor.name, 'processNextStart()===');
  var traverser;

  while (true) {
    try {
      traverser = this.getNext();
    } catch(e) {
      console.log('ERROR', e, e.stack);
    }
    console.log('--traverser', traverser);

    if (traverser) {
      return traverser;
    }
  }
};

FlatMapStep.prototype.getNext = function() {
  console.log('==', this.constructor.name, 'getNext()');
  if (!this.iterator) {
    console.log('--no iterator', this.starts.constructor.name);
    var expandableStepIterator = this.starts;

    var traverser;
    try {
      traverser = expandableStepIterator.next();
    } catch (e) {
      // console.log(e);

    }

    console.log('...........', traverser);
    this.iterator = new FlatMapTraverserIterator(traverser, this, this.fn(traverser));
    return null;
  } else {
    if (this.iterator.hasNext()) {
      return this.iterator.next();
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


FlatMapStep.FlatMapTraverserIterator = FlatMapTraverserIterator;

function FlatMapTraverserIterator(head, step, iterator) {
  this.head = head;
  this.step = step;
  this.iterator = iterator;
}

FlatMapTraverserIterator.prototype.hasNext = function() {
  return this.iterator.hasNext();
};

FlatMapTraverserIterator.prototype.next = function() {
  return this.head.makeChild(this.step.getLabel(), this.iterator.next());
};


module.exports = FlatMapStep;