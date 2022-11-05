const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};

const toUpperCase = function (x) {
  return x.toUpperCase();
};
const exclaim = function (x) {
  return x + "!";
};
const shout = compose(exclaim, toUpperCase);
const result = shout("send in the clowns");

console.log(result); // SEND IN THE CLOWNS!
