var _ = require('lazy.js');

Key = function() {};

Key.HIDDEN_PREFIX = '~';

Key.HIDDEN_PREFIX_LENGTH = (function() {
  return this.HIDDEN_PREFIX.length;
}.call(Key));


Key.hide = function(key) {
  return this.isHidden(key) ? key : this.HIDDEN_PREFIX.concat(key);
};

Key.unHide = function(key) {
  return this.isHidden(key) ? key.substr(0, this.HIDDEN_PREFIX_LENGTH) : key;
};

Key.isHidden = function(key) {
  return _(key).startsWith(this.HIDDEN_PREFIX);
};

module.exports = Key;