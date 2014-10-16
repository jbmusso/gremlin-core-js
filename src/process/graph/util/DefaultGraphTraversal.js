var inherits = require('util').inherits;

var _ = require('lodash');

var DefaultTraversal = require('../../util/defaulttraversal');
var GraphTraversal = require('../graphtraversal');


function DefaultGraphTraversal(graph) {
  DefaultTraversal.apply(this);
  // this.getStrategies().register(UntilStrategy.instance());
  // this.getStrategies().register(DedupOptimizerStrategy.instance());
  // this.getStrategies().register(IdentityReductionStrategy.instance());
  // this.getStrategies().register(SideEffectCapStrategy.instance());
  // this.getStrategies().register(UnrollJumpStrategy.instance());
  // this.getStrategies().register(MatchWhereStrategy.instance());

  if (graph) {
    this.getSideEffects().setGraph(graph);
  }
}

inherits(DefaultGraphTraversal, DefaultTraversal); // extends
_.extend(DefaultGraphTraversal.prototype, GraphTraversal.prototype); // impl.


module.exports = DefaultGraphTraversal;