var inherits = require('util').inherits;

var _ = require('lodash');

var Path = require('../Path');
var TraversalHelper = require('./TraversalHelper');


function EmptyPath() { // todo: implements Path, Serializable
}

inherits(EmptyPath, Path);

EmptyPath.prototype.size = function() {
  return 0;
};

EmptyPath.prototype.extend = function(labels, object) {
  // labels is either a String (label) or a Set (labels)
  return new ImmutablePath(labels, object);
};

EmptyPath.prototype.get = function(labelOrIndex) {
  var label, index;

  if (_.isString(labelOrIndex)) {
    label = labelOrIndex;
    throw new Error('Path.Exceptions.stepWithProvidedLabelDoesNotExist('+ label);
  } else { // is Number (int)
    index = labelOrIndex;
    var arr = [];
    return arr[index]; // will throw
  }
};

EmptyPath.prototype.hasLabel = function(label) {
  return false;
};

EmptyPath.prototype.addLabel = function(label) {
  return new Error('IllegalStateException("Empty path can not have labels added to it")');
};

EmptyPath.prototype.getObjects = function() {
  return [];
};

EmptyPath.prototype.getLabels = function() {
  return [];
};

EmptyPath.prototype.isSimple = function() {
  return true;
};

EmptyPath.prototype.clone = function() {
  return this;
};

EmptyPath.instance = function() {
  var instance = null;

  return instance ? instance : instance = new EmptyPath();
};

EmptyPath.prototype.hashCode = function() {
  return -1424379551;
};

EmptyPath.prototype.equals = function(object) {
  return object instanceof EmptyPath;
};

module.exports = EmptyPath;