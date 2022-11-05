// [-1,-2,8,9,-10] 求最大子段和

var maxSubArray = function (nums) {
  let pre = 0,
    maxAns = nums[0];
  nums.forEach((x) => {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
    console.log(pre,maxAns)

  });
  return maxAns;
};

console.log(maxSubArray([-1, -2, 8, 9, 1, -10]));
