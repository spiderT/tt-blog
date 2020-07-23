// 如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
const obj = {
  get foo() {},
  set foo(x) {}
};

// obj.foo.name
// TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(descriptor.get.name) // "get foo"
console.log(descriptor.set.name) // "set foo"


// 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
const key1 = Symbol('description');
const key2 = Symbol();
let obj2 = {
  [key1]() {},
  [key2]() {},
};
console.log(obj2[key1].name) // "[description]"
console.log(obj2[key2].name) // ""