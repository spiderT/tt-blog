function Difference(arr = [], oarr = []) {
  return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);
}

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 6];
console.log(Difference(arr1, arr2)); // [1, 4, 5]
