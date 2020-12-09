var obj = { age: 1222 };

function test(arg) {
  console.log(this.age);
  console.log(arg);
}

const b = test.bind(obj, [1, 2]);
console.log(b);

Function.prototype.binds = function (context = window, args) {
  return;
};
