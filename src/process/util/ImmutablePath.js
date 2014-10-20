var inherits = require('util').inherits;

var _ = require('lodash');
require('es6-shim');

var Path = require('../Path');
var EmptyPath = require('./EmptyPath');

function ImmutablePath(previousPath, currentLabels, currentObject) {
  // this.previousPath = EmptyPath.instance();
  this.currentLabels = new Set();
  // this.currentObject = null;

  //
  if (arguments.length === 2) {
    currentObject = currentLabels;
    currentLabels = previousPath;
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



module.exports = ImmutablePath;