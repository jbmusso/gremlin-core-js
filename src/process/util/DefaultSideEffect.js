var inherits = require('util').inherits;

require('es6-shim');
var _ = require('lazy.js');

var Traversal = require('../Traversal');


function DefaultSideEffects(localVertex) {
  this.sideEffectMap = new Map();

  if (localVertex) {
    this.setLocalVertex(localVertex);
  }
}

inherits(DefaultSideEffects, Traversal.SideEffects);

DefaultSideEffects.prototype.exists = function(key) {
  var exists = this.sideEffectMap.has(key);

  return exists;
};

DefaultSideEffects.prototype.set = function(key, value) {
  this.sideEffectMap.set(key, value);
};

DefaultSideEffects.prototype.get = function(key) {
  var value = this.sideEffectMap.get(key);

  if (!value) {
    throw new Error('SideEffectDoesNotExist' + key);
  }

  return value;
};

DefaultSideEffects.prototype.remove = function(key) {
  this.sideEffectMap.delete(key);
};

DefaultSideEffects.prototype.keys = function() {
  return this.sideEffectMap.keys();
};

DefaultSideEffects.prototype.setLocalVertex = function(vertex) {
  var property = vertex.property('gremlin.traversalVertexProgram.sideEffects'); //todo: use enum
  if (property.isPresent()) {
    this.sideEffectMap = property.value();
  } else {
    this.sideEffectMap = new Map();
    vertex.property('gremlin.traversalVertexProgram.sideEffects', this.sideEffectMap);
  }
};

module.exports = DefaultSideEffects;