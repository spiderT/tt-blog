var myClosure = (function outerFunction() {
  var hidden = 1;

  return {
    inc: function innerFunction() {
      return hidden++;
    },
  };
})();

console.log(myClosure.inc()); // 1
console.log(myClosure.inc()); // 2
console.log(myClosure.inc()); // 3

