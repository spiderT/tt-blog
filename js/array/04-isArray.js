const arr = [1,2,3];

//instanceof判断
// function isArray(arr) {
//     return arr instanceof Array;
// }

//Array.isArray()判断
// function isArray(arr) {
//     return Array.isArray(arr);
// }

//原型链方法
// function isArray(arr) {
//     return arr.constructor === Array;
// }


//Object.prototype.toString方法
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

console.log(isArray(arr));