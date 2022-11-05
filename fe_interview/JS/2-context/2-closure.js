// 在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。
// 当前执行上下文–>foo 函数闭包–> 全局执行上下文”的顺序来查找 myName 变量.
// function foo() {
//   var myName = "AA"
//   let test1 = 1
//   const test2 = 2
//   var innerBar = {
//       getName:function(){
//           console.log(test1)
//           return myName
//       },
//       setName:function(newName){
//           myName = newName
//       }
//   }
//   return innerBar
// }
// var bar = foo()
// bar.setName("BB")
// bar.getName()
// console.log(bar.getName()) // 1 1 BB

var bar = {
  myName: "00",
  printName: function () {
    console.log(myName);
  },
};
function foo() {
  let myName = "AA";
  return bar.printName;
}
let myName = "BB";
let _printName = foo();
_printName(); // BB
bar.printName(); // BB
