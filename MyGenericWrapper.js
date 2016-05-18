var ns = ns || {};
// Get Person Class to Wrap
var _clz = require('./AdamCameronPerson.js').Person

var wrapClass = function(clz) {
  var _instances = {};
  var _id = 0;

  // We create a new class with a more convenient constructor, so we can use varargs style, but we share the same prototype.
  // Static methods don't matter.
  var Inner = function(args) { return clz.apply(this, args); }
  Inner.prototype = clz.prototype;

  // This is our top level object - which only contains an ID, and instantiates our Inner objects.
  var Wrapper = function() {
    this.id = _id++;
    _instances[this.id] = new Inner(arguments);
    return this;
  };
  Wrapper.prototype.getId = function() { return this.id; }
  Wrapper.prototype.getObj = function() { return _instances[this.id]; } // Remove this in production
  // Instance methods
  //   This is its own function so _method is in a protected scope
  var _wrap = function(_method) { return function() { return Inner.prototype[_method].apply(_instances[this.id],arguments); } };
  for(var method in Inner.prototype) {
    Wrapper.prototype[method] = _wrap(method);
  }
  // Static Methods - copy directly since "this" is immaterial
  for(var method in clz) {
    Wrapper[method] = clz[method];
  }
  return Wrapper;
};

// Person Class
ns.Person = wrapClass(_clz);
ns.wrapClass = wrapClass;

module.exports = ns;
