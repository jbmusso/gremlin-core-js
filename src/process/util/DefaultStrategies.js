var inherits = require('util').inherits;

var _ = require('lazy.js');

var Traversal = require('../traversal');


function DefaultStrategies(traversal) {
  this.traversalStrategies = [];
  this.complete = false;
  this.traversal = traversal;
}

inherits(DefaultStrategies, Traversal.Strategies);

DefaultStrategies.prototype.register = function(traversalStrategy) {
  this.traversalStrategies.push(traversalStrategy);
   // TODO: make this a LinkedHashSet so repeats are not allowed? Or check for repeats first?
};

// TODO: BUGGEd!!!
DefaultStrategies.prototype.unregister = function(optimizerClass) {
  _(this.traversalStrategies)
    .filter(function(c) {
      return optimizerClass.isAssignableFrom(c.getClass());
    })
    .toArray()
    .each(function() {
      //todo: remove from traversalStrategies
    });
};

DefaultStrategies.prototype.applyAll = function() {
  if (!this.complete) {
    var self = this;
    this.complete = true;
    this.traversalStrategies = this.traversalStrategies.sort(); //todo: debug and improve with https://github.com/tinkerpop/tinkerpop3/blob/master/gremlin-core/src/main/java/com/tinkerpop/gremlin/process/TraversalStrategy.java#L23
    this.traversalStrategies.forEach(function(traversalStrategy) {
      traversalStrategy.apply(self.traversal);
    });
  }
};

DefaultStrategies.prototype.clear = function() {
  this.traversalStrategies.length = 0; //.clear()
};


module.exports = DefaultStrategies;