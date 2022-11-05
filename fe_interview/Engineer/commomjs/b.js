// 引用自定义的模块时，参数包含路径
const math = require("./a");
console.log(math)

const v1 = math.pow(2);
const v2 = math.plus(2, 3);

console.log(v1, v2);
