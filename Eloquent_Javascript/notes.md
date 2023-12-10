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

What happens to local bindings when the funcion call that created them is no longer active? It defines a funciton, wrapValue, that creates a local binding. It then returns a funciton that accesses and returns this local binding. 

    function wrapValue(n) {
      let local = n;
      return () => local;
    }

    let wrap1 = wrapValue(1);
    let wrap2 = wrapValue(2);
    console.log(wrap1());
    // → 1
    console.log(wrap2());
    // → 2

This is allowed and works. Both instances of the binding can still be accessed. This feature - being able to reference a specific instance of a local binidng in an enclosing scope - is called *closure*.

With a slight change, we can turn the previous example into a way to create functions that multiply by an arbitrary amount.

    function multiplier(factor) {
      return number => number * factor;
    }
    let twice = multiplier(2);
    console.log(twice(5));
    // → 10

In the example, multiplier is called and creates an environment in which its factor parameter is bound to 2. The funciton value it returns, which is stored in twice, remembers this environment. So when that is called, it multiplies its argument by 2.

### Recursion

It is perfectly okay for a function to call itself, as long as it doesn't do it so often that it overflows the stack. A function that calls itself is called recursive. 

    function power(base, exponent) {
      if (exponent == 0) {
        return 1;
      } else {
        return base * power(base, exponent - 1);
      }
    }
    console.log(power(2, 3));
    // → 8

Recursion is not always just an inefficient alternative to looping. Some problems really are easier to solve with recursion than with loops. Most often these are problems that require exploring or processing several "brancehs", each of which might branch out again into even more branches.

    function findSolution(target) {
      function find(current, history) {
        if (current == target) {
          return history;
        } else if (current > target) {
          return null;
    } else {
    return find(current + 5, `(${history} + 5)`) ||
    find(current * 3, `(${history} * 3)`);
    } }
    return find(1, "1"); }
    console.log(findSolution(24)); // → (((1 * 3) + 5) * 3)

The program runs like this to find the solution for number 13.

    find(1, "1")
      find(6, "(1 + 5)")
        ff3ind(11, "((1 + 5) + 5)") find(16, "(((1 + 5) + 5) + 5)")
          too big
        find(33, "(((1 + 5) + 5) * 3)")
          too big
      find(18, "((1 + 5) * 3)")
        too big 
    find(3, "(1 * 3)")
      find(8, "((1 * 3) + 5)")
        find(13, "(((1 * 3) + 5) + 5)")
          found!

## Data structures: Objects and Array

### Data sets

Datatype for storing sequences of values:

    let listOfNumbers = [2, 3, 5, 7, 11];
    console.log(listOfNumbers[2]);
    // → 5
    console.log(listOfNumbers[0]);
    // → 2
    console.log(listOfNumbers[2 - 1]);
    // → 3

### Objects

Values of the type object are arbitrary collections of properties. One way to create an object is by using braces as an expression.

    let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
    }; 
    console.log(day1.squirrel); 
    // → false 
    console.log(day1.wolf);
    // → undefined
    day1.wolf = false; 
    console.log(day1.wolf);
    // → false

Inside the braces, there is a list of properties separated by commas. Each property has a name followed ba a colon and a value. Properties whose names aren't valid bining names or valid numbers have to be quoted. 

    let descriptions = {
    work: "Went to work",
    "touched tree": "Touched a tree"
    };

