// 不同绩效有不同的奖金策略： 每个策略接受同类型的参数返回相同的结果
const strategies = {
  S(salary) {
    return salary * 3;
  },
  A(salary) {
    return salary * 2;
  },
  B(salary) {
    return salary;
  },
  C(salary) {
    return 0;
  },
};

const calculateBonus = (salary, strategy) => strategies[strategy](salary);

console.log(calculateBonus(10000, "S")); // 30000
console.log(calculateBonus(10000, "C")); // 0
