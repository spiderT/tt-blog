// The constructor to decorate
function MacBook() {
  this.cost = function () {
    return 997;
  };
  this.screenSize = function () {
    return 11.6;
  };
}

// Decorator 1
function Memory(macbook) {
  const v = macbook.cost();
  macbook.cost = function () {
    return v + 75;
  };
}

// Decorator 2
function Engraving(macbook) {
  const v = macbook.cost();
  macbook.cost = function () {
    return v + 200;
  };
}

// Decorator 3
function Insurance(macbook) {
  const v = macbook.cost();
  macbook.cost = function () {
    return v + 250;
  };
}

const mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

console.log(mb.cost()); // Outputs: 1522

console.log(mb.screenSize()); // Outputs: 11.6
