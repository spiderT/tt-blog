/*//1、对象作为健
 const m = new Map();
 const o = {p: 'Hello World'};

 m.set(o, 'content')
 console.log(m.get(o)); // "content"

 console.log(m.has(o)); // true
 console.log(m.delete(o)); // true
 console.log(m.has(o)); // false*/


/*//2、作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
 const map = new Map([
 ['name','zs'],['title','author']
 ])

 console.log(map.size);//2
 console.log(map.has('name'));//true
 console.log(map.get('name'));//zs
 console.log(map.has('title'));//true
 console.log(map.get('title'));//author*/


// //3、Map构造函数接受数组作为参数，实际上执行的是下面的算法。
// const items = [
//     ['name','zs'],['title','author']
// ]
//
// const map = new Map()
//
// items.forEach(([key, value]) => map.set(key, value))


//4、如果对同一个键多次赋值，后面的值将覆盖前面的值。
const map = new Map();

map
    .set(1, 'aaa')
    .set(1, 'bbb');

console.log(map.get(1)); // "bbb"

