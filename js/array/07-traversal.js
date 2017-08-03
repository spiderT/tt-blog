const arr = [12, 45, 67, 89, 43, 1, 35, 6];

//普通for循环
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i] * 2);
// }

//优化版for循环
// for (let i = 0, len = arr.length; i < len; i++) {
//     console.log(arr[i] * 2);
// }


//forEach
// arr.forEach((val,index) => {
//     console.log(val*2);
// })

//forEach的变种
// Array.prototype.forEach.call(arr,(el) => {
//
// })


//for in
// for(let k in arr){
//     //k 是 index
//     console.log(arr[k]*2)
// }


//map
// arr.map((val,index) => {
//     console.log(val*2);
// })



//for of
// for(let val of arr){
//     console.log(val);
// }



//every
// console.log(arr.every((val, index, array) => val > 0));
// console.log(arr.every((val, index, array) => val > 10));


//some
console.log(arr.some((val, index, array) => val > 0));
console.log(arr.some((val, index, array) => val > 10));