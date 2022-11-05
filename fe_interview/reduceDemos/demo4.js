function Fill(arr = [], val = "", start = 0, end = arr.length) {
  if (start < 0 || start >= end || end > arr.length) return arr;
  return [
    ...arr.slice(0, start),
    ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
    ...arr.slice(end, arr.length),
  ];
}

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
console.log(Fill(arr, "aaa", 2, 5)); // [0, 1, "aaa", "aaa", "aaa", 5, 6, 7, 8]
