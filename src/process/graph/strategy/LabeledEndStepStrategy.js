var inherits = require('util').inherits;

var _ = require('lodash');

var TraversalStrategy = require('../../TraversalStrategy');
var TraversalHelper = require('../../util/TraversalHelper');
var MarkerIdentityStep = require('../../step/util/MarkerIdentityStep');

function LabeledEndStepStrategy() {
}

inherits(LabeledEndStepStrategy, TraversalStrategy);
// _.extend(LabeledEndStepStrategy, TraversalStrategy);

LabeledEndStepStrategy.prototype.apply = function(traversal) {
  console.log('==LabeledEndStepStrategy.apply()==');
  var step = TraversalHelper.getEnd(traversal);

  if (TraversalHelper.isLabeled(step)) {
    TraversalHelper.insertStep(new MarkerIdentityStep(traversal), traversal.getSteps().length, traversal);
  }
};

LabeledEndStepStrategy.instance = function() {
  var instance = null;
  return instance ? instance : instance = new this();
};


module.exports = LabeledEndStepStrategy;