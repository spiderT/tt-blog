// https://juejin.cn/post/6844903509934997511
// 1
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//   }, 1000);
// });
// const promise2 = promise1.then(() => {
//   throw new Error("error!!!");
// });

// console.log("promise1", promise1);
// console.log("promise2", promise2);

// setTimeout(() => {
//   console.log("promise3", promise1);
//   console.log("promise4", promise2);
// }, 2000);

// 打印顺序
// promise1 Promise {<pending>}
// promise2 Promise {<pending>}
// Uncaught (in promise) Error: error!!!
// promise3 Promise {<fulfilled>: "success"}
// promise4 Promise {<rejected>: Error: error!!!
//     at <anonymous>:7:9}

// 2
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("once");
    resolve("success");
  }, 1000);
});

const start = Date.now();
promise.then((res) => {
  console.log(1, res, Date.now() - start);
});
promise.then((res) => {
  console.log(2, res, Date.now() - start);
});
promise.then((res) => {
  console.log(3, res, Date.now() - start);
});

// 打印顺序
// once
// 1 success 1024
// 2 success 1025
// 3 success 1025
