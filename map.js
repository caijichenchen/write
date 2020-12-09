Array.prototype.maps = function (callback, thisArg) {
  const len = this.length;
  let i = 0;
  const result = [];
  while (i < len) {
    const r = callback.call(thisArg, this[i], i, this);
    result[i] = r;
    i++;
  }
  return result;
};

// const a = [1, 2, 3];
const a = [{ age: 2 }, { age: 4 }];
const b = a.maps(item => {
  item.age++;
  return item;
});
console.log(a);
console.log(b);
