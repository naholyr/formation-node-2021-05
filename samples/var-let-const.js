"use strict";

// VAR

function toto() {
  var x = 0;

  if (x === 2) {
    var y = 2;
  }

  console.log(y); // undefined
}

// Hoisting
/*
function toto() {
  var x, y;

  x = 0;

  if (x === 2) {
    y = 2;
  }

  console.log(y); // 2
}
*/

// toto();

// LET/CONST

function tata() {
  let x = 2;

  if (x === 2) {
    let y = 2;
  }

  console.log(y); // undefined
}

// tata();

const o = Object.freeze({ x: 42, o: { y: 1 } });
o.o.y = 43;

console.log(o);

const mutableArray = [];
// 10 lignes
mutableArray.push(1, 2, 3);
console.log(mutableArray);
