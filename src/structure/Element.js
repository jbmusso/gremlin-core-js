var Property = require('./Property');
var GraphKey = require('./graph.key');

var StreamFactory = require('../util/streamfactory');

function Element() { // abstract interface
}

Element.prototype.id = function() {
  throw new Error('Not Yet Implemented');
};

Element.prototype.label = function() {
  throw new Error('Not yet implemented');
};

Element.prototype.keys = function() {
  var keys = [];

  this.getIterators().properties().forEachRemaining(function(property) {
    return keys.push(property.key());
  });

  return keys;
};

Element.prototype.hiddenKeys = function() {
  var hiddenKeys = [];

  this.getIterators().hiddens().forEachRemaining(function(property) {
    return hiddenKeys.push(property.key());
  });

  return hiddenKeys;
};

Element.prototype.property = function(key, value) {
  if (!value) {
    var iterator = GraphKey.isHidden(key) ? this.getIterators().hiddens(GraphKey.unHide(key)) : this.getIterators().properties(key);

    return iterator.hasNext() ? iterator.next() : Property.empty();
  } else {
    throw new Error('Not yet implemented');
  }
};

Element.prototype.value = function(key, orElse) {
  var property = this.property(key);

  if (!orElse) {
    return property.orElseThrow(function() {
      Error('Property.Exceptions.propertyDoesNotExist()'+ key);
    });
  } else {
    return property.orElse(orElse);
  }
};

Element.prototype.remove = function() {
  throw new Error('Not yet implemented');
};

Element.prototype.getIterators = function() {
  throw new Error('Not yet implemented');
};

Element.Iterators = function() {
};

Element.Iterators.prototype = {
  values: function(propertyKeys) { //...propertyKeys
    // TODO: use Node.js streams
    var stream = StreamFactory.stream(this.properties.apply(this, arguments)).map( function(property) {
      return property.value();
    }).iterator();

    return stream;
  },

  hiddensValues: function(propertyKeys) {  //...propertyKeys
    // TODO: use Node.js streams
    var stream = StreamFactory.stream(this.hidden.apply(this, arguments)).map( function(property) {
      return property.value();
    }).iterator();

    return stream;
  },

  properties: function() {
    throw new Error('Not yet implemented');
  },

  hiddens: function() {
    throw new Error('Not yet implemented');
  }
};


module.exports = Element;
