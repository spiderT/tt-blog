//基础方法
const arr = [33, 12, 95, 67, 89, 11, 3, 77, 66, 22];

// function getMax(arr) {
//     let max = arr[0];
//     for(let k in arr){
//         if(max < arr[k]){
//             max = arr [k];
//         }
//     }
//     return max;
// }


//原型方法
// function getMax(arr) {
//     return Math.max.apply(null,arr)
// }


//ES6方法
// function getMax(arr) {
//     return Math.max(...arr);
// }

//排序方法
function getMax(arr) {
    return (arr.sort())[arr.length-1];
}

console.log(getMax(arr));



