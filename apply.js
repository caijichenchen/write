var obj = { age: 1222 };

function test(arg) {
  console.log(this);
  console.log(this.age);
  console.log(arg);
}

test.apply(obj, [1, 2]);

Function.prototype.applys = function (context = window, arg) {
  const fn = Symbol("fn");
  context[fn] = this;
  context[fn](...arg);
  delete context[fn];
};

test.applys(obj, [1, 2]);
