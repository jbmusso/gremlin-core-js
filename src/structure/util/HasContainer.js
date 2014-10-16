function HasContainer(key, predicate, value) {
  this.key = (key && key.getAccessor && key.getAccessor()) || key;
  this.predicate = predicate;
  this.value = value || null;

  if (!this.value && !(this.predicate instanceof Contains)) {
    throw new Error('throw new IllegalArgumentException("For determining the existence of a property, use the Contains predicate");');
  }
}

HasContainer.prototype.test = function(element) {
  if (this.value) {

    if (this.key.equals(T.id.getAccessor())) {
      return this.predicate.test(element.id(), this.value);
    } else if (this.key.equals(T.label.getAccessor())) {
      return this.predicate.test(element.label(), this.value);
    } else if (element instanceof VertexProperty && this.key.equals(T.value.getAccessor())) {
      return this.predicate.test((element).value(), this.value);
    } else if (element instanceof VertexProperty && this.key.equals(T.key.getAccessor())) {
      return this.predicate.test((element).key(), this.value);
    } else {
      if (element instanceof Vertex) {
        var iterator = element.iterators().properties(this.key);
        while (iterator.hasNext()) {
          if (this.predicate.test(iterator.next().value(), this.value)) {
            return true;
          }
        }

        return false;
      } else {
          var property = element.property(this.key);
          return property.isPresent() && this.predicate.test(property.value(), this.value);
      }
    }
  } else {
    return Contains.in.equals(this.predicate) ?
      element.property(this.key).isPresent() :
      !element.property(this.key).isPresent();
  }
};

HasContainer.testAll = function(element, hasContainers) {
  if (hasContainers.length === 0) {
    return true;
  }
  else {
    var hasContainer;

    for (var i = 0; i < hasContainers.length; i++) {
      hasContainer = hasContainers[i];
      if (!hasContainer.test(element)) {
        return false;
      }
    }

    return true;
  }
};

module.exports = HasContainer;