var GraphSystem = require('../structure/graph.system');

function T() {

}

T.LABEL = GraphSystem.system('label');
T.ID = GraphSystem.system('id');
T.KEY = GraphSystem.system('key');
T.VALUE = GraphSystem.system('value');

T.label = {
  getAccessor: function() {
    return T.label;
  }
};

T.id = {
  getAccessor: function() {
    return T.ID;
  }
};

T.key = {
  getAccessor: function() {
    return T.key;
  }
};

T.value = {
  getAccessor: function() {
    return T.value;
  }
};


module.exports = T;