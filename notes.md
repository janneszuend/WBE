# Notes of Eloquent JavaScript

## Chapter 2 - Program Structure

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

Executing a function is called invoking, calling or applying it.

### The console.log function

Most JavaScript system provide a conosle.log function that writes out its arguments to some text output device.

### Conditional execution

Special version of an if:

    if (1 + 1 == 2) console.log("It's true")

## Chapter 3 - Functions

### Defining a function

Example:

    const square = function(x){
      return x * x
    }

    console.log(square(12))
    // --> 144

### Bindings and scopes

Each binding has a scope, which is the part of the program in which the binding is visible. Bindings declared with let and const are in fact local to the block that they are declared in. Old-style bindings, created with the var keyword, are visible throughout the whole function that they appear in -- or throughout the global scope, if they are not in a function.

### Functions as values

A binding that holds a function is still just a regular binding and can, if not constant, be assigned a new value, like so:

    let launchMissiles = function() { missileSystem.launch("now")
    }
    if (safeMode) {
      launchMissiles = function() {/* do nothing */}
    }

### Declaration Notation

There is a shorter way to create a function binding. When the function keyword is used at the start of a statement, it works differently.

    function square(x) {
      return x * x;
    }

This is a funciton declaration.

    console.log("The future says:", future());
    function future() {
    return "You'll never have flying cars";
    }

The preceding code works, even though the function is defined *below* the code that uses it. Functions declarations are not part of the regular top-to-bottom flow of control. This is sometimes useful because it offers the freedom to order code in a way that seems meaningful, without worrying about haveing to define all functions before they are used.

### Arrow Functions

  Instead of the function keyword, it uses an arrow (=>).

      const power = (base, exponent) => {
        let result = 1;
        for (let count = 0; count < exponent; count++) {
          result *= base;
        }
        return result;
      }

The arrow comes after the list of parameters and is followed by the functions body. Both is possible:

    const square1 = (x) => { return x * x; };
    const square2 = x => x * x;

When an arrow function has no parameters at all, ts parameter list is just an empty set of parantheses:

    const horn = () => { 
      console.log("Toot");
    };

### Optional Arguments

The following code is allowed and executes without any problem:

    function square(x) { return x * x; } 
    console.log(square(4, true, "hedgehog")); 
    // → 16

JavaScript is extremely broad-minded about the number of arguments you pass to a function. If you pass too many, the extra ones are ignored. If you pass to few, the missing parameters get assigned the value **undefined**.

This works for example like this:

    function minus(a, b) {
      if (b === undefined) return -a;
      else return a - b;
    }
    console.log(minus(10));
    // → -10
    console.log(minus(10, 5));
    // → 5

If you write an = operator after a parameter, followed by an expression, the value of that expression will replace the argument when it is not given. It acts as a default value.

    function power(base, exponent = 2) {
      let result = 1;
      for (let count = 0; count < exponent; count++) {
        result *= base;
      }
      return result;
    }
    console.log(power(4));
    // → 16
    console.log(power(2, 6));
    // → 64

### Closure

