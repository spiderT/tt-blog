// interface LabeledValue {
//   label: string;
// }

// function printLabel(labeledObj: LabeledValue) {
//   console.log(labeledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);



// interface SquareConfig {
//   color?: string;
//   width?: number;
//   [propName: string]: any;
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
//   return { color: config.color || "red", area: config.width ? config.width*config.width : 20 };
// }

// let mySquare = createSquare({ colour: "red"});



// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;

// mySearch = function (src, sub) {
//   let result = src.search(sub);
//   return result > -1;
// };



// interface StringArray {
//   [index: number]: string;
// }

// let myArray: StringArray;
// myArray = ["Bob", "Fred"];

// let myStr: string = myArray[0];



// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number) {}
// }




// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
// // Class 'Clock' incorrectly implements interface 'ClockConstructor'.
//   // Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
//   currentTime: Date;
//   constructor(h: number, m: number) {}
// }



interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);





