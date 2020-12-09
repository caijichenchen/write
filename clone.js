/**
 * 深拷贝
 */
function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (typeof value === "object") {
    let obj = {};
    for (let key in value) {
      obj[key] = clone(value[key]);
    }
    return obj;
  } else {
    return value;
  }
}

const a = {
  age: 1,
  f: [2]
};

const b = clone(a);
b.age = 2;
b.f.push(3);
console.log(b);
console.log(a);
