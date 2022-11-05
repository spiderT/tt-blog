// 1. 在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window。
// 2. 通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身。

// 第1题
// let bar = {
//   myName: "极客邦",
//   test1: 1,
// };
// function foo() {
//   this.myName = "极客时间";
// }
// foo.call(bar);
// console.log(bar); // { myName: '极客时间', test1: 1 }


// 第2题
// 嵌套函数中的 this 不会从外层函数中继承
var myObj = {
  name : "极客时间", 
  showThis: function(){
    console.log(this) // { name: '极客时间', showThis: [Function: showThis] }
    function bar(){console.log(this)} // window
    bar() 
  }
}
myObj.showThis()
