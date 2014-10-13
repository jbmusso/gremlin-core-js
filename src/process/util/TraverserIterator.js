var SimpleTraverser = require('../SimpleTraverser');


function TraverserIterator(step, trackPaths, iterator) {
  console.log('==TraverserIterator.constructor()==');
  this.iterator = iterator;
  this.step = step;
  this.trackPaths = trackPaths;
}

// TraverserIterator.prototype.hasNext = function() {
//   console.log('==TraverserIterator.hasNext==');

//   return this.iterator.hasNext();
// };

TraverserIterator.prototype.next = function() {
  var traverser;
  console.log('    - TraverserIterator.next()==');

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

  return { value: undefined, done: true };
};

module.exports = TraverserIterator;