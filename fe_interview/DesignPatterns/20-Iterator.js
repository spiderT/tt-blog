// 封装 对象和数组的遍历
function each(obj, cb) {
  let value;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; ++i) {
      value = cb.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  } else {
    for (let i in obj) {
      value = cb.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  }
}