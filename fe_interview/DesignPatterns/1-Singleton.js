const getSingle = function (fn) {
  // 通过闭包保存创建过的对象
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

const createPerson = getSingle((name) => name);

const person1 = createPerson("Jack");
const person2 = createPerson("Merry");

console.log(person1, person2); // 'Jack'  'Jack'
