var _ = require('underscore');

var Traverser = require('./Traverser');

function SimpleTraverser(t, sideEffects) { // class, impl. Traverser & Traverser.Admin
  this.loops = 0;

  this.t = t;
  this.sideEffects = sideEffects;
  this.bulk = 1;
}

_.extend(SimpleTraverser.prototype, Traverser.prototype, Traverser.Admin.prototype);

SimpleTraverser.prototype.hasPath = function() {
  return false;
};

SimpleTraverser.prototype.get = function() {
  return this.t;
};

SimpleTraverser.prototype.getSideEffects = function() {
  return this.sideEffects;
};

SimpleTraverser.prototype.set = function(t) {
  this.t = t;
};

SimpleTraverser.prototype.getFuture = function() {
  return this.future;
};

SimpleTraverser.prototype.setFuture = function(label) {
  this.future = label;
};

SimpleTraverser.prototype.getPath = function() {
  throw new Error('IllegalStateException(PATH_ERROR_MESSAGE)');
};

SimpleTraverser.prototype.setPath = function(path) {
  throw new Error('IllegalStateException(PATH_ERROR_MESSAGE)');
};

SimpleTraverser.prototype.getLoops = function() {
  return this.loops;
};

SimpleTraverser.prototype.incrLoops = function() {
  this.loops++;
};

SimpleTraverser.prototype.resetloops = function() {
  this.loops = 0;
};

SimpleTraverser.prototype.setBulk = function(count) {
  this.bulk = count;
};

SimpleTraverser.prototype.getBulk = function() {
  return this.bulk;
};

SimpleTraverser.prototype.makeChild = function(label, r) {
  if (!r) {
    throw new Error('makeChild must have a reference to an element');
  }

  var traverser = new SimpleTraverser(r, this.sideEffects);
  traverser.future = this.future;
  traverser.loops = this.loops;
  traverser.bulk = this.bulk;

  return traverser;
};

SimpleTraverser.prototype.makeSibling = function() {
  var traverser = new SimpleTraverser(this.t, this.sideEffects);
  traverser.future = this.future;
  traverser.loops = this.loops;
  traverser.bulk = this.bulk;

  return traverser;
};

SimpleTraverser.prototype.setSideEffects = function(sideEffects) {
  this.sideEffects = sideEffects;
};

SimpleTraverser.prototype.toString = function() {
  return t.toString();
};

SimpleTraverser.prototype.hashCode = function() {
  throw new Error('Must be implemented in SimpleTraverser');
};

SimpleTraverser.prototype.equals = function(object) {
  var equality = object.get() === this.t && object.getFuture() === this.getFuture() && object.getLoops() === this.getLoops();

  return equality;
};

SimpleTraverser.prototype.deflate = function() {
  throw new Error('Must be implemented in SimpleTraverser');
};

SimpleTraverser.prototype.inflate = function(vertex, traversal) {
  throw new Error('Must be implemented in SimpleTraverser');
};


module.exports = SimpleTraverser;