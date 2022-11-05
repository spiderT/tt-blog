// 1. 利用 indexOf 去重
// const newArr = [];
// arr.forEach((item)=>{
//    if( newArr.indexOf(item) === -1 ){
//        newArr.push(item);
//    }
// })
// 2. 利用 includes 去重
// const newArr = [];
// arr.forEach((item)=>{
//     if( !newArr.includes(item) ){
//         newArr.push(item);
//     }
// })
// 3. 利用 filter() 去重
let newArr = arr.filter((item, index, self) => self.indexOf(item) === index);
// 4. 利用 new Set() 去重
// let newArr = [...new Set(arr)];
