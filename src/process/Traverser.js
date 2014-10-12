var inherits = require('util').inherits;

function Traverser() { // interface, extends Serializable, Comparable
}

// Traverser.prototype.get = function() {
//   throw new Error('Not yet implemented');
// };

Traverser.prototype.getPath = function() {
  throw new Error('Not yet implemented');
};

Traverser.prototype.hasPath = function() {
  throw new Error('Not yet implemented');
};

Traverser.prototype.getLoops = function() {
  throw new Error('Not yet implemented');
};

Traverser.prototype.getBulk = function() {
  throw new Error('Not yet implemented');
};

Traverser.prototype.getSideEffects = function() {
  throw new Error('Not yet implemented');
};

Traverser.prototype.get = function(sideEffectKey) {
  return this.getSideEffects().get(sideEffectKey);
};

Traverser.prototype.compareTo = function(otherTraverser) {
  throw new Error('Not yet implemented');
};

Traverser.prototype.asAdmin = function() {
  return this; // todo: cast to admin before returning
};


Traverser.Admin = function() { // interface
  this.NO_FUTURE = "noFuture";
};

inherits(Traverser.Admin, Traverser);
//todo: implement more methods

Traverser.Admin.prototype = {
  getFuture: function() {
    throw new Error('Not yet implemented');
  },

  setFuture: function(label) {
  throw new Error('Not yet implemented');
  },

  setBulk: function(count) {
  throw new Error('Not yet implemented');
  },

  isDone: function() {
  return this.getFuture() === this.NO_FUTURE;
  },

  makeChild: function(label, r) {
  throw new Error('Not yet implemented');
  },

  makeSibling: function() {
  throw new Error('Not yet implemented');
  },

  deflate: function() {
  throw new Error('Not yet implemented');
  },

  inflate: function(hostVertex, traversal) {
  throw new Error('Not yet implemented');
  },

  setSideEffects: function() {
  throw new Error('Not yet implemented');
  },

};


module.exports = Traverser;
