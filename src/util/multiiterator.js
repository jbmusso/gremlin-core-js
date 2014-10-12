function MultiIterator(limit) {
  this.limit = limit || 9007199254740992;
  this.iterators = [];
  this.current = 0;
  this.limit = null;
  this.count = 0;
}

MultiIterator.prototype.addIterator = function(iterator) {
  this.iterators.push(iterator);
};

MultiIterator.prototype.hasNext = function(first_argument) {
  if (this.count >= this.limit) {
    return false;
  }

  if (this.current >= this.iterators.length) {
    return false;
  }

  var currentIterator = this.iterators[this.current];

  while (true) {
      if (currentIterator.hasNext()) {
          return true;
      } else {
          this.current++;

          if (this.current >= iterators.length) {
            break;
          }
          currentIterator = iterators.get(this.current);
      }
  }

  return false;
};

MultiIterator.prototype.next = function() {
  if (this.count >= this.limit) {
    // throw FastNoSuchElementException.instance();
  }

  var currentIterator = this.iterators[this.current];

  while (true) {
    if (currentIterator.hasNext()) {
      this.count++;
      return currentIterator.next();
    } else {
      this.current++;

      if (this.current >= iterators.length) {
        break;
      }

      currentIterator = iterators.get(current);
    }
  }
  // throw FastNoSuchElementException.instance();};
};

module.exports = MultiIterator;