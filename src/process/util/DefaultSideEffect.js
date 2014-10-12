var inherits = require('util').inherits;

var _ = require('lazy.js');

var Traversal = require('../Traversal');


function DefaultSideEffects(localVertex) {
  this.sideEffectMap = {};

  if (localVertex) {
    this.setLocalVertex(localVertex);
  }
}

inherits(DefaultSideEffects, Traversal.SideEffects);

DefaultSideEffects.prototype.exists = function(key) {
  return !!this.sideEffectMap[key];
};

DefaultSideEffects.prototype.set = function(key, value) {
  // todo: validate key, value
  this.sideEffectMap[key] = value;
};

DefaultSideEffects.prototype.get = function(key) {
  var value = this.sideEffectMap[key];

  if (!value) {
    throw new Error('SideEffectDoesNotExist' + key);
  }

  return value;
};

DefaultSideEffects.prototype.remove = function(key) {
  delete this.sideEffectMap[key];
};

DefaultSideEffects.prototype.keys = function() {
  return _(this.sideEffectMap).keys();
};

DefaultSideEffects.prototype.setLocalVertex = function(vertex) {
  var property = vertex.property('gremlin.traversalVertexProgram.sideEffects'); //todo: use enum
  if (property.isPresent()) {
    this.sideEffectMap = property.value();
  } else {
    this.sideEffectMap = {};
    vertex.property('gremlin.traversalVertexProgram.sideEffects', this.sideEffectMap);
  }
};

module.exports = DefaultSideEffects;