var _ = require('lazy.js');
var Graph = {};

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

module.exports = Graph.System;