var inherits = require('util').inherits;
require('es6-shim'); // Map
/*jshint -W079 */
var Set = require('collections/set');


function TraverserSet() {
  Set.call(this);
  this.map = new Map();
}

inherits(TraverserSet, Set);

TraverserSet.prototype.iterator = function() {
  return this.map.keys();
};

TraverserSet.prototype.size = function() {
  return this.map.size;
};

TraverserSet.prototype.isEmpty = function() {
  return this.map.size === 0;
};

TraverserSet.prototype.contains = function(traverser) {
  return this.map.has(traverser);
};

TraverserSet.prototype.add = function(traverser) {
  var existing = this.map.get(traverser);

  if (!existing) {
    this.map.set(traverser, traverser);
    return true;
  } else {
    existing.setBulk(existing.getBulk() + traverser.getBulk());
    return false;
  }
};

TraverserSet.prototype.offer = function(traverser) {
  return this.add(traverser);
};

/**
 * @returns {Traverser|Boolean}
 */
TraverserSet.prototype.remove = function(traverser) {
  if (traverser) {
    return this.map.delete(traverser); // returns true if removed
  } else {
    var nextValue = this.iterator().next().value;
    this.map.delete(nextValue);

    return nextValue;
  }
};

TraverserSet.prototype.poll = function() {
  return this.map.size === 0 ? null : this.remove();
};

TraverserSet.prototype.element = function() {
  return this.iterator.next();
};

TraverserSet.prototype.peek = function() {
  return this.isEmpty() ? null : this.iterator.next();
};

TraverserSet.prototype.clear = function() {
  return this.map.clear();
};

TraverserSet.prototype.spliterator = function() {
  return this.map.keys();
};

module.exports = TraverserSet;