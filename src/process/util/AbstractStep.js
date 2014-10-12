var inherits = require('util').inherits;

var Step = require('../step');
var EmptyStep = require('./emptystep');

var ExpandableStepIterator = require('./expandablestepiterator');
var PathTraverser = require('../PathTraverser');
var TraversalHelper = require('./TraversalHelper');

function AbstractStep(traversal) {
  console.log('==AbstractStep.constructor==');
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
  console.log('==AbstractStep.reset==');
  this.starts.clear();
  this.available = false;
  this.nextEnd = null;
};

AbstractStep.prototype.addStarts = function(starts) {
  console.log('==AbstractStep.addStarts==');
  this.starts.add(starts);
};

AbstractStep.prototype.setPreviousStep = function(step) {
  console.log('==AbstractStep.setPreviousStep==');
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

AbstractStep.prototype.next = function() {
  console.log('==AbstractStep.next()==', this.constructor.name);
  var next = {};

  if (this.available) {
    this.available = false;
    this.prepareTraversalForNextStep(this.nextEnd);

    next = {
      value: this.nextEnd,
      done: !this.nextEnd
    };

  } else {
    var traverser = this.processNextStart();
    this.prepareTraversalForNextStep(traverser);

    next = {
      value: traverser,
      done: !traverser
    };
  }

  return next;
};

// AbstractStep.prototype.hasNext = function() {
//   console.log('@==AbstractStep.hasNext==/', this.constructor.name);
//   console.log(this.available);

//   if (this.available) {
//     return true;
//   }
//   else {
//     // console.log('&&&&&&&&&&&&&');
//     // console.log();
//     // this.processNextStart();
//     // console.log(;
//     var nextStart = this.processNextStart();
//     // console.log(nextStart);

//     // try {
//     //   this.nextEnd = this.processNextStart();
//     //   this.available = true;
//     //   return true;
//     // } catch (e) { //todo: handle flow w/o error but w/ iterator?
//     //   this.available = false;
//     //   return false;
//     // }
//   }
// };

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
  console.log('==prepareTraversalForNextStep==');

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