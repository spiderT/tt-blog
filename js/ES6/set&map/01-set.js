/*//1、set基本用法
const s = new Set()

const arr = [1, 2, 3, 4, 4, 2, 3]

//通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值
arr.forEach(x => s.add(x))

console.log('s:', s);//Set { 1, 2, 3, 4 }


for (let i of s) {
    console.log(i);//1,2,3,4
}*/


//2、Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

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
set.size // 56


//3、去除数组的重复成员
//[...new Set(array)
//Array.from(new Set(array))
