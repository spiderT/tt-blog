function throttle(fn, delay = 1000) {
  let flag = true; // 是否已有定时器
  let timer = null;
  return function (...args) {
    if (!flag) return;
    flag = false;
    clearTimeout(timer); // 清除
    timer = setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}
// 处理函数
function handle() {
  console.log(Math.random());
}
// 滚动事件
window.addEventListener("scroll", throttle(handle));
