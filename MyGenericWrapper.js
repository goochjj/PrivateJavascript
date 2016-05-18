var ns = ns || {};
// Get Person Class to Wrap
var clz = require('./AdamCameronPerson.js').Person

// Person Class
ns.Person = (function() {
  var _instances = {};
  var _id = 0;

  var Inner = function(args) { return clz.apply(this, args); }
  Inner.prototype = clz.prototype;

  var Wrapper = function() {
    this.id = _id++;
    _instances[this.id] = new Inner(arguments);
    return this;
  };
  Wrapper.prototype.getId = function() { return this.id; }
  Wrapper.prototype.getObj = function() { return _instances[this.id]; } // Remove this in production
  // Instance methods
  var _wrap = function(_fn) { return function() { return _fn.apply(_instances[this.id],arguments); } };
  for(var method in Inner.prototype) {
    Wrapper.prototype[method] = _wrap(Inner.prototype[method]);
  }
  // Static Methods
  for(var method in clz) {
    Wrapper[method] = clz[method];
  }
  return Wrapper;
})();

module.exports = ns;
