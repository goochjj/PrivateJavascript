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

It's a cool concept, but I don't know that you want to do this in production... 
  1) Changing the object's ID would magically make that object reference the other ID.
  2) Keeping an overall registry like this might mess with garbage collection - such as it might be in JS.

But, it works... Check it with TestMyWrappedPerson.js (see MyWrappedPerson.js for implementation)

And then MyGenericWrapper.js shows how to do it dynamically, with Adam's original class, and its associated
TestMyGenericWrapper.js.

Were one to implement this, you'd probably want a compilation or build automation step to implement the wrappers, or do
it globally at a namespace level at some point.

YMMV, use the code if you want, I guarantee nothing.


