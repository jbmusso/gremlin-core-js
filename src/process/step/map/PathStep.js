var inherits = require('util').inherits;

var _ = require('underscore');

var MapStep = require('./MapStep');
var PathConsumer = require('../../graph/marker/PathConsumer');
var FunctionRing = require('../../util/FunctionRing');
var Path = require('../../Path');


function PathStep(traversal, pathFunctions) { //...pathFunctions
  MapStep.call(this, traversal);
  console.log(pathFunctions && pathFunctions.length === 0);

  var path;
  // if (pathFunctions)
  this.functionRing = !pathFunctions ? null : new FunctionRing(pathFunctions);

  this.setFunction(function(traverser) {
    var path = new Path();
    if (!this.functionRing) {
      path = traverser.getPath();

      console.log('======');
      // path.add(traverser.getPath());
    } else {
      // traverser.getPath().forEach(function(a, b) {
      //   path.add(a, this.functionRing.next()(b));
      //   this.functionRing.reset();
      // });
    }

    return path;
  });
}

inherits(PathStep, MapStep); // extends
_.extend(PathStep, PathConsumer); // implements


module.exports = PathStep;