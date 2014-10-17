function FunctionRing(functions) {
  this.functions = functions || [];
  this.currentFunction = -1;
}

FunctionRing.prototype.next = function() {
  if (this.functions.length === 0) {
    return function(t) { return t; }; // identity function
  } else {
    this.currentFunction = (this.currentFunction + 1) % this.functions.length;
    return this.functions[this.currentFunction];
  }
};

FunctionRing.prototype.hasFunctions = function() {
  return this.functions.length > 0;
};

FunctionRing.prototype.reset = function() {
  this.currentFunction = -1;
};

module.exports = FunctionRing;