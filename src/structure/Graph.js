var _ = require('lazy.js');

var Vertex = require('./Vertex');
var Edge = require('./Edge');


function Graph() {
  this.vertices = [];
  this.edges = [];

  this.verticesId = 0;
  this.edgesId = 0;
}

Graph.prototype.addVertex = function(properties) {
  var id = this.verticesId++;
  var vertex = new Vertex(id, this);

  vertex.setProperties(properties);
  this.vertices.push(vertex);

  return vertex;
};

Graph.prototype.addEdge = function(v1, v2, label, properties) {
  var id = this.edgesId++;
  var edge = new Edge(id, this);

  edge.setProperties(properties);
  this.edges.push(edge);

  return edge;
};

Graph.prototype.V = function() {
  throw new Error('Must be overloaded');
};

Graph.System = function() {};

Graph.System.SYSTEM_PREFIX = "%&%";

Graph.System.SYSTEM_PREFIX_LENGTH = (function() {
  return this.SYSTEM_PREFIX.length;
}.call(Graph.System));

Graph.System.system = function(key) {
  return this.isSystem(key) ? key : this.SYSTEM_PREFIX.concat(key);
};

Graph.System.unSystem = function(key) {
  return this.isSystem(key) ? key.substr(0, this.SYSTEM_PREFIX_LENGTH) : key;
};

Graph.System.isSystem = function(key) {
  return _(key).startsWith(this.SYSTEM_PREFIX);
};


module.exports = Graph;
