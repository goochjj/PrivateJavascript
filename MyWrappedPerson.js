var ns = ns || {};

// Person Class
ns.Person = (function() {
  var _registry = {};
  var _id = 0;

  var _Person = function() {};
  var _PersonConstructor = function(firstName, lastName, dob, status){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.status = status;
  };
  _Person.capitaliseName = function(name){
    return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
  }
  _Person.prototype.getFullName = function(){
    return _Person.capitaliseName(this.firstName)
        + " "
        + _Person.capitaliseName(this.lastName);
  };
  _Person.prototype.getAgeInYears = function () {
    return new Date().getFullYear() - this.dob.getFullYear();
  };

  _Person.prototype.setStatus = function (status) {
    this.status = status;
  };

  _Person.prototype.getStatus = function () {
    return this.status;
  };

  _Person.prototype.toJSON = function(){
    return {
        firstName : this.firstName,
        lastName : this.lastName,
        fullName : this.fullName,
        dob : this.dob,
        status : this.status
    };
  };

  var Wrapper = function() {
    this.id = _id++;
    _registry[this.id] = new _Person();
    _PersonConstructor.apply(_registry[this.id], arguments);
  };
  Wrapper.prototype.getId = function() { return this.id; }
  Wrapper.prototype.getObj = function() { return _registry[this.id]; } // Remove this in production
  // Instance methods
  Wrapper.prototype.getFullName = function() { return _registry[this.id].getFullName(); }
  Wrapper.prototype.getAgeInYears = function() { return _registry[this.id].getAgeInYears(); }
  Wrapper.prototype.getStatus = function() { return _registry[this.id].getStatus(); }
  Wrapper.prototype.setStatus = function(s) { return _registry[this.id].setStatus(s); }
  Wrapper.prototype.toJSON = function(s) { return _registry[this.id].toJSON(); }
  // Static Methods
  Wrapper.capitaliseName = _Person.capitaliseName;
  return Wrapper;
})();



module.exports = ns;
