var inherits = require('util').inherits;

var forOf = require('es6-iterator/for-of');

var TraverserSet = require('./TraverserSet');


function ExpandableStepIterator(hostStep) {
  this.expander = null;
  this.traverserSet = new TraverserSet();
  this.hostStep = hostStep;
}

/**
 * @return {value/done}
 */
ExpandableStepIterator.prototype.next = function() {
  var nextExpander;
  var nextTraverser;
  var previousStep;

  if (this.expander) {
    nextExpander = this.expander.next();
  }

  if (this.expander && !nextExpander.done) {
    return nextExpander;
  }

  previousStep = this.hostStep.getPreviousStep();
  nextTraverser = previousStep.next();

  if (!nextTraverser) {
    nextTraverser = { value: undefined, done: true };
  }

  return nextTraverser;
};

/**
 * Given a (Traverser?)Iterator, add all traversers to this.traverserSet
 */
ExpandableStepIterator.prototype.add = function(iterator) {
  if (!this.expander) {
    this.expander = new ExpandableStepIterator.ExpandableIterator();
  }

  this.expander.add(iterator);
};

ExpandableStepIterator.prototype.clear = function() {
  this.traverserSet.clear();
};


// ExpendableIterator

ExpandableStepIterator.ExpandableIterator = function() {
  this.queue = []; //LinkedList
};

ExpandableStepIterator.ExpandableIterator.prototype = {
  clear: function() {
    this.queue.length = 0;
  },

  next: function() {
    var iterator;
    var next;

    while (true) {
      iterator = this.queue[0]; // get head

      if (iterator) {
        next = iterator.next();
      } else {
        return { value: undefined, done: true };
      }

      if (!next.done) {
        return next;
      } else {
        this.queue.shift(); // remove first element
        return { value: undefined, done: true };
      }
    }
  },

  add: function(iterator) {
    this.queue.push(iterator);
  }
};

module.exports = ExpandableStepIterator;
