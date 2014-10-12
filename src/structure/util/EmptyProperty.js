var inherits = require('util').inherits;

var Property = require('../property');


function EmptyProperty() {
}

inherits(EmptyProperty, Property); // implements

EmptyProperty.prototype.getKey = function() {
  throw new Error('Exceptions.propertyDoesNotExist()');
};

EmptyProperty.prototype.getValue = function() {
  throw new Error('Exceptions.propertyDoesNotExist()');
};

EmptyProperty.prototype.isPresent = function() {
  return false;
};

EmptyProperty.prototype.isHidden = function() {
  throw new Error('Exceptions.propertyDoesNotExist()');
};

EmptyProperty.prototype.getElement = function() {
  throw new Error('Exceptions.propertyDoesNotExist()');
};

EmptyProperty.prototype.remove = function() {
};

EmptyProperty.instance = function() {
  var instance;

  return instance ? instance : new EmptyProperty();
};

module.exports = EmptyProperty;