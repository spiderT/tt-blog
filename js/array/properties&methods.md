## 数组

### 属性和方法总结
参照[MDN]整理(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

#### 1. 属性

1.1. **length，返回一个数组中元素的个数**

> Syntax

```js
Array.length
```

> Examples

```js
const arr = [22, 44, 44, 12, 66, 34, 54];

//length
console.log(arr.length);//7

//截短数组
if (arr.length > 5) {
    arr.length = 5;
}
console.log(arr);//[ 22, 44, 44, 12, 66 ]
console.log(arr.length);//5
```


1.2. **prototype，表示Array构造函数的原型**

> Syntax

```js
Array.prototype.pop()//删除数组的最后一个元素，并返回这个元素
Array.prototype.reverse()//颠倒数组中元素的排列顺序v
```

> Examples

```js
//添加一个返回数组的第一个元素的新方法
if(!Array.prototype.first){
    Array.prototype.first = function () {
        return this[0];
    }
}

console.log(arr.first());
```

> Description

Array实例继承自 Array.prototype 。与所有构造函数一样，您可以更改构造函数的原型对象，以对所有 Array 实例进行更改。


#### 2. 方法

2.1. **from，从一个类似数组或可迭代的对象中创建一个新的数组实例**

> Syntax

```js
Array.from(arrayLike[, mapFn[, thisArg]])
```
- arrayLike想要转换成真实数组的类数组对象或可遍历对象
- mapFn可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。
- thisArg可选参数，执行 mapFn 函数时 this 的值。

> Examples

```js
console.log(Array.from("abc"));//[ 'a', 'b', 'c' ]

console.log(Array.from([1, 2, 3], x => x * x));//[ 1, 4, 9 ]
```

> Polyfill

```js
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else      
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
```

2.2. **Array.isArray() 确定变量是否是一个 Array**

> Syntax

```js
Array.isArray(obj)//obj是变量
//如果对象是 Array，则为true; 否则为false。
```
- arrayLike想要转换成真实数组的类数组对象或可遍历对象
- mapFn可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。
- thisArg可选参数，执行 mapFn 函数时 this 的值。

> Examples

```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
```

> Polyfill

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

2.3. **Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型**

**Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个包含 7 个 undefined 元素的数组。**

```js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

> Syntax

```js
Array.of(element0[, element1[, ...[, elementN]]])//任意个参数，将按顺序成为返回数组中的元素。
```

> Examples

```js
Array.of(1);         // [1]
Array.of(1, 2, 3);   // [1, 2, 3]
Array.of(undefined); // [undefined]
```

> Polyfill

```js
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

2.4. **concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组**

> Syntax

```js
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```

> Examples

```js
var num1 = [1, 2, 3];
var num2 = [4, 5, 6];
var num3 = [7, 8, 9];

var nums = num1.concat(num2, num3);// 组成新数组[1, 2, 3, 4, 5, 6, 7, 8, 9]; 原数组 num1, num2, num3 未被修改
```

2.5. **copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小**

> Syntax

```js
arr.copyWithin(target, start, end)//start, end可选

//arr.copyWithin(目标索引, [源开始索引], [结束源索引])
//参数target,start和end 必须为整数。如果start为负，则其指定的索引位置等同于length+start，length为数组的长度。end也是如此。
```

> Examples

```js
[1, 2, 3, 4, 5].copyWithin(-2);// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3);// [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);// {0: 1, 3: 1, length: 5}
```
> Polyfill

```js
if (!Array.prototype.copyWithin) {
  Array.prototype.copyWithin = function(target, start/*, end*/) {
    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-8.
    var relativeTarget = target >> 0;

    var to = relativeTarget < 0 ?
      Math.max(len + relativeTarget, 0) :
      Math.min(relativeTarget, len);

    // Steps 9-11.
    var relativeStart = start >> 0;

    var from = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 12-14.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;

    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 15.
    var count = Math.min(final - from, len - to);

    // Steps 16-17.
    var direction = 1;

    if (from < to && to < (from + count)) {
      direction = -1;
      from += count - 1;
      to += count - 1;
    }

    // Step 18.
    while (count > 0) {
      if (from in O) {
        O[to] = O[from];
      } else {
        delete O[to];
      }

      from += direction;
      to += direction;
      count--;
    }

    // Step 19.
    return O;
  };
}
```

2.6. **entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对**

> Syntax

```js
arr.entries()
```

> Examples

```js
var arr = ["a", "b", "c"];
var iterator = arr.entries();

console.log(iterator);//{}
console.log(iterator.next().value);// [0, "a"]
console.log(iterator.next().value);// [1, "b"]
console.log(iterator.next().value);// [2, "c"]

//使用for…of 循环
var arr = ["a", "b", "c"];
var iterator = arr.entries();

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```
> Polyfill

```js

```

2.7. **every() 方法测试数组的所有元素是否都通过了指定函数的测试**

> Syntax

```js
arr.every(callback[, thisArg])
//callback:用来测试每个元素的函数。
//thisArg:执行 callback 时使用的 this 值。
```

> Examples

```js
//检测数组中的所有元素是否都大于 10。
const arr = [22, 44, 44, 12, 66, 34, 54];

const isBig = arr.every(el => el > 10);

console.log(isBig);//true
```
> Polyfill

```js
if (!Array.prototype.every)
{
  Array.prototype.every = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
        throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && !fun.call(thisArg, t[i], i, t))
        return false;
    }

    return true;
  };
}
```

2.8. **fill()——用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，返回修改后的数组**

> Syntax

```js
//value 用于填充数组元素的值；start起始索引，默认为0；end终止索引，默认值为 this.length
arr.fill(value) 
arr.fill(value, start) 
arr.fill(value, start, end)
```

> Examples

```js
const arr= [22, 44, 44, 12, 66, 34, 54];

arr.fill(0)//[ 0, 0, 0, 0, 0, 0, 0 ]
arr.fill(0, 1)//[ 22, 0, 0, 0, 0, 0, 0 ]
arr.fill(0, 1, 2)//[ 22, 0, 44, 12, 66, 34, 54 ]
```
> Polyfill

```js
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
```

2.9. **filter() 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素**

> Syntax

```js
//callback用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。返回true表示保留该元素（通过测试），false则不保留。
//thisArg可选。执行 callback 时的用于 this 的值。
var new_array = arr.filter(callback[, thisArg])
```

> Examples

```js
const arr= [2, 44, 4, 12, 66, 3, 54];
arr.filter(val => val>10 );//[44,12,66,54]
```
> Polyfill

```js
if (!Array.prototype.filter)
{
  Array.prototype.filter = function(fun , thisArg)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
      {
        var val = t[i];

        if (fun.call(thisArg, val, i, t))
          res.push(val);
      }
    }

    return res;
  };
}
```

2.10. **find()返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined**

> Syntax

```js
arr.find(callback[, thisArg])
```

> Examples

```js
const score = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(score.find(findCherries)); // { name: 'cherries', quantity: 5 }
```
> Polyfill

```js
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    //>>> 0所有非数值转换成0,所有大于等于 0 等数取整数部分
    var length = list.length >>> 0;
    
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
```

2.11. **findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引,否则返回-1**

> Syntax

```js
arr.findIndex(callback[, thisArg])
```

> Examples

```js
const arr= [22, 44, 44, 12, 66, 34, 54];
console.log(arr.findIndex(val => val > 50));//5
```
> Polyfill

```js
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
```

2.12. **forEach**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```
     
2.13. **includes**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```   
     
2.14. **indexOf**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  

2.15. **join**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  

2.16. **keys**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  

2.17. **lastIndexOf**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  

2.18. **map**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  

2.19. **pop**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  

2.20. **push**

> Syntax

```js

```

> Examples

```js

```
> Polyfill

```js

```  