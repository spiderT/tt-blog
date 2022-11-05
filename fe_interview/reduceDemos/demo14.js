const people = [
  { area: "GZ", name: "YZW", age: 27 },
  { area: "SZ", name: "TYJ", age: 25 },
];
const map = people.reduce((t, v) => {
  const { name, ...rest } = v;
  t[name] = rest;
  return t;
}, {});

console.log(map);
// { YZW: { area: 'GZ', age: 27 }, TYJ: { area: 'SZ', age: 25 } }
