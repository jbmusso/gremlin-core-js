var inherits = require('util').inherits;

var forOf = require('es6-iterator/for-of');

var TraverserSet = require('./traverserset');


function ExpandableStepIterator(hostStep) {
  this.traverserSet = new TraverserSet();
  this.hostStep = hostStep;
}

ExpandableStepIterator.prototype.next = function() {
  console.log('    - ExpandableStepIterator.next()==');
  var next;
  var i = 0;
  var previousStep;
  var traverser;

  if (!this.traverserSet.isEmpty()) {
    next = { value: this.traverserSet.remove(), done: false };

    return next;
  }

  previousStep = this.hostStep.getPreviousStep();
  next = previousStep.next();

  if (!next.done) {
    return next;
  } else {
    traverser = this.traverserSet.remove();

    next = {
      value: traverser,
      done: !traverser
    };

    return next;
  }
};

/**
 * Given a (Traverser?)Iterator, add all traversers to this.traverserSet
 */
ExpandableStepIterator.prototype.add = function(iterator) {
  console.log('==ExpandableStepIterator.add==');
  var cur;

  while (true) { // todo: replace with for..of loop?
    cur = iterator.next();

    if (!cur.done) {
      console.log('             - adding something', cur.value.constructor.name);
      this.traverserSet.add(cur.value);
    } else {
      break;
    }
  }
};

ExpandableStepIterator.prototype.clear = function() {
  this.traverserSet.clear();
};

module.exports = ExpandableStepIterator;