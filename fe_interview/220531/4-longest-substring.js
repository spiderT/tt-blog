// https://leetcode.cn/problems/longest-substring-without-repeating-characters/

// 3. 无重复字符的最长子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

var lengthOfLongestSubstring = function (s) {
  let res = 0,
    temp = [];
  for (let i = 0; i < s.length; i++) {
    if (temp.indexOf(s[i]) == -1) {
      //数组中无被遍历的值
      temp.push(s[i]); //将不重复的值去除
    } else {
      temp.shift(); //因为有重复值出现，去除第一个元素
    }
    // console.log('temp',temp);
    res = Math.max(res, temp.length); //Math.max(a, b)选出两个值中较大的那个值
  }
  return res;
};

// const s = "abcabcbb";
const s = "bbbb";
console.log(lengthOfLongestSubstring(s));
