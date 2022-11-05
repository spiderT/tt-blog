// 因为是3个数的乘积，只要一个6位数(3个正数，3个负数)的数组就可以把正数和负数的结果分别算出来。
// 解法如下: 先添加六个数到新数组里面，每次遍历的新数值都去判断最大的和最小的数是否可以替换，可替换就对其排序，直到遍历结束。用最后面两个（可能是负数）的数乘以第一个，去对比最大三个数相乘的结果，返回乘积更大的值。
function maximumProduct(nums) {
  let sum = 1,
    arr = [],
    len = nums.length;
  for (let i = 0; i < len; i++) {
    if (arr.length < 6) {
      arr[i] = nums[i];
    } else {
      if (nums[i] > arr[2]) {
        arr[2] = nums[i];
      }
      if (nums[i] < arr[3]) {
        arr[3] = nums[i];
      }
    }
    arr.sort((a, b) => b - a);
  }
  for (let i in arr) {
    if (i < 3) {
      sum *= arr[i];
    }
  }
  len = arr.length;
  if (len >= 3) {
    let sum2 = arr[len - 2] * arr[len - 1] * arr[0];
    sum = sum > sum2 ? sum : sum2;
  }
  console.log("arr", arr);
  return sum;
}

const nums1 = [-4, -3, -2, -1];
const nums2 = [-4, -3, -2, -1, 60, 5, 1, 20];
const nums3 = [1, 2, 3, 4, 5, 6];

const v1 = maximumProduct(nums1);
const v2 = maximumProduct(nums2);
const v3 = maximumProduct(nums3);

console.log("v1", v1); // -6
console.log("v2", v2); // 720
console.log("v3", v3); // 120
