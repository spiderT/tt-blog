
// 不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。
function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}


// 尾调用不一定出现在函数尾部，只要是最后一步操作即可，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}