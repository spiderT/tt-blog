// 蹦床函数（trampoline）可以将递归执行转为循环执行
// 接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，
// 而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}


function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}

// 使用蹦床函数执行sum，就不会发生调用栈溢出
trampoline(sum(1, 100000))
// 100001


// 尾递归优化
// tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，
// 这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，
// 总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，
// 而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。
function tco(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

var sum = tco(function(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  }
  else {
    return x
  }
});

sum(1, 100000)
// 100001
