var _ = require('lodash');

var GraphSystem = require('../graph.system');
var T = require('../../process/t');


function ElementHelper() {
}

ElementHelper.validateLabel = function(label) {
  if (!label) {
    throw new Error('Element.Exceptions.labelCanNotBeNull()');
  }

  if (label === '') {
    throw new Error('Element.Exceptions.labelCanNotBeEmpty()');
  }

  if (GraphSystem.isSystem(label)) {
    throw new Error('Element.Exceptions.labelCanNotBeASystemKey(label)');
  }
};

ElementHelper.getOrAddVertex = function(graph, id, label) {
  try {
    return graph.v(id);
  } catch (e) { // shoud catch final NoSuchElementException error
    return graph.addVertex(T.id, id, T.label, label); //todo: implement t.js
  }
};

ElementHelper.validateProperty = function(key, value) {
  if (!value) {
    throw new Error('Property.Exceptions.propertyValueCanNotBeNull()');
  }

  if (!key) {
    throw new Error('Property.Exceptions.propertyKeyCanNotBeNull()');
  }

  if (key === '') {
    throw new Error('Property.Exceptions.propertyKeyCanNotBeEmpty()');
  }

  if (GraphSystem.isSystem(key)) {
    throw new Error('Property.Exceptions.propertyKeyCanNotBeASystemKey('+key);
  }
};

ElementHelper.attachProperties = function(element, properties) {
  var propertyName;
  var propertyValue;

  if (_.isArray(properties)) {
    // Attach properties from array
    for (var i = 0; i < properties.length; i += 2) {
      propertyName = properties[i];
      propertyValue = properties[i + 1];
      element.property(propertyName, propertyValue);
    }

  } else {
    // console.log('@@@@@@@@@@@@@');
    // Attach properties from object/map
    for (propertyName in properties) {
      propertyValue = properties[propertyName];
      element.property(propertyName, propertyValue);
    }
  }
};

ElementHelper.legalPropertyKeyValueArray = function(propertyKeyValues) {
  // console.log(propertyKeyValues);

};


ElementHelper.getIdValue = function(keyValues) {
  keyValues = arguments;

  for (var i = 0; i < keyValues.length; i = i + 2) {
    if (keyValues[i] === T.id)
      return keyValues[i + 1];
  }

  return null;
};

ElementHelper.getLabelValue = function(keyValues) {
  if (!keyValues) { // JS specific test
    return null;
  }

  for (var i = 0; i < keyValues.length; i = i + 2) {
      if (keyValues[i] === T.label) {
          ElementHelper.validateLabel(keyValues[i + 1]);

          return keyValues[i + 1];
      }
  }
  return null;
};

module.exports = ElementHelper;