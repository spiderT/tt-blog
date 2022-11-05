function Engineer(workingYears) {
  this.workingYears = workingYears;
  this.birthdate = '19911212';
}

// 不能使用箭头函数，箭头函数的 this 在声明的时候就根据上下文确定了
Engineer.prototype.built = function () {
  // this 这里就是执行函数调用者
  console.log(`${this.workingYears}`);
};

const engineer = new Engineer(5);
// this 会正确指向实例
engineer.built(); // => 5
console.log(Object.keys(engineer)); // => [ 'workingYears', 'birthdate' ]


