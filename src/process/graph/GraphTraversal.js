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

GraphTraversal.prototype.otherV = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.order = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.orderBy = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.shuffle = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.properties = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.propertyMap = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.hiddens = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.hiddenMap = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.hiddenValueMap = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.hiddenValue = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.value = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.key = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.value = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.valueMap = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.values = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.path = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.back = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.match = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.select = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.union = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.intersect = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.unfold = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.fold = function() {
  throw new Error('Not yet implemented');
};


///////////////////// FILTER STEPS /////////////////////

GraphTraversal.prototype.filter = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.inject = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.dedup = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.except = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.where = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.has = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.hasNot = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.interval = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.random = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.range = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.retain = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.retain = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.simplePath = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.cyclicPath = function() {
  throw new Error('Not yet implemented');
};


///////////////////// SIDE-EFFECT STEPS /////////////////////

GraphTraversal.prototype.sideEffect = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.cap = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.count = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.subgraph = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.aggregate = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.groupBy = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.groupCount = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.addE = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.addInE = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.addOutE = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.addBothE = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.timeLimit = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.tree = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.store = function() {
  throw new Error('Not yet implemented');
};


///////////////////// BRANCH STEPS /////////////////////

GraphTraversal.prototype.branch = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.jump = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.until = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.choose = function() {
  throw new Error('Not yet implemented');
};


///////////////////// UTILITY STEPS /////////////////////

GraphTraversal.prototype.trackPaths = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.as = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.profile = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.remove = function() {
  throw new Error('Not yet implemented');
};

GraphTraversal.prototype.with = function() {
  throw new Error('Not yet implemented');
};

module.exports = GraphTraversal;