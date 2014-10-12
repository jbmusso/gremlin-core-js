var inherits = require('util').inherits;


function Step(argument) {
  // body...
}

Step.prototype.hasNext = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.hasNext = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.addStarts = function(iterator) {
  throw new Error('Must be overloaded');
};

Step.prototype.setPreviousStep = function(step) {
  throw new Error('Must be overloaded');
};

Step.prototype.getPreviousStep = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.setNextStep = function(step) {
  throw new Error('Must be overloaded');
};

Step.prototype.getNextStep = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.getTraversal = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.setTraversal = function(traversal) {
  throw new Error('Must be overloaded');
};

Step.prototype.reset = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.clone = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.getLabel = function() {
  throw new Error('Must be overloaded');
};

Step.prototype.setLabel = function(label) {
  throw new Error('Must be overloaded');
};

module.exports = Step;