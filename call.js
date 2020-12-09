Function.prototype.calls = function (context = window, ...arg) {
  const fn = Symbol("fn");
  context[fn] = this;
  console.log(this);
  context[fn](...arg);
  delete context[fn];
};

const test = function (a) {
  console.log(this);
  console.log(a);
};

const obj = { age: 1 };

const b = test.calls(obj, 1);
console.log(b);
console.log(obj);
