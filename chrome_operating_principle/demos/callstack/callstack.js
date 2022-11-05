// function bar() {
//   console.log(myName);
// }
// function foo() {
//   var myName = "111";
//   bar();
// }
// var myName = "222";
// foo(); //222
// // foo 和 bar 的上级作用域都是全局作用域，所以如果 foo 或者 bar 函数使用了一个它们没有定义的变量，那么它们会到全局作用域去查找。也就是说，词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系。

// function bar() {
//   var myName = "极客世界";
//   let test1 = 100;
//   if (1) {
//     let myName = "Chrome浏览器";
//     console.log(test);
//   }
// }
// function foo() {
//   var myName = "极客邦";
//   let test = 2;
//   {
//     let test = 3;
//     bar();
//   }
// }
// var myName = "极客时间";
// let myAge = 10;
// let test = 1;
// foo();

var bar = {
  myName: "time.geekbang.com",
  printName: function () {
    console.log(myName);
  },
};
function foo() {
  let myName = "极客时间";
  return bar.printName;
}
let myName = "极客邦";
let _printName = foo();
_printName();
bar.printName();
