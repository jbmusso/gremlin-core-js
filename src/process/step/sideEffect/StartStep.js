var util = require('util');

var _ = require('underscore');

var SideEffectStep = require('./SideEffectStep');
var SimpleTraverser = require('../../SimpleTraverser');
var SingleIterator = require('../../util/SingleIterator');
var TraverserIterator = require('../../util/TraverserIterator');

var TraverserSource = require('../../graph/marker/TraverserSource');


function StartStep(traversal, start) {
  console.log('==StartStep.constructor==');

  this.start = start || null;
  SideEffectStep.call(this, traversal);
}

util.inherits(StartStep, SideEffectStep);
_.extend(StartStep.prototype, TraverserSource.prototype, SideEffectStep.prototype);


StartStep.prototype.clear = function() {
  this.starts.clear();
};

StartStep.prototype.generateTraverserIterator = function(trackPaths) {
  console.log('==StartStep.generateTraverserIterator==');
  if (this.start !== null) { // this.start is an ElementTraversal or a VertexPropertyTraversal
    this.starts.clear();
    // console.log(this.start);

    if (typeof this.start.next === 'function') { // mimic check for instanceof Iterator
      var iterator = new TraverserIterator(this, trackPaths, this.start);
      console.log('-----');
      // console.log(this.start.constructor.name);
      // console.log(this.start.next.toString());
      // console.log(iterator.constructor.name);
      // console.log(iterator.iterator.constructor.name, '-------------');
      this.starts.add(iterator);
    } else {
      var traverser = trackPaths ? new PathTraverser(this.getLabel(), this.start, this.traversal.getSideEffects()) : new SimpleTraverser(this.start, this.traversal.getSideEffects());

      this.starts.add(new SingleIterator(traverser));
    }
  }
};

module.exports = StartStep;
