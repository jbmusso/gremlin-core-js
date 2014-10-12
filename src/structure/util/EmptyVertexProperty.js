function EmptyVertexProperty() {

}

EmptyVertexProperty.instance = function() {
  var instance = null;

  return instance ? instance : new EmptyVertexProperty();
};

module.exports = EmptyVertexProperty;