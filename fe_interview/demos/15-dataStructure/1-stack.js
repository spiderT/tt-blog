class Stack {
  constructor() {
    this.stack = [];
  }
  push(item) {
    this.stack.push(item);
  }
  pop() {
    this.stack.pop();
  }
  peek() {
    return this.stack[this.getCount() - 1];
  }
  getCount() {
    return this.stack.length;
  }
  isEmpty() {
    return this.getCount() === 0;
  }
}

// 匹配括号，可以通过栈的特性来完成这道题目
const isValid = function (s) {
  let map = {
    "(": -1,
    ")": 1,
    "[": -2,
    "]": 2,
    "{": -3,
    "}": 3,
  };
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < 0) {
      stack.push(s[i]);
    } else {
      let last = stack.pop();
      if (map[last] + map[s[i]] !== 0) return false;
    }
  }
  if (stack.length > 0) return false;
  return true;
};

const s1 = "[()]{}";
const s2 = "([)]";

console.log(isValid(s1)); // true
console.log(isValid(s2)); // false
