Array.prototype.forEachs = function (callback, thisArg) {
  let i = 0;
  while (i < this.length) {
    callback.call(thisArg, this[i], i, this);
    i++;
  }
};

const arr = [{ age: 1 }];

arr.forEachs((item, index, arr) => {
  item.age = 2;
  console.log(index);
  console.log(arr);
});

console.log(arr);
