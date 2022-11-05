// Reflect对象一共有 13 个静态方法。
// • Reflect.apply(target, thisArg, args)
// • Reflect.construct(target, args)
// • Reflect.get(target, name, receiver)
// • Reflect.set(target, name, value, receiver)
// • Reflect.defineProperty(target, name, desc)
// • Reflect.deleteProperty(target, name)
// • Reflect.has(target, name)
// • Reflect.ownKeys(target)
// • Reflect.isExtensible(target)
// • Reflect.preventExtensions(target)
// • Reflect.getOwnPropertyDescriptor(target, name)
// • Reflect.getPrototypeOf(target)
// • Reflect.setPrototypeOf(target, prototype)

// 大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。

// 使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
const queuedObservers = new Set();

const observe = (fn) => queuedObservers.add(fn);
const observable = (obj) => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer) => observer());
  return result;
}

const person = observable({
  name: "张三",
  age: 20,
});

function print() {
  console.log(`${person.name}, ${person.age}`);
}

observe(print);
person.name = "李四"; // 李四, 20
person.age = 21; // 李四, 21
