## es6

### 1.11. Set 和 Map 数据结构

#### 1.11.1 set

##### 基本用法

Set 本身是一个构造函数，用来生成 Set 数据结构。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
const s = new Set()

const arr = [1, 2, 3, 4, 4, 2, 3]

//add方法向 Set 结构加入成员，Set 结构不会添加重复的值。
arr.forEach(x => s.add(x))

console.log('s:', s);//Set { 1, 2, 3, 4 }


for (let i of s) {
    console.log(i);//1,2,3,4
}
```

1. Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
  return [...document.querySelectorAll('div')];
}

const set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56
```

2. 数组去重

```js
//[...new Set(array)
//Array.from(new Set(array))
```

3. 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。

- 另外，两个对象总是不相等的。

##### Set 实例的属性和方法

1. 属性：

    + Set.prototype.constructor：构造函数，默认就是Set函数。
    + Set.prototype.size：返回Set实例的成员总数。
    
2. 操作方法：

    + add(value)：添加某个值，返回 Set 结构本身。
    + delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    + has(value)：返回一个布尔值，表示该值是否为Set的成员。
    + clear()：清除所有成员，没有返回值。
    
```js
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

3. 遍历操作方法：

    + keys()：返回键名的遍历器
    + values()：返回键值的遍历器
    + entries()：返回键值对的遍历器
    + forEach()：使用回调函数遍历每个成员

> 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
    
```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

- Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
  
```js
Set.prototype[Symbol.iterator] === Set.prototype.values
  // true
```

- 这意味着，可以省略values方法，直接用for...of循环遍历 Set。

```js
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

- 数组的map和filter方法也可以间接用于 Set
    
```js
let set1 = new Set([1, 2, 3, 4])

set1 = new Set([...set1].map(x => x * 2))

let set2 = new Set([1, 2, 3, 4, 5])

set2 = new Set([...set2].filter(x => (x % 2) === 0))

console.log('set1', set1, 'set2', set2);//set1 Set { 2, 4, 6, 8 } set2 Set { 2, 4 }
```

- 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```js
let a = new Set([1, 2, 3])
let b = new Set([2, 3, 4])

//并集
let union = new Set([...a, ...b])

//交集
let intersect = new Set([...a].filter(x => b.has(x)))

//差集
let difference = new Set([...a].filter(x => !b.has(x)))

console.log('union:', union, 'intersect:', intersect, 'difference:', difference);
//union: Set { 1, 2, 3, 4 } intersect: Set { 2, 3 } difference: Set { 1 }
```


- 如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。

```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

#### 1.11.2 map

##### 基本用法

Map 数据结构它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

- 作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```js
const map = new Map([
    ['name','zs'],['title','author']
])

console.log(map.size);//2
console.log(map.has('name'));//true
console.log(map.get('name'));//zs
console.log(map.has('title'));//true
console.log(map.get('title'));//author
```

- Map构造函数接受数组作为参数，实际上执行的是下面的算法。

```js
const items = [
  ['name', 'zs'],
  ['title', 'author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```

- 事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。


- 如果对同一个键多次赋值，后面的值将覆盖前面的值。

```js
const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');

map.get(1) // "bbb"
```

- 如果读取一个未知的键，则返回undefined。

```js
new Map().get('asfddfsasadf')
// undefined
```
> 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
//上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。

//同理，同样的值的两个实例，在 Map 结构中被视为两个键。

const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

- **Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。**这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

> 比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

##### 属性和操作方法

1. size  返回 Map 结构的成员总数

2. set(key, value)  set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。**set方法返回的是当前的Map对象，因此可以采用链式写法。**

3. get(key)   get方法读取key对应的键值，如果找不到key，返回undefined。

4. has(key)   返回一个布尔值，表示某个键是否在当前 Map 对象之中。

5. delete(key)   delete方法删除某个键，返回true。如果删除失败，返回false。

6. clear()   清除所有成员，没有返回值。


7. 遍历方法

    + keys()：返回键名的遍历器。
    + values()：返回键值的遍历器。
    + entries()：返回所有成员的遍历器。
    + forEach()：遍历 Map 的所有成员。


8. 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。


```js
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

##### 与其他数据结构的互相转换

1. Map 转为数组————扩展运算符（...）

2. 数组 转为 Map————将数组传入 Map 构造函数，就可以转为 Map

3. Map 转为对象————

4. 对象转为 Map————

5. Map 转为 JSON————

6. JSON 转为 Map————




















