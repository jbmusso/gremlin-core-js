var util = require('util');

var _ = require('underscore');

var SideEffectStep = require('./SideEffectStep');
var SimpleTraverser = require('../../SimpleTraverser');
var SingleIterator = require('../../util/SingleIterator');
var TraverserIterator = require('../../util/TraverserIterator');

var TraverserSource = require('../../graph/marker/TraverserSource');


function StartStep(traversal, start) {
  this.start = start || null;
  SideEffectStep.call(this, traversal);
}

util.inherits(StartStep, SideEffectStep);
_.extend(StartStep.prototype, TraverserSource.prototype, SideEffectStep.prototype);


StartStep.prototype.clear = function() {
  this.starts.clear();
};

StartStep.prototype.generateTraverserIterator = function(trackPaths) {
  if (this.start !== null) { // this.start is an ElementTraversal or a VertexPropertyTraversal
    this.starts.clear();

    if (typeof this.start.next === 'function') { // mimic check for instanceof Iterator
      var iterator = new TraverserIterator(this, trackPaths, this.start);

      this.starts.add(iterator);
    } else {
      var traverser = trackPaths ? new PathTraverser(this.getLabel(), this.start, this.traversal.getSideEffects()) : new SimpleTraverser(this.start, this.traversal.getSideEffects());

      this.starts.add(new SingleIterator(traverser));
    }
  }
};

module.exports = StartStep;
