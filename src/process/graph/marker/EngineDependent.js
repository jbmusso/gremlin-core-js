function EngineDependent() {

}

EngineDependent.Engine = { STANDARD: 0, COMPUTER: 1 };

EngineDependent.prototype.onEngine = function(engine) {
  throw new Error('Not yet implemented');
};

module.exports = EngineDependent;