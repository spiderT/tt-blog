// 1. get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
// class MyClass {
//   constructor() {
//     // ...
//   }
//   get prop() {
//     return "getter";
//   }
//   set prop(value) {
//     console.log("setter: " + value);
//   }
// }

// let inst = new MyClass();

// inst.prop = 123; // setter: 123
// console.log(inst.prop); // 'getter'



// 2. Class 的静态方法
// 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。 

// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }

// Foo.classMethod() // 'hello'

// var foo = new Foo();
// foo.classMethod()// TypeError: foo.classMethod is not a function



// 如果静态方法包含this关键字，这个this指的是类，而不是实例。
// class Foo {
//   static bar () {
//     this.baz();
//   }
//   static baz () {
//     console.log('hello'); // 静态方法可以与非静态方法重名。
//   }
//   baz () {
//     console.log('world');
//   }
// }

// Foo.bar() // hello


// 3. 父类的静态方法，可以被子类继承。
// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }

// class Bar extends Foo {
// }

// Bar.classMethod() // 'hello'



// 4. 静态方法也是可以从super对象上调用的。
// class Foo {
//   static classMethod() {
//     return 'hello';
//   }
// }

// class Bar extends Foo {
//   static classMethod() {
//     return super.classMethod() + ', too';
//   }
// }

// Bar.classMethod() // "hello, too"



// 5. 类的静态属性
// 类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。
// class MyClass {
//   static myStaticProp = 42;

//   constructor() {
//     console.log(MyClass.myStaticProp); // 42
//   }
// }


// 6. new.target 属性
// function Person(name) {
//   if (new.target !== undefined) {
//     this.name = name;
//   } else {
//     throw new Error('必须使用 new 命令生成实例');
//   }
// }

// // 另一种写法
// function Person(name) {
//   if (new.target === Person) {
//     this.name = name;
//   } else {
//     throw new Error('必须使用 new 命令生成实例');
//   }
// }

// var person = new Person('张三'); // 正确
// var notAPerson = Person.call(person, '张三');  // 报错


// 7. Class 内部调用new.target，返回当前 Class。
// 子类继承父类时，new.target会返回子类。


// 8. extends关键字实现继承
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
// class Point { /* ... */ }

// class ColorPoint extends Point {
//   constructor() {
//   }
// }

// let cp = new ColorPoint(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor


// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。



// 9. Object.getPrototypeOf方法可以用来从子类上获取父类。因此，可以使用这个方法判断，一个类是否继承了另一个类。


// 10. super这个关键字，既可以当作函数使用，也可以当作对象使用。
// 10.1. super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。
// 10.2. super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。
// class A {
//   p() {
//     return 2;
//   }
// }

// class B extends A {
//   constructor() {
//     super();
//     console.log(super.p()); // 2
//   }
// }

// let b = new B();

// class A {
//   constructor() {
//     this.p = 2;
//   }
// }

// class B extends A {
//   get m() {
//     return super.p;
//   }
// }

// let b = new B();
// console.log(b.m) // undefined






// 10.3. ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
// class A {
//   constructor() {
//     this.x = 1;
//   }
//   print() {
//     console.log(this.x);
//   }
// }

// class B extends A {
//   constructor() {
//     super();
//     this.x = 2;
//   }
//   m() {
//     // super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B的实例，导致输出的是2，而不是1
//     super.print();
//   }
// }

// let b = new B();
// b.m() // 2




// 10.4. 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
// class A {
//   constructor() {
//     this.x = 1;
//   }
//   // x(){
//   //   console.log('123')
//   // }
// }


// class B extends A {
//   constructor() {
//     super();
//     this.x = 2;
//     super.x = 3;
//     console.log(super.x); // undefined       当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
//     console.log(this.x); // 3                super.x赋值为3，这时等同于对this.x赋值为3。
//   } 
// }

// let b = new B();



// 10.5. 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
// class Parent {
//   static myMethod(msg) {
//     console.log('static', msg);
//   }

//   myMethod(msg) {
//     console.log('instance', msg);
//   }
// }

// class Child extends Parent {
//   static myMethod(msg) {
//     super.myMethod(msg);
//   }

//   myMethod(msg) {
//     super.myMethod(msg);
//   }
// }

// Child.myMethod(1); // static 1

// var child = new Child();
// child.myMethod(2); // instance 2




// 11. 类的 prototype 属性和__proto__属性
//  (1) 子类的__proto__属性，表示构造函数的继承，总是指向父类。
// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

// class A {
// }

// class B extends A {
// }

// B.__proto__ === A // true
// B.prototype.__proto__ === A.prototype // true


// // 类的继承是按照下面的模式实现的。
// // B 的实例继承 A 的实例
// Object.setPrototypeOf(B.prototype, A.prototype);

// // B 继承 A 的静态属性
// Object.setPrototypeOf(B, A);

// const b = new B();


// 12. 实例的 __proto__ 属性
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。












