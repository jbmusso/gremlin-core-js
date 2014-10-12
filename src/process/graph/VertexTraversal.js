var inherits = require('util').inherits;

var ElementTraversal = require('./elementtraversal');

function VertexTraversal() { // abstract interface
}

inherits(VertexTraversal, ElementTraversal); //todo: check for inheritance

VertexTraversal.prototype.hasNext = function(first_argument) {
  // body...
};


module.exports = VertexTraversal;