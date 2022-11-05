// 求一组数据的逆序对个数
// 过程：先把数组分割成子数组，先统计出子数组内部的逆序对的数目，然后再统计出两个相邻子数组之间的逆序对的数目。在统计逆序对的过程中，还需要对数组进行排序。如果对排序算法很熟悉，我们不难发现这个过程实际上就是归并排序
function InversePairs(data = []) {
  let len = data.length;
  if (len === 0) return 0;
  const copy = data.concat([]);
  let count = InversePairsHelp(data, copy, 0, len - 1);
  return count;
  function InversePairsHelp(data, copy, start, end) {
    if (start === end) {
      copy[start] = data[start];
      return 0;
    }
    let mid = Math.floor((end - start) / 2);
    let left = InversePairsHelp(copy, data, start, start + mid);
    let right = InversePairsHelp(copy, data, start + mid + 1, end);
    let i = start + mid;
    let j = end;
    let count = 0;
    let indexCopy = end;
    while (i >= start && j >= start + mid + 1) {
      if (data[i] > data[j]) {
        copy[indexCopy--] = data[i--];
        count = count + j - start - mid;
      } else {
        copy[indexCopy--] = data[j--];
      }
    }
    for (; i >= start; i--) copy[indexCopy--] = data[i];
    for (; j >= start + mid + 1; j--) copy[indexCopy--] = data[j];
    return left + right + count;
  }
}

console.log(InversePairs([2, 4, 3, 1, 5, 6])); // 4 (2,1) (4,3) (4,1) (3,1)
// console.log(InversePairs([2, 4, 3, 1, 5, 6, 17]));
// console.log(InversePairs([2, 4, 3, 1, 5, 6, 17, 18]));
