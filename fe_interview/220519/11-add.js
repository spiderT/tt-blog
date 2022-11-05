// 写个add函数, 奇数次执行输出1，偶数次执行输出0 https://juejin.cn/post/7100026436072767525
// add() 1
// add() 0
// add() 1
// add() 0
function fn() {
  let count = 0;
  //这是个闭包
  return () => {
    count++;
    if (count % 2 === 0) {
      return console.log(1);
    }
    console.log(0);
  };
}
const add = fn();
add(); // 1
add(); // 0
add(); // 1
add(); // 0

// function* foo() {
//   while (true) {
//     yield console.log("1");
//     yield console.log("0");
//   }
// }
// let it = foo();
// function add() {
//   it.next();
// }
// add();
// add();
// add();
