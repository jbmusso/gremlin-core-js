require('es6-shim');
var lazy = require('lazy.js');
var _ = require('underscore');


function Path() {
  this.labels = [];
  this.objects = [];
}

Path.prototype.size = function() {
  return this.objects.length;
};

Path.prototype.add = function(label, object) {
  var labels;

  switch (label.constructor.name) {
    case 'String':
      labels = new Set();
      if (TraversalHelper.isLabeled(label)) {
        labels.add(label);
      }
      this.labels.push(labels);
      this.objects.push(object);
      break;
    case 'Path':
      this.labels.concat(path.labels);
      this.objects.concat(path.objects);
      break;
    case 'Set':
      //todo: refactor next 2 lines
      set = new Set();
      labels = lazy(Array.from(labels.values())).filter(TraversalHelper.isLabeled).forEach(set.add);

      this.labels.push(set);
      this.objects.push(object);
      break;
  }
};

Path.prototype.get = function(labelOrIndex) {
  var label;
  var index;

  if (_.isString(labelOrIndex)) {
    label = labelOrIndex;
    for (var i = 0; i < this.labels.length; i++) {
      if (this.labels[i].has(label)) {
          return this.objects[i];
      }
    }
    throw new Error('IllegalArgumentException("The step with label " + label + "  does not exist")');

  } else { // is int
    index = labelOrIndex;
    return this.objects[index];
  }
};

Path.prototype.hasLabel = function(label) {
  var labels;
  for (var i = 0; i < this.labels.length; i++) {
    labels = this.labels[i];
    if (labels.has(label)) {
      return true;
    }
  }

  return false;
};

Path.prototype.addLabel = function(label) {
  if (TraversalHelper.isLabeled(label)) {
    this.labels[this.labels.length - 1].add(label);
  }
};

Path.prototype.getObjects = function() {
  return this.objects;
};

Path.prototype.getLabels = function() {
  var labelSets = [];
  this.labels.forEach(function(set) {
    labelSets.push(set);
  });

  return labelSets;
};

Path.prototype.isSimple = function(first_argument) {
  // body...
};

module.exports = Path;