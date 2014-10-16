var inherits = require('util').inherits;

var FlatMapStep = require('./flatmapstep');
var Vertex = require('../../../structure/vertex');


function VertexStep(traversal, returnClass, direction, branchFactor, edgeLabels) {
  FlatMapStep.call(this, traversal);
  this.direction = direction;
  this.edgeLabels = edgeLabels || [];
  this.branchFactor = branchFactor;
  this.returnClass = returnClass;

  var self = this;

  if (returnClass === Vertex) {
    this.setFunction(function(traverser) {
      var element = traverser.get();
      var vertices = element.getIterators().vertices(self.direction, self.branchFactor, self.edgeLabels, element);

      return vertices;
    });
  } else { // edges
    this.setFunction(function(traverser) {
      return traverser.get().getIterators().edges(self.direction, self.branchFactor, self.edgeLabels);
    });
  }
}

inherits(VertexStep, FlatMapStep);

VertexStep.prototype.reverse = function() {
  //TODO: move to enum/class
  switch (this.direction) {
    case 'out':
      this.direction = 'in';
      break;
    case 'in':
      this.direction = 'out';
      break;
  }
};

VertexStep.prototype.getDirection = function() {
  return this.direction;
};

VertexStep.prototype.getEdgeLabels = function() {
  return this.edgeLabels;
};

VertexStep.prototype.getBranchFactor = function() {
  return this.branchFactor;
};

VertexStep.prototype.getReturnClass = function() {
  return this.returnClass;
};

module.exports = VertexStep;