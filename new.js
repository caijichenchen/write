function news() {
  const obj = {};
  const args = Array.from(arguments);
  obj.__proto__ = args[0].prototype;
  obj.call();
  return obj;
}
