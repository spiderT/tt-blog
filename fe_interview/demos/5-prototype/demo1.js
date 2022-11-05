// function Student(name, grade) {
//   this.name = name;
//   this.grade = grade;
// }

// const stu = new Student("xiaoMing", 6);
// // Student 类型实例的原型，默认也是一个空对象
// console.log(stu.__proto__); // => Student {}





// const obj = { name: 'xiaoMing' };
// // 原型为空对象
// console.log(obj.__proto__); // => {}

// obj.__proto__ = 666;
// // 非对象和 null 不生效
// console.log(obj.__proto__); // => {}

// // 设置原型为对象
// obj.__proto__ = { a: 1 };
// console.log(obj.__proto__); // => { a: 1 }
// console.log(Reflect.getPrototypeOf(obj)); // => { a: 1 }






const obj = { name: 'xiaoming' };

obj.__proto__ = null;
// ! 为什么不是 null
console.log(obj.__proto__); // => undefined
// 说明确实将原型设置为 null 了
console.log(Reflect.getPrototypeOf(obj)); // => null

// 再次赋值为 null
obj.__proto__ = null;
// 黑人问号？？？咋不是之前的 undefined 呢？
console.log(obj.__proto__); // => null

obj.__proto__ = { a: 1 };
console.log(obj.__proto__); // => { a: 1 }   __proto__ 就像一个普通属性一样 obj.xxx = { a: 1 }
// 并没有将原型设置成功
console.log(Reflect.getPrototypeOf(obj)); // => null

Reflect.setPrototypeOf(obj, { b: 2 });
// __proto__ 被设置为 null 后，obj 的 __proto__ 属性和一个普通的属性没有区别
console.log(obj.__proto__); // => { a: 1 }
// 使用 Reflect.setPrototypeOf 是可以设置原型的
console.log(Reflect.getPrototypeOf(obj)); // => { b: 2 }
