require('es6-shim');
var lazy = require('lazy.js');
var _ = require('underscore');


function Path() {
  this.labels = [];
  this.objects = [];
}

Path.prototype.size = function() {
  return new Error('Must be overloaded');
};

Path.prototype.extend = function(labels, object) {
  return new Error('Must be overloaded');
};

Path.prototype.hasLabel = function(label) {
  return new Error('Must be overloaded');
};

Path.prototype.addLabel = function(label) {
  return new Error('Must be overloaded');
};

Path.prototype.getObjects = function() {
  return new Error('Must be overloaded');
};

Path.prototype.getLabels = function() {
  return new Error('Must be overloaded');
};

Path.prototype.isSimple = function() {
  return new Error('Must be overloaded');
};

Path.prototype.clone = function() {
  return new Error('Must be overloaded');
};

Path.prototype.isSimple = function() {
  var objects = this.getObjects();

  for (var i = 0; i < objects.length; i++) {
    for (var j = i + 1; j < objects.length; j++) {
      if (objects[i].equals(objects[j])) {
        return false;
      }
    }
  }
  return true;
};

Path.prototype.forEach = function(consumer) {
  //todo: add logic for Java BiConsumer
  return this.getObjects().forEach(consumer);
};

Path.prototype.stream = function() {
  var labels = this.getLabels();
  var objects = this.getObjects();

  return lazy.range(0, this.size()).map(function(i) {
    // todo: verify
    return [labels[i], objects[i]];
  });
};


module.exports = Path;