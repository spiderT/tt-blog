# node

## 0. introduction

### 0.5 常用工具 util

1. util.inherits

- util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。

>Example

```js
const util = require('util');

function Base() {
  this.name='base';
  this.base=1991;
  this.sayHello=function () {
      console.log('Hello' + this.name);
  }
}

Base.prototype.showName=function () {
    console.log(this.name);
}

function Sub() {
    this.name='sub';
}

util.inherits(Sub,Base);

let objBase =new Base();

objBase.showName();
objBase.sayHello();
console.log(objBase);
//Hello base
//{ name: 'base', base: 1991, sayHello: [Function] }

let objSub=new Sub();

objSub.showName();
// objSub.sayHello();这一行代码会报错
console.log(objSub);
//sub
//{ name: 'sub' }
```

>注意，Sub 仅仅继承了 Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承

2. util.inspect

- util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。

    + 它至少接受一个参数 object，即要转换的对象。
    + showHidden 是一个可选参数，如果值为true，将会输出更多隐藏信息。
    + depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
    + 如果color 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
      
- util还提供了util.isArray()、util.isRegExp()、 util.isDate()、util.isError() 四个类型测试工具，以及 util.format()、util. debug() 等工具。
      
```js
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
```  
    
    

