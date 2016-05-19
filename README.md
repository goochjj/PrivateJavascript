## Private Javascript

Quick example in response to Adam Cameron's blog post.

http://blog.adamcameron.me/2016/05/there-and-back-again-or-i-suck-at.html

Dealing with things related to private instance methods in Javascript.  It's true that Javascript can't do this natively.
These are worked out with Node for the purposes of checking things.

You can see Adam's code with node TestAdamCameronPerson.js

My first attempt is in MyWrappedPerson.  The idea is we make a private scope, we create an object with a registry we
can reference, with objects, and we create wrapper objects that hide all the variables behind a single opaque ID.  A new
object "Wrapper" is created in a private scope to encapsulate the class logic.  Each method is created manually for now,
and the prototype contains a single closure for each method (which then gets shared across classes of that object via
prototype inheritance).  So it's better than wrapping every method in each constructor call.

It's a cool concept... You'd want to investigate feasibility before using in production:
  1) Changing the object's ID would magically make that object reference the other ID.
  2) Keeping an overall registry like this might mess with garbage collection - such as it might be in JS.

But, it works... Check it with TestMyWrappedPerson.js (see MyWrappedPerson.js for implementation)  Were one to implement 
this, you'd probably want a compilation or build automation step to implement the wrappers, or do
it globally at a namespace level at some point.

MyGenericWrapper.js shows how to do it dynamically, with Adam's original class, and its associated
TestMyGenericWrapper.js.  Inner is created as a wrapper, mainly so we can extract the Constructor and call it with apply().
The Wrapper object is essentially our "public" view.  It only needs static methods and instance method delegates, which
use the Inner object for state.

I think this illustrates the point that Javascript doesn't implement a "Class" model like Java or C++, but it does
provide the developer with all the tools to do so themselves.  One of the premises in Adam's original article was
related to instance data - but Javascript doesn't prevent you from changing member functions either - consider instead
of using this.id, I used this.getId().  The member function is no more immutable than the data; a user could do
person.getId = function() { return 0 ; } and mess with our reference just as easily.

The wrapping code could be further extended to handle private methods - for instance, let's say any member function
starting with a $ is private.  Since our Inner class is our full object, private and public, we have all member functions
defined there.  In our wrapper, we merely create delegates for methods that don't start with a $.

Or we could create a convention that our Person class defines this.privateMethods, this.publicMethods, and we use
those to determine what gets copied.

What about inheritance?  Mixins?  Right now all that is handled via manipulations of the prototype scope and __proto__ 
object... Use of for (var x in y) syntax should include inherited functions - it could be modified for hasOwnProperty or
other filters to control the delegates.

How about how other frameworks do things?  PrototypeJS has a Class object, which implements inheritance, and one of
my favorite features - passing in the $super argument to a member function (if you define $super as an argument), which
references the function overlaid by this member in a child class.  That's a convention of the framework, not Javascript.

YMMV, use the code if you want, I guarantee nothing!
