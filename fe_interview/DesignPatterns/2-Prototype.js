const myCar = {
  name: "Ford Escort",

  drive() {
    console.log("Weeee. I'm driving!");
  },

  panic() {
    console.log("Wait. How do you stop this thing?");
  },
};

const yourCar = Object.create(myCar);
console.log(yourCar.name);
