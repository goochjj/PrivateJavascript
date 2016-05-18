var ns=require('./MyGenericWrapper.js')

var person = new ns.Person("kiri", "te kanawa", new Date("1944-03-06"));
console.dir(person);
//console.dir(person.getObj());
console.log(person.getId());
console.log(person.firstName);
console.log(person.lastName);
console.log(person.getFullName());
console.log(JSON.stringify(person));

console.log(ns.Person.capitaliseName("jean batten"));

var secondPerson = new ns.Person("georgina", "beyer", new Date("1957-11-01"));
console.dir(secondPerson);
console.log(secondPerson.firstName);
console.log(secondPerson.lastName);
console.log(secondPerson.getFullName());

secondPerson.setStatus("Active");
console.log(secondPerson.getStatus());

console.log(JSON.stringify(secondPerson));

