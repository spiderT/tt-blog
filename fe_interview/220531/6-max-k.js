var findKthLargest = function (nums, k) {
  const len = nums.length;
  for (let i = len; i > len - k - 1; i--) {
    for (let j = 0; j < i; j++) {
      // console.log(i, j) //15
      if (nums[j] > nums[i]) {
        [nums[j], nums[i]] = [nums[i], nums[j]];
      }
    }
  }
  console.log(nums);
  return nums[len - k];
};

// 输入: [3,2,1,5,6,4] 和 k = 2
// 输出: 5

// 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
// 输出: 4

// const nums = [3, 2, 1, 5, 6, 4],
//   k = 2;
const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6],
  k = 4;

console.log(findKthLargest(nums, k));
