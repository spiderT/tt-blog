var foo = function () {
  var a = 1, b = 2
  debugger
  var bar = function () {
    var b = 3, c = 4
    a =  b + c;
    debugger
    console.log('a1-', a, 'b1-', b, 'c1-', c);
  }
  bar()
  debugger
  console.log('a2-', a, 'b2-', b);
}
foo()


//a1- 7 b1- 3 c1- 4
//a2- 7 b2- 2
