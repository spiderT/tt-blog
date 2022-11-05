// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/

// 17. 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 示例 1：
// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

// 输入：digits = ""
// 输出：[]

// 输入：digits = "2"
// 输出：["a","b","c"]

var letterCombinations = function (digits) {
  let phone = {
    //电话数字到字母的映射
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  let arr = [];
  for (let i of digits) {
    arr = merge(arr, phone[i]);
  }
  return arr;
};

const merge = (arr, str) => {
  //将str每个字符与arr已有字符串进行组合
  let newArr = [];
  if (arr.length === 0) {
    //arr是空数组
    for (let i of str) {
      newArr.push(i);
    }
  } else {
    //非空数组
    for (let i of arr) {
      //将arr已有字符串与str组合，存入newArr
      for (let j of str) {
        newArr.push(i + j);
      }
    }
  }
  return newArr;
};
