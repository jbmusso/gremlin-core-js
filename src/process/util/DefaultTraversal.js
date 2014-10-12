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

// DefaultTraversal.prototype.hasNext = function() {
//   console.log('==DefaultTraversal.hasNext()==');

//   // this.applyStrategies(); //todo: ok, but uncomment

//   var endStep = TraversalHelper.getEnd(this);

//   console.log('------------------', endStep.constructor.name);
//   var next = endStep.next();
//   var hasNext = this.lastEndCount > 0 || endStep.hasNext();

//   console.log('---(((((((((', hasNext);

//   return hasNext;
// };

DefaultTraversal.prototype.next = function() {
  this.applyStrategies();

  if (this.lastEndCount > 0) {
    this.lastEndCount--;
    return this.lastEnd;
  } else {

    var nextTraverser = TraversalHelper.getEnd(this).next().value;
    // console.log(lastStep);
    // var nextValue = lastStep.next();
    if (nextTraverser.getBulk() === 1) {
      var ret = nextTraverser.get();
      return ret;
    } else {
      this.lastEndCount = nextTraverser.getBulk() - 1;
      this.lastEnd = next.get();
      return this.lastEnd;
    }

  }

  // console.log(nextTraverser);
  // var next = {
  //   value: nextValue,
  //   done: !nextValue
  // };

  // return next;
};

//...

DefaultTraversal.prototype.applyStrategies = function() {
  if (!this.strategies.complete) {
    this.strategies.applyAll();
  }
};

DefaultTraversal.prototype.clone = function() {
  throw new Error('Not Yet Implemented');
  // https://github.com/tinkerpop/tinkerpop3/blob/master/gremlin-core/src/main/java/com/tinkerpop/gremlin/process/util/DefaultTraversal.java#L80
};

module.exports = DefaultTraversal;