function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "yellow"];
}
Parent.prototype.getName = function () {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);

  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child1 = new Child("t1", 11);
child1.colors.push("green");
const child2 = new Child("t2", 12);

// console.log("child1", child1);
// console.log("child2", child2);

child1.getName()
child2.getName()
