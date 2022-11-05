// 单词接龙
// 给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

// 每次转换只能改变一个字母。
// 转换过程中的中间单词必须是字典中的单词。
// 说明:

// 如果不存在这样的转换序列，返回 0。
// 所有单词具有相同的长度。
// 所有单词只由小写字母组成。
// 字典中不存在重复的单词。
// 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
// 示例:

// 输入:
const beginWord = "hit";
const endWord = "cog";
const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];

// 输出: 5

// 解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
//      返回它的长度 5。
// 来源: LeetCode第127题

// 如果每一个单词都是一个节点，那么只要和这个单词仅有一个字母不同，那么就是它的相邻节点。可以通过 BFS 的方式来进行遍历。
var ladderLength = function (beginWord, endWord, wordList) {
  // 两个单词在图中是否相邻
  const isSimilar = (a, b) => {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      if (a.charAt(i) !== b.charAt(i)) diff++;
      if (diff > 1) return false;
    }
    return true;
  };
  let queue = [beginWord];
  let index = wordList.indexOf(beginWord);
  if (index !== -1) wordList.splice(index, 1);
  let res = 2;
  while (queue.length) {
    let size = queue.length;
    while (size--) {
      let front = queue.shift();
      for (let i = 0; i < wordList.length; i++) {
        if (!isSimilar(front, wordList[i])) continue;
        if (wordList[i] === endWord) {
          return res;
        } else {
          queue.push(wordList[i]);
        }
        // wordList[i]已经成功推入，现在不需要了，删除即可
        // 这一步性能优化，相当关键，不然100%超时
        wordList.splice(i, 1);
        i--;
      }
    }
    // 步数 +1
    res += 1;
  }
  return 0;
};

const res = ladderLength(beginWord, endWord, wordList);

console.log("res", res);
