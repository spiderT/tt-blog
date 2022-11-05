var imgs = document.querySelectorAll("img");

//用来判断bound.top<=clientHeight的函数，返回一个bool值
function isIn(el) {
  var bound = el.getBoundingClientRect();
  var clientHeight = window.innerHeight;
  return bound.top <= clientHeight;
}
//检查图片是否在可视区内，如果不在，则加载
function check() {
  Array.from(imgs).forEach(function (el) {
    if (isIn(el)) {
      loadImg(el);
    }
  });
}
function loadImg(el) {
  if (!el.src) {
    var source = el.dataset.src;
    el.src = source;
  }
}
window.onload = window.onscroll = function () {
  //onscroll()在滚动条滚动的时候触发
  check();
};
