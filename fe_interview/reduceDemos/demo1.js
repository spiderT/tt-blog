function Reverse(arr = []) {
  return arr.reduceRight((t, v) => (t.push(v), t), []);
}

const value = Reverse([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]
console.log(value);
