var inherits = require('util').inherits;

var ElementTraversal = require('./ElementTraversal');

function VertexPropertyTraversal() { // interface
}

inherits(VertexPropertyTraversal, ElementTraversal);

VertexPropertyTraversal.prototype.start = function() {
  var traversal = GraphTraversal.of();
  return traversal.addStep(new StartStep(traversal, this));
};

VertexPropertyTraversal.prototype.trackPaths = function() {
  return this.start().trackPaths();
};

VertexPropertyTraversal.prototype.count = function() {
  return this.start().count();
};

VertexPropertyTraversal.prototype.submit = function(graphComputer) {
  this.start().submit(graphComputer);
};

// .......... to be continued


module.exports = VertexPropertyTraversal;