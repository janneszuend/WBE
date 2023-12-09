# Notes of Eloquent JavaScript

## Chapter 2

### Bindings

JavaScript provides a thing called a *binding*, or *variable*.

The keyword **let** indicates that this sentence is going to defina a binding. When you define a binding without giving it a value, the "tentacle" has nothing to grasp, so it ends in thin air. You get undefined.

**BSP:**

let ten = 10
console.log (ten * ten)

The keyword **const** stands for constant. It defines a constant binding, which points at the same value for as long as it lives. This is useful for bindings that give a name to a value so that you can easily refer to it later.

### Binding Names

The name must not start with a digit. A binding name may indlude dollar signs ($) or underscores (_) but no other punctuation or special characters.

Reserved words:

break case catch class const continue debugger default
 delete do else enum export extends false finally for
 function if implements import interface in instanceof let
 new package private protected public return static super
 switch this throw true try typeof var void while with yield

### Functions

A function is a piece of program wrapped in a value. Such values can be *applied* in order to run the wrapped program. For example, in a browser environment, the binidng prompt holds a function that shows a little dialog box asking for user input. It is used like this:

promt("Enter passcode")

