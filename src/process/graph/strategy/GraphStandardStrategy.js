var inherits = require('util').inherits;

var _ = require('lazy.js');

var TraversalStrategy = require('../../TraversalStrategy');
var EngineDependent = require('../marker/EngineDependent');


function GraphStandardStrategy() {
}

inherits(GraphStandardStrategy, TraversalStrategy);


GraphStandardStrategy.prototype.apply = function(traversal) {
  _(traversal.getSteps())
    .filter(function(step) {
      var isEngineDependent = !!step.Engine && !!step.onEngine && typeof step.onEngine === 'function'; // duck typing, replaces instanceof EngineDependent
      return isEngineDependent;
    })
    .forEach(function(step) {
      step.onEngine(EngineDependent.Engine.STANDARD);
    });
};

GraphStandardStrategy.instance = function() {
  var instance = null;
  return instance ? instance : instance = new this();
};

module.exports = GraphStandardStrategy;