/*//1、set基本用法
 const s = new Set()

 const arr = [1, 2, 3, 4, 4, 2, 3]

 //通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值
 arr.forEach(x => s.add(x))

 console.log('s:', s);//Set { 1, 2, 3, 4 }


 for (let i of s) {
 console.log(i);//1,2,3,4
 }*/


/*//2、Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

 const arr = [1, 2, 3, 4, 4, 2, 3]

 const set = new Set(arr)

 console.log(set);//Set { 1, 2, 3, 4 }
 console.log([...set]);//[1,2,3,4]


 //2.1
 const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
 items.size // 5

 //2.2
 function divs () {
 return [...document.querySelectorAll('div')];
 }

 const set = new Set(divs());
 set.size // 56

 // 类似于
 divs().forEach(div => set.add(div));
 set.size // 56*/


//3、去除数组的重复成员
// [...new Set(array)
// Array.from(new Set(array))


/*//4、数组的map和filter方法也可以间接用于 Set

let set1 = new Set([1, 2, 3, 4])

set1 = new Set([...set1].map(x => x * 2))

let set2 = new Set([1, 2, 3, 4, 5])

set2 = new Set([...set2].filter(x => (x % 2) === 0))

console.log('set1', set1, 'set2', set2);//set1 Set { 2, 4, 6, 8 } set2 Set { 2, 4 }*/


//5、使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

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





