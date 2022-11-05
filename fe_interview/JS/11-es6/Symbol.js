// 1. 可以接受一个字符串作为参数，表示对 Symbol 实例的描述
// let s1 = Symbol('foo');
// console.log(s1) // Symbol(foo)
// console.log(s1.toString()) // "Symbol(foo)"

// 2. 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
// const obj = {
//   toString() {
//     return 'abc';
//   }
// };
// const sym = Symbol(obj);
// console.log(sym) // Symbol(abc)

// const obj = {
//   a:1
// };
// const sym = Symbol(obj);
// console.log(sym) // Symbol([object Object])

// 3. Symbol 值不能与其他类型的值进行运算，会报错。
// let sym = Symbol('My symbol');
// console.log("your symbol is " + sym)
// // TypeError: can't convert symbol to string
// console.log(`your symbol is ${sym}`)
// // TypeError: can't convert symbol to string

// 4. 作为属性名的 Symbol: 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
// let mySymbol = Symbol();

// // 第一种写法
// let a1 = {};
// a1[mySymbol] = 'Hello!'; // 不能用点运算符

// // 第二种写法
// let a2 = {
//   [mySymbol]: 'Hello!' // 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
// };

// // 第三种写法
// let a3 = {};
// Object.defineProperty(a3, mySymbol, { value: 'Hello!' });

// // 以上写法都得到同样结果
// a[mySymbol] // "Hello!"

// 5. Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
// const obj = {};
// let foo = Symbol("foo");
// Object.defineProperty(obj, foo, {
//   value: "foobar",
// });

// for (let i in obj) {
//   console.log(i); // 无输出
// }

// console.log(Object.getOwnPropertyNames(obj)) // []
// console.log(Object.getOwnPropertySymbols(obj)) // [Symbol(foo)]
// // Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
// console.log(Reflect.ownKeys(obj)) // [Symbol(foo)]

// 6. 使用同一个 Symbol 值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值
// let s1 = Symbol.for('foo');
// let s2 = Symbol.for('foo');

// console.log(s1 === s2) // true
// console.log(Symbol("bar") === Symbol("bar")) // false
// // ! Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。

// 7. Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
// let s1 = Symbol.for("foo");
// console.log(Symbol.keyFor(s1)) // "foo"
// let s2 = Symbol("foo");
// console.log(Symbol.keyFor(s2)) // undefined

// 8. Symbol.for为 Symbol 值登记的名字，是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。
// iframe = document.createElement('iframe');
// iframe.src = String(window.location);
// document.body.appendChild(iframe);
// iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo') // true

// 9. 内置的 Symbol 值: 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

// 9.1. 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)。
// class MyClass {
//   [Symbol.hasInstance](foo) {
//     return foo instanceof Array;
//   }
// }

// console.log([1, 2, 3] instanceof new MyClass()); // true

// 9.2. 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
// let arr1 = ['c', 'd'];
// console.log(['a', 'b'].concat(arr1, 'e')) // ['a', 'b', 'c', 'd', 'e']

// let arr2 = ['c', 'd'];
// arr2[Symbol.isConcatSpreadable] = false;   // 不能展开
// console.log(['a', 'b'].concat(arr2, 'e')) // ['a', 'b', ['c','d'], 'e']

// 类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true，才可以展开。
// let obj = {length: 2, 0: 'c', 1: 'd'};
// ['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

// obj[Symbol.isConcatSpreadable] = true;
// ['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']

// !! arguments 是不是可以用
// function a() {
//   console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
//   console.log([].concat(arguments)); // [ [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 } ]
//   arguments[Symbol.isConcatSpreadable] = true;
//   console.log([].concat(arguments)); // [ 1, 2, 3, 4 ]
// }

// a(1, 2, 3, 4);


// 9.3. 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
// 主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例。
// class MyArray extends Array {
//   static get [Symbol.species]() { return Array; }
// }

// const a = new MyArray();
// const b = a.map(x => x);

// b instanceof MyArray // false
// b instanceof Array // true


// 9.4. 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
// String.prototype.match(regexp)
// // 等同于
// regexp[Symbol.match](this)
// class MyMatcher {
//   [Symbol.match](string) {
//     return 'hello world'.indexOf(string);
//   }
// }
// 'e'.match(new MyMatcher()) // 1



// 9.5. 对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
// const x = {};
// x[Symbol.replace] = (...s) => console.log(s);

// 'Hello'.replace(x, 'World') // ["Hello", "World"]



// 9.6. 对象的Symbol.search属性，指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。

// 9.7. 对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。

// 9.8. 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
// const myIterable = {};
// myIterable[Symbol.iterator] = function* () {
//   yield 1;
//   yield 2;
//   yield 3;
// };

// console.log([...myIterable]) // [1, 2, 3]


// 9.9. 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
// • Number：该场合需要转成数值
// • String：该场合需要转成字符串
// • Default：该场合可以转成数值，也可以转成字符串

// 9.10. 对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
// • JSON[Symbol.toStringTag]：'JSON'
// • Math[Symbol.toStringTag]：'Math'
// • Module 对象M[Symbol.toStringTag]：'Module'
// • ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
// • DataView.prototype[Symbol.toStringTag]：'DataView'
// • Map.prototype[Symbol.toStringTag]：'Map'
// • Promise.prototype[Symbol.toStringTag]：'Promise'
// • Set.prototype[Symbol.toStringTag]：'Set'
// • %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
// • WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
// • WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
// • %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
// • %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
// • %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
// • Symbol.prototype[Symbol.toStringTag]：'Symbol'
// • Generator.prototype[Symbol.toStringTag]：'Generator'
// • GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

// 9.11. 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
//  通过指定Symbol.unscopables属性，使得with语法块不会在当前作用域寻找foo属性，即foo将指向外层作用域的变量。

// 没有 unscopables 时
class MyClass {
  foo() { return 1; }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 1
}

// 有 unscopables 时
class MyClass {
  foo() { return 1; }
  get [Symbol.unscopables]() {
    return { foo: true };
  }
}

var foo = function () { return 2; };

with (MyClass.prototype) {
  foo(); // 2
}









