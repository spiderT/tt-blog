/*//1、symbol类型
let s = Symbol()

console.log(typeof s);//symbol*/


/*//2、接受一个字符串作为参数
let s1 = Symbol('foo');
let s2 = Symbol('bar');

console.log(s1); // Symbol(foo)
console.log(s2); // Symbol(bar)

console.log(s1.toString()); // "Symbol(foo)"
console.log(s2.toString()); // "Symbol(bar)"*/



/*//3、接受一个对象作为参数
const obj = {
    toString() {
        return 'abc';
    }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)*/



/*
//4、注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

console.log(s1 === s2); // false

// 有参数的情况
let ss1 = Symbol('foo');
let ss2 = Symbol('foo');

console.log(ss1 === ss2); // false
*/


/*
//5、Symbol 值不能与其他类型的值进行运算，会报错。
let sym = Symbol('My symbol');

console.log("your symbol is " + sym)
// TypeError: can't convert symbol to string
console.log(`your symbol is ${sym}`)
// TypeError: can't convert symbol to string
*/






