// const arr = [22, 44, 44, 12, 66, 34, 54];

// //length
// console.log(arr.length);//7
//
// //截短数组
// if (arr.length > 5) {
//     arr.length = 5;
// }
// console.log(arr);//[ 22, 44, 44, 12, 66 ]
// console.log(arr.length);//5


// //添加一个返回数组的第一个元素的新方法
// if(!Array.prototype.first){
//     Array.prototype.first = function () {
//         return this[0];
//     }
// }
//
// console.log(arr.first());


//Array.from()

// console.log(Array.from("abc"));//[ 'a', 'b', 'c' ]

// console.log(Array.from([1, 2, 3], x => x * x));//[ 1, 4, 9 ]

//Array.isArray
// console.log(Array.isArray([]));
// console.log(Array.isArray([1]));
// console.log(Array.isArray(new Array()));
// console.log(Array.isArray(Array.prototype));


//Array.of
// console.log(Array.of(7));;       // [7]
// console.log(Array.of(1, 2, 3));; // [1, 2, 3]
//
// console.log(Array(7));;          // [ , , , , , , ]
// console.log(Array(1, 2, 3));;    // [1, 2, 3]

//entries
// var arr = ["a", "b", "c"];
// var iterator = arr.entries();
//
// console.log(iterator);//{}
// console.log(iterator.next().value);// [0, "a"]
// console.log(iterator.next().value);// [1, "b"]
// console.log(iterator.next().value);// [2, "c"]

//every
//检测数组中的所有元素是否都大于 10。
const arr = [22, 44, 44, 12, 66, 34, 54];

const isBig = arr.every(el => el > 10);

console.log(isBig);//true

