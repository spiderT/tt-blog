// 字符串匹配及优化，两个字符串“ababceekabc” “abc” 找abc出现的第一个位置
// KMP算法，暴力肯定没分

// 1.两数之和

var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    //第一层循环
    const another = target - nums[i];
    if (map.has(another)) {
      return [map.get(another), i]; //存在的话返回两个数的下标
    } else {
      map.set(nums[i], i); //不存在map中就将当前元素和下标存入map
    }
  }
  return [];
};

// 扩展到15.三数之和
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      } else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};

// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// const nums = [2, 7, 11, 15],
//   target = 18;
// console.log(twoSum(nums, target));

// 20. 有效的括号

// https://leetcode.cn/problems/merge-sorted-array/solution/ni-xiang-shuang-zhi-zhen-he-bing-liang-g-ucgj/
// 88. 合并两个有序数组
// 示例 1：
// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 示例 2：

// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]

// 原地修改 ，将空间复杂度降低到 O(1)O(1)。

// 因为这样不需要使用额外的数组空间了，我们完全可以把 nums2nums2 也放入 nums1nums1 中。
// 原地修改时，为了避免从前往后遍历导致原有数组元素被破坏掉，我们要选择从后往前遍历！

// 所以，我们总共需要创建三个指针，两个指针用于指向 ums1ums1 和 nums2nums2 的初始化元素数量的末位，也就是分别指向 m-1m−1 和 n-1n−1 的位置，还有一个指针，我们指向 nums1nums1 数组末位即可。

var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;
  while (i >= 0 || j >= 0) {
    // if (i < 0) {
    //   nums1[k--] = nums2[j--];
    // } else if (j < 0) {
    //   nums1[k--] = nums1[i--];
    // } else if (nums1[i] < nums2[j]) {
    //   nums1[k--] = nums2[j--];
    // } else {
    //   nums1[k--] = nums1[i--];
    // }

    nums1[k--] = nums1[i] < nums2[j] ? nums2[j--] : nums1[i--];
  }
  return nums1;
};

const nums1 = [1, 2, 3, 0, 0, 0],
  m = 3,
  nums2 = [2, 5, 6],
  n = 3;

// const nums1 = [1],
//   m = 1,
//   nums2 = [],
//   n = 0;

console.log(merge(nums1, m, nums2, n));

// 226. 翻转二叉树
var invertTree = function (root) {
  if (root === null) {
    return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};

// 415.大数相加

var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
  const ans = [];
  while (i >= 0 || j >= 0) {
    const x = i >= 0 ? Number(num1[i]) : 0;
    const y = j >= 0 ? Number(num2[j]) : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join("");
};

// console.log(addStrings("456", "77"));

// 扩展到43.大数相乘

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (isNaN(num1) || isNaN(num2)) return "";
  if (num1 === "0" || num2 === "0") return "0";

  let l1 = num1.length,
    l2 = num2.length;

  let result = [];

  for (let i = l1 - 1; i >= 0; i--) {
    for (let j = l2 - 1; j >= 0; j--) {
      let index1 = i + j;
      let index2 = i + j + 1;

      let product = num1[i] * num2[j] + (result[index2] || 0);
      result[index2] = product % 10;
      result[index1] = Math.floor(product / 10) + (result[index1] || 0);
    }
  }
  return result.join("").replace(/^0+/, "");
};

console.log(multiply("456", "27"));
// 455.分发饼干
var findContentChildren = function (g, s) {
  const gLen = g.length;
  const sLen = s.length;
  if (!gLen || !sLen) {
    return 0;
  }
  g.sort((a, b) => b - a);
  s.sort((a, b) => b - a);
  let count = 0;
  let i = 0;
  let j = 0;
  while (i < sLen && j < gLen) {
    if (s[i] >= g[j]) {
      count++;
      i++;
    }
    j++;
  }
  return count;
};

// 704.二分查找
// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4
var search = function (nums, target) {
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const num = nums[mid];
    if (num === target) {
      return mid;
    } else if (num > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};
