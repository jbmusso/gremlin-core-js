var inherits = require('util').inherits;

var _ = require('lodash');
require('es6-shim');

var TraversalHelper = require('./TraversalHelper');
var Path = require('../Path');
var EmptyPath = require('./EmptyPath');

function ImmutablePath(previousPath, currentLabels, currentObject) {
  // this.previousPath = EmptyPath.instance();
  this.currentLabels = new Set();
  // this.currentObject = null;

  //
  if (arguments.length === 2) {
    currentObject = currentLabels;
    currentLabels = previousPath; // is either a String or a Set
    previousPath = EmptyPath.instance();
  }

  if (_.isString(currentLabels)) {
    this.currentLabels.add(currentLabels);
  } else {
    var self = this;
    currentLabels.forEach(function(label) {
      self.currentLabels.add(label);
    });
  }

  this.previousPath = previousPath;
  this.currentObject = currentObject;
}

inherits(ImmutablePath, Path); // implements

ImmutablePath.make = function() {
  return EmptyPath.instance();
};

ImmutablePath.prototype.clone = function() {
  return this;
};

ImmutablePath.prototype.size = function() {
  return this.previousPath.size() + 1;
};

ImmutablePath.prototype.extend = function(labels, object) {
  // labels is either a String (label) or a Set (labels)
  // The constructor handles the difference
  return new ImmutablePath(this, labels, object);
};

ImmutablePath.prototype.get = function(labelOrIndex) {
  var label, index; // creating variables for clarity

  if (_.isString(labelOrIndex)) {
    label = labelOrIndex;
    return this.currentLabels.has(label) ? this.currentObject : this.previousPath.get(label);
  } else {
    index = labelOrIndex;
    return (this.size() - 1 ) === index ? this.currentObject : this.previousPath.get(index);
  }
};

ImmutablePath.prototype.hasLabel = function(label) {
  return this.currentLabels.has(label) || this.previousPath.hasLabel(label);
};

ImmutablePath.prototype.addLabel = function(label) {
  if (TraversalHelper.isLabeled(label)) {
    this.currentLabels.add(label);
  }
};

ImmutablePath.prototype.getObjects = function() {
  var objectPath = [];
  objectPath.concat(this.previousPath.getObjects());
  objectPath.push(this.currentObject);
  return objectPath;
};

ImmutablePath.prototype.getLabels = function() {
  var labelPath = []; // Array of Set of strings
  var previousPathLabels = this.previousPath.getLabels();
  labelPath.concat(previousPathLabels);
  labelPath.add(this.currentLabels);

  return labelPath;
};

ImmutablePath.prototype.toString = function() {
  return this.getObjects().toString();

};

module.exports = ImmutablePath;