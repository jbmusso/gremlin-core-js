var inherits = require('util').inherits;

var _ = require('underscore');

var MapStep = require('./MapStep');
var PathConsumer = require('../../graph/marker/PathConsumer');
var FunctionRing = require('../../util/FunctionRing');
var Path = require('../../Path');


function PathStep(traversal, pathFunctions) { //...pathFunctions
  var path;

  MapStep.call(this, traversal);

  this.functionRing = !pathFunctions ? null : new FunctionRing(pathFunctions);

  var self = this;
  this.setFunction(function(traverser) {
    if (!self.functionRing) {
      path = traverser.getPath();
      return path;
    } else {
      path = MutablePath.make();
      traverser.getPath().forEach(function(labels, object) {
        path.extend(labels, self.functionRing.next()(object));
      });
      self.functionRing.reset();
      return path;
    }
  });
}

inherits(PathStep, MapStep); // extends
_.extend(PathStep.prototype, PathConsumer.prototype); // implements

PathStep.prototype.reset = function() {
  MapStep.prototype.reset.call(this);
  this.functionRing.reset();
};


module.exports = PathStep;