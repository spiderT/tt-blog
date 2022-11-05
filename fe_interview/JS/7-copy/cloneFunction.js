function cloneFunction(func) {
  // 理解 new Function 创建函数方法: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  console.log('func.prototype', func.prototype);
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    // console.log("param", param);
    // console.log("body", body);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

const a = function (x, y) {
  return x + y;
};

const clone = cloneFunction(a)(2, 3);

console.log(clone);
