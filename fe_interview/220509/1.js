function Animal() {
  this.type = "animal";
}

function Dog() {
  this.name = "dog";
}

Dog.prototype = new Animal();

var PavlovPet = new Dog();

console.log(PavlovPet.__proto__ === Dog.prototype);
console.log(Dog.prototype.__proto__ === Animal.prototype);
