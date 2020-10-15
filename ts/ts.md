# typescript

## 1. 基本类型

### 1.1. Boolean

true/false

```ts
let isDone: boolean = false;
```

### 1.2. Number

十进制decimal，十六进制hexadecimal，二进制binary，八进制octal，长整型数字bigint

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### 1.3. String

支持单引号'' 和 双引号""

```ts
let color: string = "blue";
```

模版字符串``,变量用 ${ expr }

```ts
let fullName: string = `Bob Bobbington`;
let sentence: string = `Hello, my name is ${fullName}.
```

### 1.4. Array

数组类型可以用两种方式  

类型元素随后[]来表示一个数组元素的类型  

```ts
let list: number[] = [1, 2, 3];
```

使用一个通用的数组类型,数组< elemType >

```ts
let list: Array<number> = [1, 2, 3];
```

### 1.5. Tuple

Tuple类型允许您用固定数量的表达一个数组元素的类型是已知的,但不一定是相同的。例如,一个值表示为一对一个字符串和一个数字:

```ts
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
// Type 'number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'

x[3] = "world";
// Tuple type '[string, number]' of length '2' has no element at index '3'.

console.log(x[5].toString());
// Object is possibly 'undefined'.
// Tuple type '[string, number]' of length '2' has no element at index '5'.
```

### 1.6. Enum

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

// Or, even manually set all the values in the enum:

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

### 1.7. Unknown

事先不知道是什么类型，告诉编译器，这个变量可以是任何东西

```ts
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;
```

### 1.8. Any

想退出的类型检查，可以用any 类型

```ts
declare function getValue(key: string): any;
const str: string = getValue("myString");
```

不同于unknown，any类型允许访问任意properties，

```ts
let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
looselyTyped.toFixed();

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed();
// 报错：Object is of type 'unknown'.
```

### 1.9. Void

可以看作函数function不返回值  

如果声明了void类型，只能赋值null或者undefined

```ts
function warnUser(): void {
  console.log("This is my warning message");
}


let unusable: void = undefined;
unusable = null;
```

### 1.10. Null and Undefined

他们只能赋值自己类型

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

### 1.11. Never

代表的类型值永远不会发生  

返回类型的函数表达式或箭函数表达式总是抛出一个异常或永远不会返回。  

```ts
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}
``

### 1.12. Object

```ts
declare function create(o: object | null): void;

// OK
create({ prop: 0 });
create(null);

create(42);
// Argument of type '42' is not assignable to parameter of type 'object | null'.
create("string");
// Argument of type '"string"' is not assignable to parameter of type 'object | null'.
create(false);
// Argument of type 'false' is not assignable to parameter of type 'object | null'.
create(undefined);
// Argument of type 'undefined' is not assignable to parameter of type 'object | null'.
```

### 1.13. Type assertions

as

```ts
let someValue: unknown = "this is a string";

let strLength: number = (someValue as string).length;
```

## 2. Interfaces

### 2.1. Optional Properties

在声明的属性名后面加一个?

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.clor) {
// Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
// Property 'clor' does not exist on type 'SquareConfig'. Did you mean 'color'?
  }
  
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

### 2.2. Readonly properties

一些属性只能修改对象时首先创建。

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
// Cannot assign to 'x' because it is a read-only property.
```

ReadonlyArray<T>: 用于在数组创建后不改变。

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; // error!
// Index signature in type 'readonly number[]' only permits reading.
ro.push(5); // error!
// Property 'push' does not exist on type 'readonly number[]'.
ro.length = 100; // error!
// Cannot assign to 'length' because it is a read-only property.
a = ro; // error!
// The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
```

用断言可以将ReadonlyArray重新变成一个正常的数组

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

a = ro as number[];
```

### 2.3. Excess Property Checks

额外属性

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

### 2.4. Function Types

声明function给定的属性，和返回值

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (src, sub) {
  let result = src.search(sub);
  return result > -1;
};
```

### 2.5. Indexable Types

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, the type of 'name' is not a subtype of the indexer
// Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

不同类型的属性是可以接受的,如果属性的索引签名是一种union类型:

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

### 2.6. Class Types

```ts
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```

区别静态和实例的类  

如果你创建一个接口构建签名并试图创建一个类实现该接口你得到一个错误:  

```ts
interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
// Class 'Clock' incorrectly implements interface 'ClockConstructor'.
// Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
  currentTime: Date;
  constructor(h: number, m: number) {}
}
```

只有实例的类是检查的，因为构造函数在静态方面,不包括这个检查。  
我们定义了两个接口,ClockConstructor构造函数和ClockInterface实例方法.  

```ts
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
```

### 2.7. Extending Interfaces

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### 2.8. Hybrid Types

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 2.9. Interfaces Extending Classes

```ts
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

class ImageControl implements SelectableControl {
// error: Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
//   Types have separate declarations of a private property 'state'.
  private state: any;
  select() {}
}
```

## 3. Functions

### 3.1. Inferring the types

```ts
// The parameters 'x' and 'y' have the type number
let myAdd = function (x: number, y: number): number {
  return x + y;
};

// myAdd has the full function type
let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};
```

### 3.2. Optional and Default Parameters

? 表示参数是可选的  

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bob"); // works correctly now
let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
// Expected 1-2 arguments, but got 3.
let result3 = buildName("Bob", "Adams"); // ah, just right
```

### 3.3. Rest Parameters

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

## 4. Classes

### 4.1. Inheritance

extends: 从基类继承的属性和方法

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

### 4.2. Public, private, protected, readonly

#### 4.2.1. Public

```ts
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

#### 4.2.2. private

```ts
class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

new Animal("Cat").name;
// Property 'name' is private and only accessible within class 'Animal'.
```

#### 4.2.3. protected

protected以外的类不能被实例化,但可以扩展

```ts
class Person {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

// Employee can extend Person
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John");
// Constructor of class 'Person' is protected and only accessible within the class declaration.
```

#### 4.2.4. Readonly

只读的属性必须在他们的声明或在构造函数中初始化。  

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit";
// Cannot assign to 'name' because it is a read-only property.
```

### 4.3. Accessors

get and set

```ts
const fullNameMaxLength = 10;

class Employee {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";

if (employee.fullName) {
  console.log(employee.fullName);
}
```

### 4.4. Static Properties

在类本身可见，而不是实例

```ts
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
```

### 4.5. Abstract Classes

抽象类可以包含其成员的实现细节

```ts
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
// Cannot create an instance of an abstract class.
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports();
// Property 'generateReports' does not exist on type 'Department'.
```

## 5. Enums

### 5.1. Numeric enums

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

### 5.2. String enums

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

### 5.3. Heterogeneous enums

```ts
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES"
}
```

## 6. Generics

 <>  

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length);
// Property 'length' does not exist on type 'T'.
  return arg;
}



function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
```














