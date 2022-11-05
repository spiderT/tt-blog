function createPerson(name, age) {
  return {
    name,
    age,
    job(v) {
      console.log(`${this.name} is a ${v}`);
    },
  };
}

const p1 = createPerson("Andy", 20);
const p2 = createPerson("Candy", 35);
p1.job("FE"); // Andyis a FE
p2.job("RD"); // Candyis a RD
