var inherits = require('util').inherits;

var forOf = require('es6-iterator/for-of');

var TraverserSet = require('./traverserset');


function ExpandableStepIterator(hostStep) {
  this.traverserSet = new TraverserSet();
  this.hostStep = hostStep;
}

ExpandableStepIterator.prototype.hasNext = function() {
  // throw new Error('-..............');
  console.log('==ExpandableStepIterator.hasNext()==');
  return !this.traverserSet.isEmpty() || this.hostStep.getPreviousStep().hasNext();
};

ExpandableStepIterator.prototype.next = function() {
  console.log('==ExpandableStepIterator.next()==');
  var next;

  if (!this.traverserSet.isEmpty()) {
    next = {
      value: this.traverserSet.remove(),
      done: false
    };

    return next;
  }

  next = this.hostStep.getPreviousStep().next();

  if (!next.done) {
    return next;
  } else {
    var traverser = this.traverserSet.remove();

    next = {
      value: traverser,
      done: !traverser
    };

    return next;
  }
};

ExpandableStepIterator.prototype.add = function(iterator) {
  console.log('==ExpandableStepIterator.add== !!!!!!!!!!!!!');

  var cur = iterator.next().value;

  //TODO: add for..of loop as replacement for forEachRemaining
  // while (!iterator.next().done) {
  this.traverserSet.add(cur);
  // }
};

ExpandableStepIterator.prototype.clear = function() {
  this.traverserSet.clear();
};

module.exports = ExpandableStepIterator;