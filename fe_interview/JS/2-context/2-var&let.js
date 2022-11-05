// 第1题
var a = 10;
function say() {
  console.log(a);
  // var a = 20;
  let a = 20;
  console.log(a);
}
// 在函数执行过程中，JavaScript 会优先从当前的执行上下文中查找变量，由于变量提升，undefined
// say() // var a = 20; undefined  20
say(); // let a = 20; ReferenceError: Cannot access 'a' before initialization

// 第2题
var a = 2;
function add() {
  var b = 10;
  return a + b;
}
add(); // 12

// !!! 第3题
// 作用域链是由词法作用域决定的
// 词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域
// foo 和 bar 的上级作用域都是全局作用域，所以如果 foo 或者 bar 函数使用了一个它们没有定义的变量，那么它们会到全局作用域去查找。也就是说，词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。
function bar() {
  console.log(myName);
}
function foo() {
  var myName = "AA";
  bar();
}
var myName = "BB";
foo(); // BB


// 第4题
// 块级作用域中的变量查找
// 一个在当前作用域中不存在的变量，这时 JavaScript 引擎就需要按照作用域链在其他作用域中查找该变量

function bar() {
  var myName = "AA"
  let test1 = 100
  if (1) {
      let myName = "Chrome浏览器"
      console.log(test)
  }
}
function foo() {
  var myName = "BB"
  let test = 2
  {
      let test = 3
      bar()
  }
}
var myName = "CC"
let myAge = 10
let test = 1
foo() // 1





