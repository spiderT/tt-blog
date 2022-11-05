const person = {
  name: "person1",
  say() {
    return this.name;
  },
};
const person2 = {
  name: "person2",
};
const res = person.say.call(person2);
console.log(res); // person2

// func.call(thisArg, param1, param2, ...)
// func 是要调用的函数，thisArg 一般为 this 所指向的对象，后面的 param1、2 为函数 func 的多个参数，如果 func 不需要参数，则后面的 param1、2 可以不写。
Function.prototype.myCall = function (context) {
  // 当函数作为对象的方法调用时，函数中的 this 就是该对象；
  // this指向调用myCall的对象
  console.log("this", this); // ƒ say(){}
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || window;
  context.fn = this;
  console.log("context", context); // {name: "person3", fn: ƒ}
  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

const person3 = {
  name: "person3",
};
const res3 = person.say.myCall(person3);
console.log(res3); // person3
