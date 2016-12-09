var inherits = require('util').inherits;

var Step = require('../Step');
var EmptyStep = require('./EmptyStep');

var ExpandableStepIterator = require('./ExpandableStepIterator');
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
  var nextTraverser = this.processNextStart();

  if (nextTraverser.done) {
    return nextTraverser;
  }

  this.nextEnd = nextTraverser.value;
  this.prepareTraversalForNextStep(this.nextEnd);

  return { value: this.nextEnd, done: false };
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
  var path;
  var element;

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
    path = traverser.getPath();
    path.addLabel(this.getLabel());
  }

  if (TraversalHelper.isLabeled(this.label)) {
    element = traverser.get();
    this.traversal.getSideEffects().set(this.label, element);
  }
};

module.exports = AbstractStep;
