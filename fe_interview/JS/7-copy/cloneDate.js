Date.prototype.clone = function () {
  // valueOf方法对于：如果存在任意原始值，它就默认将对象转换为表示它的原始值
  return new Date(this.valueOf());
};

const date = new Date("2021-2-8");
const newDate = date.clone();

console.log(newDate);
