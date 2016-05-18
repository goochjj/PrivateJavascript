var ns = ns || {};

ns.Person = function(firstName, lastName, dob, status){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.status = status;
};

ns.Person.capitaliseName = function(name){
    return name.replace(/(^|\b)([a-z])/g, function(match){return match.toUpperCase();});
}

ns.Person.prototype.getFullName = function(){
    return ns.Person.capitaliseName(this.firstName)
        + " "
        + ns.Person.capitaliseName(this.lastName);
};

ns.Person.prototype.getAgeInYears = function () {
    return new Date().getFullYear() - this.dob.getFullYear();
};

ns.Person.prototype.setStatus = function (status) {
    this.status = status;
};

ns.Person.prototype.getStatus = function () {
    return this.status;
};

ns.Person.prototype.toJSON = function(){
    return {
        firstName : this.firstName,
        lastName : this.lastName,
        fullName : this.fullName,
        dob : this.dob,
        status : this.status
    };
};

module.exports = ns;
