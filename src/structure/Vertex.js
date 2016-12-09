/*jshint -W079 */
var inherits = require('util').inherits;
var _ = require('underscore');

var Element = require('./Element');
var GraphKey = require('./graph.key');
var VertexTraversal = require('../process/graph/VertexTraversal');
var ElementHelper = require('./util/ElementHelper');

function Vertex() {
}

inherits(Vertex, Element);
_.extend(Vertex.prototype, VertexTraversal.prototype, Element.prototype);

Vertex.DEFAULT_LABEL = "vertex";

Vertex.prototype.addEdge = function(label, inVertex, keyValues) {
  throw new Error('Must be implemented');
};

Vertex.prototype.property = function(key, value, keyValues) {
  // todo: add setProperty / getProperty methods ?

  if (!value && !keyValues) { // todo: improve check
    if (GraphKey.isHidden(key)) {
      iterator = this.iterators().hiddens(Graph.Key.unHide(key));
    } else {
      iterator = this.iterators().properties(key);
    }

    if (iterator.hasNext()) {
      property = iterator.next();

      if (iterator.hasNext()) {
        throw new Error('Vertex.Exceptions.multiplePropertiesExistForProvidedKey(key)'+ key);
      } else {
        return property;
      }
    } else {
      return VertexProperty.empty();
    }
  } else {
    if (keyValues) {
      // ElementHelper.legalPropertyKeyValueArray(keyValues); //todo: uncomment
      var vertexProperty = this.property(key, value);
      ElementHelper.attachProperties(vertexProperty, keyValues);
      return vertexProperty;
    } else {
      throw new Error('JS: Not yet implemented');
    }
  }
};

Vertex.prototype.singleProperty = function(key, value, keyValues) {
  if (Graph.Key.isHidden(key))
      this.iterators().hiddens(Graph.Key.unHide(key)).forEachRemaining(VertexProperty.remove); //todo: add VertexProperty class
  else
      this.iterators().properties(key).forEachRemaining(VertexProperty.remove);
  return this.property(key, value, keyValues);
};

Vertex.prototype.iterators = function() {
};

Vertex.Iterators = function Iterators(argument) {
};

inherits(Vertex.Iterators, Element.Iterators);

Vertex.Iterators.prototype = {
  edges: function(direction, branchFactor, labels) {
    throw new Error('Not yet implemented');
  },

  vertices: function(direction, branchFactor, labels) {
    throw new Error('Not yet implemented');
  },

  properties: function(propertyKeys) {
    throw new Error('Not yet implemented');
  },

  hiddens: function(propertyKeys) {
    throw new Error('Not yet implemented');
  },
};


module.exports = Vertex;
