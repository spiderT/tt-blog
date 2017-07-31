const arr = [22, 3, 5, 3, 11, 44];


//concat方法
// function deepClone(arr) {
//     return arr.concat();
// }

//slice方法
// function deepClone(arr) {
//     return arr.slice(0);
// }

// Array.of()方法
// function deepClone(arr) {
//     return Array.of(...arr);
// }

//for循环
// function deepClone(arr) {
//     let newArr = [];
//     for (let k in arr) {
//         newArr.push(arr[k]);
//     }
//     return newArr;
// }

//ES6方法
function deepClone(arr) {
    let newArr = [];
    newArr.push(...arr);
    return newArr;
}

let newArr = deepClone(arr);
newArr[0] = 11;
console.log(newArr);
console.log(arr);

