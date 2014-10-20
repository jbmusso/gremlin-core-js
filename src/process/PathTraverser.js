var inherits = require('util').inherits;

var _ = require('lodash');

var SimpleTraverser = require('./SimpleTraverser');
var ImmutablePath = require('./util/ImmutablePath');


function PathTraverser(label, t, sideEffects) {
  this.path = null;

  if (arguments.length === 0) {
    SimpleTraverser.call(this);

  } else if (_.isString(label)) {
    SimpleTraverser.call(this, t, sideEffects);
    this.path = new ImmutablePath(new Set(), t);
  } else {
    sideEffects = t;
    t = label;

    SimpleTraverser.call(this, t, sideEffects);
    this.path = new ImmutablePath(label, t);
  }
}

inherits(PathTraverser, SimpleTraverser);

PathTraverser.prototype.getSideEffects = function() {
  if (this.sideEffects && !(this.sideEffects instanceof PathAwareSideEffects)) { // todo: add duck typing
    this.sideEffects = new PathAwareSideEffects(this.path, this.sideEffects);
  }

  return this.sideEffects;
};

PathTraverser.prototype.hasPath = function() {
  return true;
};

PathTraverser.prototype.getPath = function() {
  return this.path;
};

PathTraverser.prototype.setPath = function(path) {
  this.path = path;
};

PathTraverser.prototype.makeChild = function(label, r) {
  var traverser = new PathTraverser();
  traverser.t = this.t;
  traverser.sideEffects = this.sideEffects;
  traverser.loops = this.loops;
  traverser.path = this.path.clone(); //bugged method?
  traverser.future = this.future;
  traverser.bulk = this.bulk;

  return traverser;
};

PathTraverser.prototype.deflate = function() {
  SimpleTraverser.prototype.deflate.call(this);
  this.path = ReferencedFactory.detach(this.path.clone());

  return this;
};

PathTraverser.prototype.hashCode = function() {
  throw new Error('Not yet implemented');
};

PathTraverser.prototype.equals = function(object) {
  throw new Error('Not yet implemented');
};

module.exports = PathTraverser;