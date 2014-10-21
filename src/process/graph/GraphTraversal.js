var inherits = require('util').inherits;

var _ = require('lodash');
require('es6-shim');

var Traversal = require('../traversal');
// var DefaultGraphTraversal = require('./util/defaultgraphtraversal');

var PathStep = require('../step/map/pathstep');
var VertexStep = require('../step/map/VertexStep');
var EdgeVertexStep = require('../step/map/EdgeVertexStep');
var Vertex = require('../../structure/vertex');
var Edge = require('../../structure/edge');


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

  return this.addStep(new VertexStep(this, Vertex, direction, branchFactor, edgeLabels));
};

GraphTraversal.prototype.out = function(edgeLabels) {
  var args = [].slice.apply(arguments);
  var toArguments = ['out', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(args);
  }

  return this.to.apply(this, toArguments);
};

GraphTraversal.prototype.in = function(edgeLabels) {
  var args = [].slice.apply(arguments);
  var toArguments = ['in', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(args);
  }

  return this.to.apply(this, toArguments);
};

GraphTraversal.prototype.both = function(edgeLabels) {
  var args = [].slice.apply(arguments);
  var toArguments = ['both', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(args);
  }

  return this.to.apply(this, toArguments);
};

GraphTraversal.prototype.toE = function(direction, branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    edgeLabels = _.rest(arguments, 2);
  } else {
    edgeLabels = _.rest(arguments, 1);
    branchFactor = Number.MAX_SAFE_INTEGER;
  }

  return this.addStep(new VertexStep(this, Edge, direction, branchFactor, edgeLabels));
};

GraphTraversal.prototype.outE = function(edgeLabels) {
  var args = [].slice.apply(arguments);
  var toArguments = ['out', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(args);
  }

  return this.toE.apply(this, toArguments);
};

GraphTraversal.prototype.inE = function(edgeLabels) {
  var args = [].slice.apply(arguments);
  var toArguments = ['in', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(args);
  }

  return this.toE.apply(this, toArguments);
};

GraphTraversal.prototype.bothE = function(edgeLabels) {
  var args = [].slice.apply(arguments);
  var toArguments = ['both', Number.MAX_SAFE_INTEGER];

  if (arguments.length > 0) {
    toArguments = toArguments.concat(args);
  }

  return this.toE.apply(this, toArguments);
};

GraphTraversal.prototype.toV = function(direction) {
  return this.addStep(new EdgeVertexStep(this, direction));
};

GraphTraversal.prototype.inV = function() {
  return this.toV('in'); //todo: use Direction enum
};

GraphTraversal.prototype.outV = function() {
  return this.toV('out'); //todo: use Direction enum
};

GraphTraversal.prototype.bothV = function() {
  return this.toV('both'); //todo: use Direction enum
};

// .......

GraphTraversal.prototype.path = function(pathFunctions) { //...pathFunctions
  if (arguments.length > 0) {
    pathFunctions = [].slice.apply(arguments);
  }

  return this.addStep(new PathStep(this, pathFunctions));
};

module.exports = GraphTraversal;