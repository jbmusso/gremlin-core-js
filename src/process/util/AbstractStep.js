var inherits = require('util').inherits;

var Step = require('../step');
var EmptyStep = require('./emptystep');

var ExpandableStepIterator = require('./expandablestepiterator');
var PathTraverser = require('../PathTraverser');
var TraversalHelper = require('./TraversalHelper');

function AbstractStep(traversal) {
  this.nextEnd = null;
  this.available = false;
  this.futureSetByChild = false;

  this.previousStep = EmptyStep.instance();
  this.nextStep = EmptyStep.instance();

  this.traversal = traversal;
  this.starts = new ExpandableStepIterator(this);
  this.label = ''; // int, stored as String
}

inherits(AbstractStep, Step);

AbstractStep.prototype.reset = function() {
  this.starts.clear();
  this.available = false;
  this.nextEnd = null;
};

AbstractStep.prototype.addStarts = function(starts) {
  this.starts.add(starts);
};

AbstractStep.prototype.setPreviousStep = function(step) {
  this.previousStep = step;
};

AbstractStep.prototype.getPreviousStep = function() {
  return this.previousStep;
};

AbstractStep.prototype.setNextStep = function(step) {
  this.nextStep = step;
};

AbstractStep.prototype.getNextStep = function() {
  return this.nextStep;
};

AbstractStep.prototype.setLabel = function(label) {
  this.label = label;
};

AbstractStep.prototype.getLabel = function() {
  return this.label;
};

/**
 * todo: merge AbstractStep.next() with AbstractStep.hasNext()
 */
AbstractStep.prototype.next = function() {
  var next;

  if (this.hasNext()) {
    if (this.available) {
      this.available = false;

      this.prepareTraversalForNextStep(this.nextEnd);
      next = { value: this.nextEnd, done: false };
      return next;
    } else {
      var nextTraverser = this.processNextStart();
      this.prepareTraversalForNextStep(nextTraverser.value);

      return nextTraverser;
    }
  } else {
    return { value: undefined, done: true };
  }
};

/**
 * This method internally calls this.processNextStart() which returns a
 * { value: Traverser, done: Boolean } object.
 */
AbstractStep.prototype.hasNext = function() {
  if (this.available) {
    return true;
  } else {
    var nextStart = this.processNextStart();

    if (!nextStart.done) {
      this.nextEnd = nextStart.value;
      this.available = true;
      return true;
    } else {
      this.available = false;
      return false;
    }
  }
};

AbstractStep.prototype.getTraversal = function() {
  return this.traversal;
};

AbstractStep.prototype.setTraversal = function(traversal) {
  this.traversal = traversal;
};

AbstractStep.prototype.processNextStart = function() {
  throw new Error('Not yet implemented');
};

AbstractStep.prototype.prepareTraversalForNextStep = function(traverser) {
  if (!traverser) {
    throw new Error('Traverser cannot be undefined');
  }

  if (traverser.constructor.name === 'Object') {
    throw new Error('This method requires something else');
  }

  if (!this.futureSetByChild) {
    traverser.setFuture(this.nextStep.getLabel());
  }

  if (traverser instanceof PathTraverser) {
    traverser.getPath().addLabel(this.getLabel());
  }

  if (TraversalHelper.isLabeled(this.label)) {
    this.traversal.getSideEffects().set(this.label, traverser.get());
  }
};

module.exports = AbstractStep;