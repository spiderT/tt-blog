function foo() {
  let a = (b = 0);
  a++;
  return a;
}

foo();
console.log(typeof a); // undefined (let a 是一个局部变量。typeof a 检查的是未声明的变量。)
console.log(typeof b); // number ( b 是个全局变量，它在 foo 函数中被赋值。)



