// https://jerryzou.com/posts/dive-into-deep-clone-in-javascript/
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/prototype

RegExp.prototype.clone = function () {
  const pattern = this.valueOf();
  console.log("pattern.source", pattern.source);
  console.log("pattern.global", pattern.global);
  console.log("pattern.lastIndex", pattern.lastIndex);
  let flags = "";
  // 是否开启全局匹配
  flags += pattern.global ? "g" : "";
  // 是否要忽略字符的大小写
  flags += pattern.ignoreCase ? "i" : "";
  // 是否开启多行模式匹配（影响 ^ 和 $ 的行为）
  flags += pattern.multiline ? "m" : "";
  const result = new RegExp(pattern.source, flags);
  // lastIndex 下次匹配开始的字符串索引位置。
  result.lastIndex = pattern.lastIndex;
  return result;
};

const reg = new RegExp(/111/, "g");
reg.lastIndex = 1;
const newReg = reg.clone();
console.log(newReg.lastIndex);
