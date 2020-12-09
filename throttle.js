// 每隔n秒触发一次
function throttle(fn, timeout) {
  // let last = new Date().getTime();
  // return function () {
  //   const now = new Date().getTime();
  //   if (now - last > timeout) {
  //     fn.apply(this, arguments);
  //     last = now;
  //   }
  // };
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, timeout);
  };
}

window.onscroll = throttle(() => {
  console.log(11);
}, 1000);
