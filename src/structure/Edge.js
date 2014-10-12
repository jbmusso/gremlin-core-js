var inherits = require('util').inherits;

var Element = require('./element');


function Edge(id, graph) {
  Element.apply(this, arguments);
}

inherits(Edge, Element);


Edge.Iterators = function() {

};

inherits(Edge.Iterators, Element.Iterators);

Edge.Iterators.prototype = {
  vertices: function(direction) {
    throw new Error('Not yet implemented');
  },

  properties: function(propertyKeys) { //...propertyKeys
    throw new Error('Not yet implemented');
  },

  hiddens: function(propertyKeys) {
    throw new Error('Not yet implemented'); //...propertyKeys
  },

  values: function(propertyKeys) { //...propertyKeys
    return Element.Iterators.prototype.values.apply(this, arguments);
  }


};


module.exports = Edge;