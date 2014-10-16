var inherits = require('util').inherits;

var _ = require('lodash');
require('es6-shim');

var Traversal = require('../traversal');
// var DefaultGraphTraversal = require('./util/defaultgraphtraversal');

var VertexStep = require('../step/map/vertexstep');
var Vertex = require('../../structure/vertex');


function GraphTraversal() { // interface
}

inherits(GraphTraversal, Traversal); // extends

GraphTraversal.of = function(graph) {
  var DefaultGraphTraversal = require('./util/defaultgraphtraversal');
  var traversal = new DefaultGraphTraversal(); //todo: resolve loop require'ing

  if (graph) {
    traversal.getSideEffects().setGraph(graph);
  }

  return traversal;
};

/**
 * @return {Traversal}
 */
GraphTraversal.prototype.addStep = function(step) {
  var traversal = Traversal.prototype.addStep.call(this, step);

  return traversal;
};

GraphTraversal.prototype.trackPaths = function() {
  throw new Error('Must implement this in GraphTraversal class');
};

GraphTraversal.prototype.count = function() {
  throw new Error('Must implement this in GraphTraversal class');
};

// Transform steps
GraphTraversal.prototype.map = function(fn) {
  var mapStep = new MapStep(this);
  mapStep.setFunction(fn);
  return this.addStep(mapStep);
};

GraphTraversal.prototype.flatMap = function(fn) {
  var flatMapStep = new FlatMapStep(this);
  flatMapStep.setFunction(fn);

  return this.addStep(flatMapStep);
};

GraphTraversal.prototype.to = function(direction, branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    edgeLabels = _.rest(arguments, 2);
  } else {
    edgeLabels = _.rest(arguments, 1);
    branchFactor = Number.MAX_SAFE_INTEGER;
  }

  var traversal = this.addStep(new VertexStep(this, Vertex, direction, branchFactor, edgeLabels));

  return traversal;
};

GraphTraversal.prototype.out = function(edgeLabels) {
  var toArguments = ['out', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(arguments);
  }

  return this.to.apply(this, toArguments);
};


module.exports = GraphTraversal;