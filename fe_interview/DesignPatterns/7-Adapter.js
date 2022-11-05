// 数据格式转换的适配器, 对非数组的进行转换适配
function arrayAdapter(data) {
  if (typeof data !== "object") {
    return [];
  }

  if (Object.prototype.toString.call(data) === "[object Array]") {
    return data;
  }

  const result = [];

  for (let item in data) {
    if (data.hasOwnProperty(item)) {
      result.push(data[item]);
    }
  }

  return result;
}
