var inherits = require('util').inherits;

var SideEffectStep = require('../sideEffect/SideEffectStep');

function MarkerIdentityStep(traversal) {
  SideEffectStep.call(this, traversal);
}

inherits(MarkerIdentityStep, SideEffectStep);

module.exports = MarkerIdentityStep;