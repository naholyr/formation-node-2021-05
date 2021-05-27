"use strict";

const object = {
  name: "Toto",

  // hello: function() {
  hello() {
    console.log("Hello, %s", this.name);
  },

  helloAsync() {
    setTimeout(() => {
      this.hello();
    }, 1000);
  },
};

object.helloAsync();

/*
const object = {
  name: "Toto",
  hello: function () {
    console.log("Hello, %s", this.name);
  }.bind({ name: "Bidule" }),
};

object.hello = object.hello.bind(object);

const object2 = {};
object2.name = "John";
object2.hi = object.hello;
object2.hi();
*/

// object.hello.call({ name: "Tutu" });

/*
function hello() {
  console.log("Hello, %s", this.name);
}

hello.call({ name: "Tutu" });
*/

/*
const object = {};
object.name = "Toto";
object.hi = hello;
object.hi();
*/

/*
const s = function () {
  return 42;
};
s.hi = hello;
s.hi();
*/

// hello(); "Cannot read property 'name' of undefined"
