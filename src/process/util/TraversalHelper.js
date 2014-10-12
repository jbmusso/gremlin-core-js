var _lazy = require('lazy.js');
var _ = require('lodash');

var GraphKey = require('../../structure/graph.key');
var EmptyStep = require('./EmptyStep');


function TraversalHelper() {
}


TraversalHelper.isLabeled = function(step) {
  console.log('==TraversalHelper.isLabeled==');

  var label = _.isString(step) ? step : step.getLabel();
  var isLabeled = GraphKey.isHidden(label);

  return isLabeled;
};

TraversalHelper.getStart = function(traversal) {
  return traversal.getSteps()[0];
};

TraversalHelper.getEnd = function(traversal) {
  var steps = traversal.getSteps();

  return steps[steps.length - 1];
};


TraversalHelper.insertStep = function(step, index, traversal) {
  traversal.getSteps().splice(index, 0, step);
  TraversalHelper.reLabelSteps(traversal);
  TraversalHelper.reLinkSteps(traversal);
};

///.............

TraversalHelper.reLabelSteps = function(traversal) {
  var steps = traversal.getSteps();
  var step;

  for (var i = 0; i < steps.length; i++) {
    step = steps[i];

    if (!TraversalHelper.isLabeled(step)) {
      step.setLabel(GraphKey.hide(i.toString()));
    }
  }
};

TraversalHelper.reLinkSteps = function(traversal) {
  var steps = traversal.getSteps();
  var step;

  for (var i = 0; i < steps.length; i++) {
    var previousStep = i > 0 ? steps[i - 1] : null;
    var currentStep = steps[i];
    var nextStep = i < steps.length - 1 ? steps[i + 1] : null;

    currentStep.setPreviousStep(null !== previousStep ? previousStep : EmptyStep.instance());
    currentStep.setNextStep(null !== nextStep ? nextStep : EmptyStep.instance());
  }
};

TraversalHelper.trackPaths = function(traversal) {
  console.log('==TraversalHelper.trackPaths()==');

  var steps = traversal.getSteps();

  var isEmpty = _lazy(steps)
    .filter(function(step) {
      // return step instanceof PathConsumer && step.requiresPaths(); //TODO BUG, improve check with duck typing
      var path = !!(step.requiresPaths && step.requiresPaths());
      return path;
    })
    .isEmpty();

  return !isEmpty;
};

module.exports = TraversalHelper;