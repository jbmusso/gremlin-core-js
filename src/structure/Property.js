function Property() { // interface

}

Property.prototype.getKey = function() {
  throw new Error('Not yet implemented');
};

Property.prototype.getValue = function() {
  throw new Error('Not yet implemented');
};

Property.prototype.isPresent = function() {
  throw new Error('Not yet implemented');
};

Property.prototype.ifPresent = function(consumer) {
  if (this.isPresent()) {
    consumer.accept(this.value()); // TODO or consumer(this.value()); instead?
  }
};

Property.prototype.orElse = function(otherValue) {
  return this.isPresent() ? this.value() : otherValue;
};

Property.prototype.orElseGet = function(valueSupplier) {
  return this.isPresent() ? this.value() : valueSupplier.get();
};

Property.prototype.orElseThrow = function(exceptionSupplier) {
  if (this.isPresent()) {
    return this.value();
  } else {
    throw exceptionSupplier.get();
  }
};

Property.prototype.isHidden = function() {
  throw new Error('Not yet implemented');
};

Property.prototype.getElement = function() {
  throw new Error('Not yet implemented');
};

Property.prototype.remove = function() {
  throw new Error('Not yet implemented');
};

Property.empty = function() {
  var EmptyProperty = require('./util/EmptyProperty'); //todo: improve circle reference

  return EmptyProperty.instance();
};

module.exports = Property;