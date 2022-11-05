
var a = 10
var obj = {
  a: 20,
  say: () => {
    console.log(this.a)
  }
}

// 箭头函数，该函数所在的作用域指向的对象
obj.say()  // 10
var anotherObj = { a:30 } 
obj.say.apply(anotherObj) // 10

// var name = 'window'; 

// var A = {
//    name: 'A',
//   //  sayHello: ()=>{
//    sayHello: function(){
//       var s = () => console.log(this.name)
//       return s//返回箭头函数s
//    }
// }

// var sayHello = A.sayHello();
// sayHello();// 输出A 

// var B = {
//    name: 'B',
// }

// sayHello.call(B); //还是A
// sayHello.call(); //还是A