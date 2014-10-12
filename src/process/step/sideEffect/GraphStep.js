var inherits = require('util').inherits;

var _ = require('lodash');

var StartStep = require('./startstep');
var TraverserSource = require('../../graph/marker/traversersource');
var Vertex = require('../../../structure/vertex');
var Edge = require('../../../structure/edge');

function GraphStep(traversal, returnClass) {
  StartStep.call(this, traversal, returnClass);
  this.returnClass = returnClass;
}

inherits(GraphStep, StartStep); // extends
_.extend(GraphStep.prototype, TraverserSource.prototype); // impl.
_.extend(GraphStep.prototype, StartStep.prototype);



GraphStep.prototype.returnsVertices = function() {
  return this.returnClass === Vertex;
};

GraphStep.prototype.returnsEdges = function() {
  return this.returnClass === Edge;
};

module.exports = GraphStep;