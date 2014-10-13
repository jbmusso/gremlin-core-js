var inherits = require('util').inherits;

var Traversal = require('../traversal');
var TraversalHelper = require('./traversalhelper');
var DefaultStrategies = require('./defaultstrategies');
var DefaultSideEffects = require('./defaultsideeffect');

var TraverserSourceStrategy = require('../graph/strategy/TraverserSourceStrategy');
var LabeledEndStepStrategy = require('../graph/strategy/LabeledEndStepStrategy');
var GraphStandardStrategy = require('../graph/strategy/GraphStandardStrategy');


function DefaultTraversal(graph) {
  this.lastEnd = null;
  this.lastEndCount = 0;

  if (graph) {
    this.getSideEffects().setGraph(graph);
  }

  this.steps = []; // new ArrayList()
  this.strategies = new DefaultStrategies(this);
  this.sideEffects = new DefaultSideEffects();

  this.getStrategies().register(TraverserSourceStrategy.instance());
  this.getStrategies().register(LabeledEndStepStrategy.instance());
  this.getStrategies().register(GraphStandardStrategy.instance());
}

inherits(DefaultTraversal, Traversal);

DefaultTraversal.prototype.getSteps = function() {
  return this.steps;
};

DefaultTraversal.prototype.getSideEffects = function() {
  return this.sideEffects;
};

DefaultTraversal.prototype.getStrategies = function() { // strategies()
  return this.strategies;
};

DefaultTraversal.prototype.addStarts = function(starts) {
  console.log('==DefaultTraversal.addStarts==', starts);
  TraversalHelper.getStart(this).addStarts(starts);
};

DefaultTraversal.prototype.next = function() {
  console.log('==@@ DefaultTraversal.next() @@==');
  var lastEnd;
  var endStep;
  var next;
  var traverser;
  var element;

  this.applyStrategies();

  console.log('  - begin fetching next traversal data');
  if (this.lastEndCount > 0) {
    this.lastEndCount--;
    lastEnd = this.lastEnd;

    return lastEnd;
  } else {
    console.log('     - Grabbing last (end) step');
    endStep = TraversalHelper.getEnd(this);
    console.log('     - Done: ', endStep.constructor.name, 'end step');

    console.log('     - Grabbing next traverser for Step');
    next = endStep.next();

    console.log('     - Done: grabbed something');
    // console.log(next);

    if (next.done) {
      // Reached end of iteration, exit
      return { value: undefined, done: true };
    }

    // Otherwise, handle retrieved value
    traverser = next.value;

    // console.log(traverser.get());

    if (traverser.getBulk() === 1) {
      element = traverser.get();

      return { value: element, done: false };
    } else {
      this.lastEndCount = traverser.getBulk() - 1;
      this.lastEnd = next.get();
      lastEnd = this.lastEnd;

      return { value: lastEnd, done: false };
    }
  }
};

//...

DefaultTraversal.prototype.applyStrategies = function() {
  console.log('  - applying strategies');
  if (!this.strategies.complete) {
    this.strategies.applyAll();
  }
  console.log('  - done applying strategies');
};

DefaultTraversal.prototype.clone = function() {
  throw new Error('Not Yet Implemented');
  // https://github.com/tinkerpop/tinkerpop3/blob/master/gremlin-core/src/main/java/com/tinkerpop/gremlin/process/util/DefaultTraversal.java#L80
};

module.exports = DefaultTraversal;