var inherits = require('util').inherits;

var _ = require('lodash');

var Property = require('./Property');
var Element = require('./Element');
var VertexPropertyTraversal = require('../process/graph/VertexPropertyTraversal');

var EmptyVertexProperty = require('./util/EmptyVertexProperty');

function VertexProperty() {
}

_.extend(VertexProperty.prototype, Property.prototype, Element.prototype, VertexPropertyTraversal.prototype);

VertexProperty.DEFAULT_LABEL = 'vertexProperty';

VertexProperty.prototype.getElement = function() {
};

VertexProperty.prototype.label = function() {
  return this.key();
};

VertexProperty.empty = function() {
  return EmptyVertexProperty.instance();
};


// ITERATORS

VertexProperty.prototype.iterators = function() {
};

VertexProperty.Iterators = function() {};

inherits(VertexProperty.Iterators, Element.Iterators);

VertexProperty.Iterators.prototype = {
  properties: function(propertyKeys) {

  },

  hiddens: function(propertyKeys) {

  }
};

module.exports = VertexProperty;
