// https://leetcode.cn/problems/largest-rectangle-in-histogram/
// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

// 输入：heights = [2,1,5,6,2,3]
// 输出：10

// 输入： heights = [2,4]
// 输出： 4

// 思路：准备单调递增栈存放数组下标，因为这样可以从栈顶找到左边第一个比自己小的下标，这样从当前下标出发到第一个比自己小的柱子的下标就是矩形面积的宽度，然后在乘当前柱子的高度就是面积，如果当前柱子大于栈顶的下标对应的柱子高度，就入栈，否则不断出栈，计算栈顶的柱子所能形成的矩形面积，然后更新最大矩形面积
// 复杂度：时间复杂度O(n)，n是heights的长度，数组里每个元素尽出栈一次。空间复杂度O(n)，栈空间最多为n

const largestRectangleArea = (heights) => {
  let maxArea = 0;
  const stack = []; //单调递增栈 注意栈存的时下标
  heights = [0, ...heights, 0]; //在heights数组前后增加两个哨兵 用来清零单调递增栈里的元素
  for (let i = 0; i < heights.length; i++) {
    //当前元素对应的高度小于栈顶元素对应的高度时
    while (heights[i] < heights[stack[stack.length - 1]]) {
      const stackTopIndex = stack.pop(); //出栈
      maxArea = Math.max(
        //计算面积 并更新最大面积
        maxArea,
        heights[stackTopIndex] * (i - stack[stack.length - 1] - 1) //高乘宽
      );
    }
    stack.push(i); //当前下标加入栈
  }
  return maxArea;
};

const heights = [2, 1, 5, 6, 2, 3];
// const heights = [2,4]

console.log(largestRectangleArea(heights));
