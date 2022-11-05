function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), []);
}

const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
console.log(Flat(arr)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
