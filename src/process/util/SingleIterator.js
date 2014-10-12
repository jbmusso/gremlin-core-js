function SingleIterator(traverser) {
  this.traverser = traverser;
  this.alive = true;
}

SingleIterator.prototype.next = function() {
  if (!this.alive) {
    return {
      value: undefined,
      done: true
    };
  } else {
    this.alive = false;

    return {
      value: this.traverser,
      done: false
    };
  }
};



module.exports = SingleIterator;