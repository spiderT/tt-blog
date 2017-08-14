const util = require('util');

// function Base() {
//   this.name='base';
//   this.base=1991;
//   this.sayHello=function () {
//       console.log('Hello' + this.name);
//   }
// }
//
// Base.prototype.showName=function () {
//     console.log(this.name);
// }
//
// function Sub() {
//     this.name='sub';
// }
//
// util.inherits(Sub,Base);
//
// let objBase =new Base();
//
// objBase.showName();
// objBase.sayHello();
// console.log(objBase);
//
//
// let objSub=new Sub();
//
// objSub.showName();
// // objSub.sayHello();这一行代码会报错
// console.log(objSub);

function Person() {
    this.name='xiaoer';
    this.toString=function () {
        return this.name;
    }
}

let obj = new Person();

console.log(util.inspect(obj));
//Person { name: 'xiaoer', toString: [Function] }

console.log(util.inspect(obj,true))
/*
Person {
    name: 'xiaoer',
        toString:
    { [Function]
        [length]: 0,
        [name]: '',
        [arguments]: null,
        [caller]: null,
        [prototype]: { [constructor]: [Circular] } } }
*/

