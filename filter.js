Array.prototype.filters = function (callback, thisArg) {
  const len = this.length;
  let i = 0;
  const result = [];
  while (i < len) {
    const r = callback.call(thisArg, this[i], i, this);
    !!r && result.push(this[i]);
    i++;
  }
  return result;
};

// const a = [1, 2, 3];
const a = [{ age: 2 }, { age: 4 }];
const b = a.filters(item => {
  item.age++;
  // return item.age > 3;
  if (item.age > 3) {
    return item.age;
  }
});
console.log(a);
console.log(b);
