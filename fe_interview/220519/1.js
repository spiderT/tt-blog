// 有效括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。



 const isValid = function(s) {
  const stack = [];
  for(let i = 0; i < s.length; i++) {
      let ch = s[i];
      if(ch === '(' || ch === '[' || ch === '{') 
          stack.push(ch);
      if(!stack.length) return false;
      if(ch === ')' && stack.pop() !== '(') return false;
      if(ch === ']' && stack.pop() !== '[' ) return false;
      if(ch === '}' && stack.pop() !== '{') return false;
  }
  return stack.length === 0;
};

const isValid2 = function (s) {
  const map = {
    "(": -1,
    ")": 1,
    "[": -2,
    "]": 2,
    "{": -3,
    "}": 3,
  };
  const stack = [];
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

console.log(isValid(s1)); 
console.log(isValid(s2)); 


// console.log(isValid2(s1)); 
// console.log(isValid2(s2)); 