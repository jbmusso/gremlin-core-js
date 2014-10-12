var inherits = require('util').inherits;

var _ = require('lodash');

var MapStep = require('./MapStep');
var TraversalHelper = require('../../util/TraversalHelper');


function BackStep(traversal, stepLabel) {
  this.requiresPathsBool = false;

  MapStep.call(this, traversal);
  this.stepLabel = stepLabel;
  TraversalHelper.getStep(this.stepLabel, this.traversal);

  this.setFunction(function(traverser) {
    return this.requiresPaths() ? traverser.getPath().get(this.stepLabel) : traverser.get(this.stepLabel);
  });
}

inherits(BackStep, MapStep);  // extends
_.extend(BackStep.prototype, PathConsumer.prototype); // impl.
_.extend(BackStep.prototype, EngineDependent.prototype); // impl.

BackStep.prototype.requiresPaths = function() {
  return this.requiresPathsBool;
};

BackStep.prototype.onEngine = function(engine) {
  this.requiresPathsBool = engine.equals(Engine.COMPUTER);
};

// BackStep.prototype.toString = function() {
//   // body...
// };