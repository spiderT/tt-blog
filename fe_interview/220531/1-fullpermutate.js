function fullpermutate(str) {
  const result = [];
  const len = str.length;
  if (len > 1) {
    for (let m = 0; m < len; m++) {
      //拿到当前的元素
      const left = str[m];
      //除当前元素的其他元素组合
      const rest = str.slice(0, m) + str.slice(m + 1, len);
      //上一次递归返回的全排列
      const preResult = fullpermutate(rest);

      //组合在一起
      for (let i = 0; i < preResult.length; i++) {
        const tmp = left + preResult[i];
        result.push(tmp);
      }
    }
  } else if (len == 1) {
    result.push(str);
  }
  return result;
}

const str1 = "abc";

console.log(fullpermutate(str1));
