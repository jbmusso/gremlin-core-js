var inherits = require('util').inherits;

var Step = require('../step');
var Traverser = require('../Traverser');

function EmptyStep(argument) {
}

inherits(EmptyStep, Step);

EmptyStep.INSTANCE = new EmptyStep();

EmptyStep.prototype.addStarts = function(iterator) {
};

EmptyStep.prototype.setPreviousStep = function(step) {
};

EmptyStep.prototype.reset = function() {
};

EmptyStep.prototype.getPreviousStep = function() {
  return EmptyStep.instance();
};

EmptyStep.prototype.setNextStep = function(step) {
};

EmptyStep.prototype.getNextStep = function() {
  return EmptyStep.instance();
};

EmptyStep.prototype.setTraversal = function(traversal) {
};

EmptyStep.prototype.clone = function() {
  // body...
};

EmptyStep.prototype.getLabel = function(label) {
  return Traverser.Admin.NO_FUTURE;
};

EmptyStep.prototype.setLabel = function(label) {
};

EmptyStep.prototype.hasNext = function() {
  return false;
};

EmptyStep.prototype.getLast = function() {
  return new Error('NO_OBJECT');
};

EmptyStep.prototype.next = function() {
  return {
    value: undefined,
    done: true
  };
};

EmptyStep.prototype.getPreviousStep = function() {
  return this.instance();
};

EmptyStep.instance = function() {
  var instance = null;

  return instance ? instance : instance = new this();
};

module.exports = EmptyStep;