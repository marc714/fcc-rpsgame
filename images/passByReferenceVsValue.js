// https://codeburst.io/javascript-passing-by-value-vs-reference-explained-in-plain-english-8d00fd06a47c
// https://www.youtube.com/watch?v=fD0t_DKREbE

/*
Pass by Value (primative types):
let a = 5; // we assign variable a to a memory address 0x01 which has a value of 5
let b = a; // we assign variable b to a. b looks at a's memory address 0x01 and see's 5, a primative value. because it's a primative, b then copies the value into it's own memory address 0x02.

ultimately, a and b are two separate things (separate memory addresses).


Pass by Reference (non primative):

let x = { value:10 }; // we assign x to a memory address 0x01, which has an object value:10
let y = x; // we assign y to x. y looks at x's memory address 0x01, which has an object value:10. Since it's non-primative, y's value will always reference x's memory address 0x01. When we change x, y automatically changes.

x.value = 20

console.log(x) // value:20
cpnsole.log(y) // value:20

when you assign y to x, y looks up the memory address

Summary: PRIMATIVES are copied by their VALUE. 
OBJECTS are copied by their REFERENCE.
*/


// Super Important w/ SCOPE: https://youtu.be/fD0t_DKREbE?t=214
// he used Variable Shadowing which is not good/confusing https://mayuminishimoto.medium.com/understanding-variable-shadowing-with-javascript-58fc108c8f03 
// basically try not to use the same variables inside the function as the ones globally e.g., 'number'

let number = 10; // memory 0x01

function increase(x) { // 1. when we invoke the function increase(number), the function sees that the parameter x - in this case 'number = 10' is primative. And therefore COPIES the value 10 into a NEW variable X under it's own memory address 0x02 INSIDE this function scope.
 x++;  // 0x02 increases by 1. Inside this scope X will be 11. 
}

increase(number); // invoke function. 0x02 is 11.
console.log(number); // prints out Number variable pointing to memory 0x01, aka 10.



///////////////// https://developer.mozilla.org/en-US/docs/Glossary/Mutable


let number1 = 10; // immutable primative type. memory 0x01

function increase1() {  // No parameter. function doesn't check value or make copy (in case of primative)
 number1 = number1 + 1; // inside this function, variable number1 now assigned to 11, and stored into 0x02. function now reassigns number1 to 0x02.
}

increase1();
console.log(number1); // prints out 0x02, aka 11.



////////////////




const number2 = 10;

function increase2(x) {
 number2++;
}

increase2();
console.log(number); // Error: Assignment to constant variable.



/////
//https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239

//https://stackoverflow.com/questions/13104494/does-javascript-pass-by-reference


//https://www.javascripttutorial.net/javascript-pass-by-value/
// !!!!! In addition, when you pass an object into a function, the function cannot change the reference variable to reference another object. !!!!!

let spaceship = 2

function tryReassignment(obj) {
  obj = 1
  };

tryReassignment(spaceship) // The attempt at reassignment does not work.
console.log(spaceship) // Still returns 2 - even if i made spaceship an object.

/////  ///////////////////// primative below:
let spaceship = 2

function tryReassignment(x) {
  x = 1
 };

 tryReassignment(spaceship) // The attempt at reassignment does not work.
 console.log(spaceship) // Still returns 2


 ///////////////  non primative
 let spaceship = [1, 2, 3];

function tryReassignment(x) {
  x = [1] // also tried x = 1
 };

tryReassignment(spaceship) // The attempt at reassignment does not work.
console.log(spaceship) // Still returns 1,2,3

///////////////
let spaceship = [1, 2, 3];

function tryReassignment(x) {
  x.pop();
 };

tryReassignment(spaceship) // The attempt at reassignment does not work.
console.log(spaceship) // returns 1,2  --- mutable.





//// basics
let a = 5  // global var

function myFunction (x) {
 x = 6 // or x = string. it doesn't matter. only works inside function scope due to pass by value. 
}

console.log(a); // returns 5
myFunction(a);
console.log(a); // returns 5

// more basics

let a = 5

function myFunction (x) {
 a = 'blah' // a gets reassigned.
}

console.log(a); // 5
myFunction(a);
console.log(a); // blah
// so the issue here, is the Variable X that we pass into the function - it cannot be reassigned. 


//// https://youtu.be/SCNFVzF75x8?t=321
const num = 12

function dcode(a) {
    a = 30;
    console.log(a); // 30
}

dcode(num);
console.log(num); // 12
// my thoughts: when function is invoked, 
// a = num = 12   - or a copies num's reference/value 
// in code block, a = 30  - a is now reassigned to something new. 

// the big issue i had was i originally had: num = a = 12
/* change your thought process to:
'variable a' = 'num' (copy of num) = 12
inside code block:
'variable a' = no assigned to something else. 'num' doesn't get touched' or is in fact even seen by the function.
*/
// https://www.codecademy.com/courses/introduction-to-javascript/lessons/objects/exercises/pass-by-reference
let spaceship = {
    homePlanet : 'Earth',
    color : 'red'
  };
  let tryReassignment = obj => {
    obj = {
      identified : false, 
      'transport type' : 'flying'
    }
    console.log(obj) // Prints {'identified': false, 'transport type': 'flying'}
   
  };
  tryReassignment(spaceship);
  console.log(spaceship); // returns unchanged
/* 
let spaceship = {object}  // memory ref 0x001
obj = 0x001 // obj now assigned to that memory ref
obj = new primative/nonprim - new changes inside function code and now assigned new memory ref.
spaceship variable unchanged. hell it's not even seen inside function.

"When we passed spaceship into that function, obj became a reference to the memory location of the spaceship object (obj = spaceship), but not to the spaceship variable (spaceship != obj). This is because the obj parameter of the tryReassignment() function is a VARIABLE in its own right. The body of tryReassignment() has no knowledge of the spaceship variable at all!"

People are simply replacing obj in the function w/ spaceship. And you can't do that.
--

Correct me if I'm wrong, but here's my understanding of function parameter reassignment of objects:

let spaceship = { old object }    // spaceship variable gets assigned to 0x00 memory reference with a value of { object }

function myFunction ( obj ) {
  obj = { new object }
}

Students are thinking the function just plugs the identifier 'spaceship' and it will overwrite 'obj' in the code. Or they could be thinking the memory reference 0x00 is plugged into the function and replaces all 'obj' variables. 

1) As the lesson stated, **'obj' is it's own variable**. So when we invoke the function, 'obj' looks up 'spaceship' and identifies it as an object and thus assigns itself to spaceship's memory reference at 0x00 and copies the value: 
  obj = 0x00 = { old object }

2) Inside the codeblock, the variable 'obj' is now **reassigned** to a new object, which also gives it a new memory reference 0x01:
  obj = 0x01 = { new object }

Inside the function console.log(obj)  is essentially console.log(0x01)
Outside the function console.log(spaceship) is still console.log(0x00)

*/




