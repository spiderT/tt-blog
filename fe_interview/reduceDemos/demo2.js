function Chunk(arr = [], size = 1) {
  return arr.length
    ? arr.reduce(
        (t, v) => (
          t[t.length - 1].length === size
            ? t.push([v])
            : t[t.length - 1].push(v),
          t
        ),
        [[]]
      )
    : [];
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(Chunk(arr, 2)); // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9 ] ]
console.log(Chunk(arr, 3)); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
