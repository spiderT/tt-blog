function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map((v) => v.length)) }).map((v) => [])
  );
}

const arr = [
  ["a", 1, true],
  ["b", 2],
];

console.log(Unzip(arr)); // [["a", "b"], [1, 2], [true]]
