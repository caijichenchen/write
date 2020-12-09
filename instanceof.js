class test {}

const a = new test();

console.log(a instanceof test);

function instanceofs(child, father) {
  // const is = father.
  console.log(child.__proto__);
  console.log(father.prototype);
  // 原型链  实例的隐式原型指向构造函数的现实原型
  const childVal = child.__proto__;
  const fatherVal = father.prototype;
  while (true) {
    if (childVal === null) return false;
    if (childVal === fatherVal) return true;
    childVal = childVal.__proto__;
    console.log(11);
  }
}

console.log(instanceofs(a, test));
