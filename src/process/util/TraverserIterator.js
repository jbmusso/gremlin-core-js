var SimpleTraverser = require('../SimpleTraverser');


function TraverserIterator(step, trackPaths, iterator) {
  this.iterator = iterator;
  this.step = step;
  this.trackPaths = trackPaths;
}

TraverserIterator.prototype.hasNext = function() {
  console.log('==TraverserIterator.hasNext==');

  return this.iterator.hasNext();
};

TraverserIterator.prototype.next = function() {
  var traverser;
  console.log('==TraverserIterator.next()==');

  var next = this.iterator.next();
  var nextValue = next.value;
  var isDone = next.done;
  var sideEffects = this.step.getTraversal().getSideEffects();

  // console.log(nextValue);

  if (this.trackPaths) {
    traverser = new PathTraverser(this.step.getLabel(), nextValue, sideEffects);
  } else {
    traverser = new SimpleTraverser(nextValue, sideEffects);
  }

  // console.log('---------');
  // console.log(traverser.cosntructor.name);
  // console.log(traverser);

  return {
    value: traverser,
    done: isDone
  };
};

module.exports = TraverserIterator;