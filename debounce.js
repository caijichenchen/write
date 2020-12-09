// n秒内只执行最后一次
function debounce(fn, timeout) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, timeout);
  };
}
