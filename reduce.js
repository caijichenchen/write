Array.prototype.reduces = function (callback, firstValue) {
  const len = this.length;
  let i = 0;
  let result = firstValue || this[0];
  while (i < len) {
    result = callback(result, this[i], i, this);
    i++;
  }
  return result;
};

const a = [1, 2];
const c = a.reduce((prev, next) => {
  return prev + next;
}, 9);
console.log(c);
