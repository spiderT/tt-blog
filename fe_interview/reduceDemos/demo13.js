function GetKeys(obj = {}, keys = []) {
  return Object.keys(obj).reduce(
    (t, v) => (keys.includes(v) && (t[v] = obj[v]), t),
    {}
  );
}

const target = { a: 1, b: 2, c: 3, d: 4 };
const keyword = ["a", "d"];
console.log(GetKeys(target, keyword)); // { a: 1, d: 4 }
