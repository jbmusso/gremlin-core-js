var SimpleTraverser = require('../SimpleTraverser');
var PathTraverser = require('../PathTraverser');



function TraverserIterator(step, trackPaths, iterator) {
  this.iterator = iterator;
  this.step = step;
  this.trackPaths = trackPaths;
}

TraverserIterator.prototype.next = function() {
  var traverser;
  var next = this.iterator.next();
  var sideEffects = this.step.getTraversal().getSideEffects();

  if (!next.done) {
    if (this.trackPaths) {
      traverser = new PathTraverser(this.step.getLabel(), next.value, sideEffects);
    } else {
      traverser = new SimpleTraverser(next.value, sideEffects);
    }

    return { value: traverser, done: next.done };
  }

  return { value: undefined, done: true }; // exit loop
};

module.exports = TraverserIterator;