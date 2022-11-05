Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError(`${this} is not function`);
  }

  const args = arguments[1];
  context = context || window;

  context.fn = this;
  const res = args && args.length ? context.fn(...args) : context.fn();

  delete context.fn;
  return res;
};
// const arr = [1, 5, 3, 6, 2];
// const value1 = Math.max.apply(this, arr);
// const value2 = Math.max.myApply(this, arr);
// console.log("value1", value1);
// console.log("value2", value2);

const person = {
  name: "person1",
  say() {
    return this.name;
  },
};
const person2 = {
  name: "person2",
};
const res = person.say.apply(person2);
console.log(res); // person2

const person3 = {
  name: "person3",
};
const res3 = person.say.myApply(person3);
console.log(res3); // person3
