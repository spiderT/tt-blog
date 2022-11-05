// 二分查找
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = parseInt((left + right) / 2);
    const midVal = nums[mid];
    if (midVal === target) return mid;
    if (midVal > target) right--;
    if (midVal < target) left++;
  }
  return -1;
};

const res = search([1,2,3,4], 3)

console.log('res', res);

// 求平方根
// 使用二分查找，取左右两个数的中间值作为游标去寻找最接近的平方根数，当左边的数大于右边的数时，返回右边的数减1当有小数点的话向下取整
function sqrt(x) {
  let left = 0,
    right = x,
    mid;
  // 设置精度
  while (left - right <= 0) {
    // console.log(right);
    mid = Math.ceil((left + right) / 2);
    if (mid * mid == x) return mid;
    if (mid * mid < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return right;
}

const v = 9;
console.log("res2", sqrt(v));
