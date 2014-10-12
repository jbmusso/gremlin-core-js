function TraversalStrategy() {
}

TraversalStrategy.prototype.apply = function() {
  throw new Error('Not yet implemented');
};

TraversalStrategy.instance = function() {
  var instance = null;

  return instance ? instance : instance = new this();
};

module.exports = TraversalStrategy;