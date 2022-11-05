// 1. helloGenerator
// function* helloGenerator() {
//   yield "hello";
//   yield "world";
//   return "ending";
// }

// const hw = helloGenerator();

// const v1 = hw.next();
// const v2 = hw.next();
// const v3 = hw.next();
// const v4 = hw.next();
// const v5 = hw.next();
// console.log("v1", v1); // { value: 'hello', done: false }
// console.log("v2", v2); // { value: 'world', done: false }
// console.log("v3", v3); // { value: 'ending', done: true }
// console.log("v4", v4); // { value: undefined, done: true }
// console.log("v5", v5); // { value: undefined, done: true }

// 2. Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
// function* f() {
//   console.log("执行了！");
// }
// var generator = f();
// generator.next(); // 函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。

// 3. 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
// var myIterable = {};
// myIterable[Symbol.iterator] = function* () {
//   yield 1;
//   yield 2;
//   yield 3;
// };

// const result = [...myIterable]; 
// console.log(result) // [1, 2, 3]




// 4. Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
// function* gen(){
//   // some code
// }

// var g = gen();

// console.log(g[Symbol.iterator]() === g)  // true


// 5. next 方法的参数
// yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
// function* f() {
//   for(var i = 0; true; i++) {
//     var reset = yield i;
//     if(reset) { i = -1; }
//   }
// }

// var g = f();
// // 如果next方法没有参数，每次运行到yield表达式，变量reset的值总是undefined。当next方法带一个参数true时，变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。
// console.log(g.next()) // { value: 0, done: false }
// console.log(g.next()) // { value: 1, done: false }
// console.log(g.next()) // { value: 2, done: false }
// console.log(g.next('a')) // { value: 0, done: false }
// console.log(g.next()) // { value: 1, done: false }




// 6. next 方法的参数
// Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
// function* foo(x) {
//   var y = 2 * (yield (x + 1));
//   var z = yield (y / 3);
//   return (x + y + z);
// }

// var a = foo(5);
// console.log(a.next()) // Object{value:6, done:false}
// console.log(a.next()) // Object{value:NaN, done:false}
// console.log(a.next()) // Object{value:NaN, done:true}

// var b = foo(5);
// console.log(b.next()) // { value:6, done:false }
// console.log(b.next(12)) // { value:8, done:false }
// console.log(b.next(13)) // { value:42, done:true }


// 7. for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。
// function* foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   return 6;
// }
// // 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
// for (let v of foo()) {
//   console.log(v);
// }
// // 1 2 3 4 5



//  8. 无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
// let jane = { first: 'Jane', last: 'Doe' };

// for (let [key, value] of jane) {
//   console.log(`${key}: ${value}`); //  TypeError: jane is not iterable
// }

function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

