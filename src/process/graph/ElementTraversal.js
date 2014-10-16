var _ = require('lodash');

var GraphTraversal = require('./graphtraversal');


function ElementTraversal() { // extends/implements nothing
}

ElementTraversal.prototype.start = function() {
  var traversal = GraphTraversal.of();
  var starStep = new StartStep(traversal, this);

  return traversal.addStep(starStep);
};

ElementTraversal.prototype.trackPaths = function() {
  return this.start().trackPaths();
};

ElementTraversal.prototype.count = function() {
  return this.start().count();
};

ElementTraversal.prototype.submit = function(graphComputer) {
  return this.start().submit(graphComputer);
};

ElementTraversal.prototype.map = function(fn) {
  return this.start().map(fn);
};

ElementTraversal.prototype.flatMap = function(fn) {
  return this.start().flatMap(fn);
};

ElementTraversal.prototype.identity = function() {
  return this.start().identity();
};

ElementTraversal.prototype.to = function(direction, branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().to(direction, branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().to(direction, edgeLabels);
  }
};

ElementTraversal.prototype.out = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().out(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().out(edgeLabels);
  }
};

ElementTraversal.prototype.in = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().in(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().in(edgeLabels);
  }
};

ElementTraversal.prototype.both = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().both(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().both(edgeLabels);
  }
};

ElementTraversal.prototype.toE = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().toE(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().toE(edgeLabels);
  }
};

ElementTraversal.prototype.outE = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().outE(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().outE(edgeLabels);
  }
};

ElementTraversal.prototype.inE = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().inE(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().inE(edgeLabels);
  }
};

ElementTraversal.prototype.bothE = function(branchFactor, edgeLabels) {
  if (_.isNumber(branchFactor)) {
    return this.start().bothE(branchFactor, edgeLabels);
  } else {
    edgeLabels = branchFactor;
    return this.start().bothE(edgeLabels);
  }
};

ElementTraversal.prototype.toV = function(direction) {
  return this.start().toV(direction);
};

ElementTraversal.prototype.inV = function() {
  return this.start().inV();
};

ElementTraversal.prototype.outV = function() {
  return this.start().outV();
};

ElementTraversal.prototype.bothV = function() {
  return this.start().bothV();
};

ElementTraversal.prototype.otherV = function() {
  return this.start().otherV();
};

ElementTraversal.prototype.order = function(comparator) {
  return this.start().order(comparator);
};

ElementTraversal.prototype.orderBy = function(key, comparator) {
  return this.start().orderBy(key, comparator);
};

ElementTraversal.prototype.shuffle = function() {
  return this.start().shuffle();
};

ElementTraversal.prototype.properties = function(propertyKeys) {
  return this.start().properties(propertyKeys);
};

ElementTraversal.prototype.hiddens = function(propertyKeys) {
  return this.start().properties(propertyKeys);
};

ElementTraversal.prototype.hiddenValue = function(propertyKey, defaultValueOrSupplier) {
  return this.start().hiddenValue(propertyKey, defaultValueOrSupplier);
};

ElementTraversal.prototype.value = function(propertyKey, defaultSupplier) {
  return this.start().value(propertyKey, defaultSupplier);
};

ElementTraversal.prototype.values = function(propertyKeys) {
  return this.start().values(propertyKeys);
};

ElementTraversal.prototype.path = function(pathFunctions) {
  var start = this.start();
  return start.path.apply(start, pathFunctions);
};

ElementTraversal.prototype.back = function(stepLabel) {
  return this.start().back(stepLabel);
};

ElementTraversal.prototype.match = function(startLabel, traversals) { // ...traversals
  traversals = _.rest(arguments); // skip first

  var start = this.start();
  return start.match.apply(start, [startLabel].concat(traversals));
};

ElementTraversal.prototype.select = function(labels, stepFunctions) { // ...stepFunctions
  var start = this.start();
  stepFunctions = _.rest(arguments);

  if (_.isFunction(labels)) {
    return start.select().apply(start, arguments);
  }

  if (_.isArray(labels)) {
    return start.select().apply(start, [labels].concat(stepFunctions));
  } else {
    if (!stepFunctions) {
      return start.select(label, null);
    } else {
      return start.select.apply(start, [labels].concat(stepFunctions));
    }
  }
};


//TODO: implement more steps








module.exports = ElementTraversal;