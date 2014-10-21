var inherits = require('util').inherits;

var FlatMapStep = require('./FlatMapStep');

function EdgeVertexStep(traversal, direction) {
  FlatMapStep.call(this, traversal);
  this.direction = direction;
  this.setFunction(function(traverser) {
    return traverser.get().getIterators().vertexIterator(this.direction);
  });
}

inherits(EdgeVertexStep, FlatMapStep);

// EdgeVertexStep.prototype.toString = function() {
//
// };

EdgeVertexStep.prototype.reverse = function() {
  throw new Error('Not yet implemented in EdgeVertexStep');
};


module.exports = EdgeVertexStep;