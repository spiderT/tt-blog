const compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
}

// 非 pointfree，因为提到了数据：word
const snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

// pointfree
const toLowerCase = function (x) {
  return x.toUpperCase()
}
const replace = function () {

}

const snakeCase2 = compose(replace(/\s+/ig, '_'), toLowerCase);

const str = 'A B C'

console.log(snakeCase(str));
console.log(snakeCase2(str));
