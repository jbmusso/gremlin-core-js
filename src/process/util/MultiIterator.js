function MultiIterator(limit) {
  this.limit = limit || 9007199254740992;
  this.iterators = [];
  this.current = 0;
  this.count = 0;
}

MultiIterator.prototype.addIterator = function(iterator) {
  console.log('==MultiIterator.addIterator==');
  this.iterators.push(iterator);
  // console.log(iterator);
  // // console.log(iterator.values().next().value.constructor.name);
  // throw new Error();
};

MultiIterator.prototype.next = function() {
  console.log('==MultiIterator.next==');

  var currentIterator;
  var cur;

  if (this.count >= this.limit) {
    return {
      value: undefined,
      done: true
    };
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
      console.log('------------------------------------>', this.current);
      currentIterator = this.iterators[this.current];
    }

    return cur;
  }
  return {
    value: undefined,
    done: true
  };
};

module.exports = MultiIterator;