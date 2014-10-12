var inherits = require('util').inherits;

var _ = require('lazy.js');

var TraversalStrategy = require('../../TraversalStrategy');
var EngineDependent = require('../marker/EngineDependent');


function GraphStandardStrategy() {
}

inherits(GraphStandardStrategy, TraversalStrategy);


GraphStandardStrategy.prototype.apply = function(traversal) {
  console.log('==GraphStandardStrategy.apply()==');
  _(traversal.getSteps())
    .filter(function(step) {
      console.log(' *', step.constructor.name);
      var isEngineDependent = !!step.Engine && !!step.onEngine && typeof step.onEngine === 'function'; // duck typing, replaces instanceof EngineDependent
      console.log(isEngineDependent);
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