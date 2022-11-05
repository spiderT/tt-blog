let a = {};
let fn = function () {
  console.log(this);
};
fn.bind().bind(a)(); // => window
