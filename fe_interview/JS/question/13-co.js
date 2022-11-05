// https://github.com/tj/co/blob/master/index.js

// 首先生成一个迭代器，然后执行一遍 next()，得到的 value 是一个 Promise 对象，Promise.then() 里面再执行 next()。当然这只是一个原理性的演示，很多错误处理和循环调用 next() 的逻辑都没有写出来。https://segmentfault.com/a/1190000002732081
function co(gen) {
  var it = gen();
  var ret = it.next();
  ret.value.then(function (res) {
    it.next(res);
  });
}
function sayhello() {
  return Promise.resolve("hello").then(function (hello) {
    console.log(hello);
  });
}
co(function* helloworld() {
  yield sayhello();
  console.log("world");
});
