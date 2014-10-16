var inherits = require('util').inherits;

var forOf = require('es6-iterator/for-of');
var Graph = require('../structure/graph');
var GraphKey = require('../structure/graph.key');

var TraversalHelper = require('./util/traversalhelper');


function Traversal() {
}

Traversal.prototype.addStarts = function() {
  throw new Error("Must be overloaded");
};

Traversal.prototype.addStep = function(step) {
  TraversalHelper.insertStep(step, this.getSteps().length, this);
  return this;
};

Traversal.prototype.getSteps = function() {
  throw new Error("Must be overloaded");
};

Traversal.prototype.next = function(amount) {
  var result = [];
  var counter = 0;

  forOf(this, function(item, doBreak) {
    if (++counter < amount && !item.done) {
      return result.push(item.value);
    }

    return doBreak();
  });

  return result;
};

Traversal.prototype.forEach = function(consumer) {
  var cur;

  while (true) {
    cur = this.next();

    if (!cur.done) {
      consumer(cur.value);
    } else {
      break;
    }
  }
};

// STRATEGIES

Traversal.Strategies = function() { // interface
};

Traversal.Strategies.prototype = {
  register: function(traversalStrategy) {
    throw new Error('Not yet implemented');
  },

  unregister: function(optimizerClass) {
    throw new Error('Not yet implemented');
  },

  clear: function() {
    throw new Error('Not yet implemented');
  },

  apply: function() {
    throw new Error('Not yet implemented');
  },

  complete: function() {
    throw new Error('Not yet implemented');
  }
};

// SIDE EFFECTS

Traversal.SideEffects = function() {
  this.DISTRIBUTED_SIDE_EFFECTS_VERTEX_PROPERTY_KEY = "gremlin.traversalVertexProgram.sideEffects"; //todo: improve https://github.com/tinkerpop/tinkerpop3/blob/master/gremlin-core/src/main/java/com/tinkerpop/gremlin/process/Traversal.java#L96
};

Traversal.SideEffects.prototype = {
  exists: function(key) {
    return !!this.keys()[key]; //improve: use a Set
  },

  set: function(key, value) {
    throw new Error('Not yet implemented');
  },

  orElse: function(key, otherValue) {
    return this.exists(key) ? this.get(key) : otherValue;
  },

  remove: function(key) {
    throw new Error('Not yet implemented');
  },

  keys: function() {
    throw new Error('Not yet implemented');
  },

  graphExists: function() {
    return this.exists(GraphKey.hide('g'));
  },

  setGraph: function(graph) {
    var key = GraphKey.hide('g', graph);
    this.set(key, graph);
  },

  getGraph: function() {
    if (this.exists(GraphKey.hide('g'))) {
      return this.get(GraphKey.hide('g')); //todo check
    } else {
      throw new Error('IllegalStateException("There is no graph stored in these side effects")'); //improve
    }
  },

  removeGraph: function(graph) {
    this.remove(GraphKey.hide('g'));
  },

  getOrCreate: function(key, orCreate) {
    if (this.exists(key)) {
      return this.get('key');
    } else {
      var t = orCreate.get();
      this.set(key, t);
      return t;
    }
  },

  forEach: function(biConsumer) {
    this.keys().forEach(function(key) {
      return biConsumer.accept(key, this.get(key));
    });
  },

  setLocalVertex: function(vertex) {
    throw new Error('Not yet implemented');
  },
};


module.exports = Traversal;