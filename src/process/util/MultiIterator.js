require('es6-shim');

function MultiIterator(limit) {
  this.limit = limit || Number.MAX_SAFE_INTEGER;
  this.iterators = [];
  this.current = 0;
  this.count = 0;
}

MultiIterator.prototype.addIterator = function(iterator) {
  this.iterators.push(iterator);
};

MultiIterator.prototype.next = function() {
  var currentIterator;
  var cur;

  if (this.count >= this.limit) {
    return { value: undefined, done: true };
  }

  currentIterator = this.iterators[this.current];

  while (true && currentIterator) { // && currenIterator experimental
    cur = currentIterator.next();

    if (!cur.done) {
      this.count++;

      return cur;
    } else {
      this.current++;

      if (this.current >= this.iterators.length) {
        break;
      }
      currentIterator = this.iterators[this.current];
    }
  }
  return {
    value: undefined,
    done: true
  };
};

module.exports = MultiIterator;