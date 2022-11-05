function Count(arr = []) {
  return arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
}

const arr = [0, 1, 1, 2, 2, 2, "a", "b", "a"];
console.log(Count(arr)); // { '0': 1, '1': 2, '2': 3, a: 2, b: 1 }
