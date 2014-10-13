var inherits = require('util').inherits;

var _ = require('lodash');

var TraversalStrategy = require('../../TraversalStrategy');
var TraversalHelper = require('../../util/TraversalHelper');
var TraverserSource = require('../marker/TraverserSource');


function TraverserSourceStrategy() {
}

inherits(TraverserSourceStrategy, TraversalStrategy);
// _.extend(TraverserSourceStrategy, TraversalStrategy);

TraverserSourceStrategy.prototype.apply = function(traversal) {
  console.log('== TraverserSourceStrategy.apply() ==');
  var trackPaths = TraversalHelper.trackPaths(traversal);

  console.log('  - For each TraverserSource steps, generate traverser iterators');
  traversal.getSteps().forEach(function(step) {
    // if (step instanceof TraverserSource) { //bugged, impl. duck typing
    if (step.generateTraverserIterator && typeof step.generateTraverserIterator === 'function') {
      step.generateTraverserIterator(trackPaths);
    }
  });

  console.log('  - Done generating iterators');
  console.log('== //TraverserSourceStrategy.apply() ==');
};

TraverserSourceStrategy.instance = function() {
  var instance = null;
  return instance ? instance : instance = new this();
};

module.exports = TraverserSourceStrategy;