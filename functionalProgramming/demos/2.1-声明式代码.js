const cars = [
  {
    name: 'bwm',
    make: 'America'
  },
  {
    name: 'tt',
    make: 'Japan'
  }
]

// 命令式
let makes = [];
for (let i = 0; i < cars.length; i++) {
  makes.push(cars[i].make);
}


// 声明式
let makes2 = cars.map(function (car) {
  return car.make;
});


console.log('makes', makes);  // makes [ 'America', 'Japan' ]
console.log('makes2', makes2);  // makes2 ['America', 'Japan']






