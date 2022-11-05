let imgList = document.querySelectorAll("img"); // 获取页面中所有img对象

let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      // intersectionRatio 表示相交区域和目标元素的比例值
      entry.target.src = entry.target.dataset.src; // 图片进入进入可见区域， 则赋予data-src值给src属性
      observer.unobserve(entry.target); // 图片已加载， 解除观察
    }
  });
});
imgList.forEach((img) => {
  observer.observe(img); // 观察没一个图片对象
});
