function Group(arr = [], key) {
  return key
    ? arr.reduce(
        (t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t),
        {}
      )
    : {};
}

const arr = [
  { area: "GZ", name: "YZW", age: 27 },
  { area: "GZ", name: "TYJ", age: 25 },
  { area: "SZ", name: "AAA", age: 23 },
  { area: "FS", name: "BBB", age: 21 },
  { area: "SZ", name: "CCC", age: 19 },
];

// 以地区area作为分组依据
console.log(Group(arr, "area")); 
// { GZ:
//   [ { area: 'GZ', name: 'YZW', age: 27 },
//     { area: 'GZ', name: 'TYJ', age: 25 } ],
//  SZ:
//   [ { area: 'SZ', name: 'AAA', age: 23 },
//     { area: 'SZ', name: 'CCC', age: 19 } ],
//  FS: [ { area: 'FS', name: 'BBB', age: 21 } ] }