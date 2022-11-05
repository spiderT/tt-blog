# 设计模式

- [设计模式](#设计模式)
  - [1. 常用设计模式，以及应用场景](#1-常用设计模式以及应用场景)
    - [1. 单例（Singleton）模式](#1-单例singleton模式)
    - [2. 原型（Prototype）模式](#2-原型prototype模式)
    - [3. 工厂方法（Factory Method）模式](#3-工厂方法factory-method模式)
    - [4. 抽象工厂（Abstract Factory）模式](#4-抽象工厂abstract-factory模式)
    - [5. 建造者（Builder）模式](#5-建造者builder模式)
    - [6. 代理（Proxy）模式](#6-代理proxy模式)
    - [7. 适配器（Adapter）模式](#7-适配器adapter模式)
    - [8. 桥接（Bridge）模式](#8-桥接bridge模式)
    - [9. 装饰（Decorator）模式](#9-装饰decorator模式)
    - [10. 外观（Facade）模式](#10-外观facade模式)
    - [11. 享元（Flyweight）模式](#11-享元flyweight模式)
    - [12. 组合（Composite）模式](#12-组合composite模式)
    - [13. 模板方法（TemplateMethod）模式](#13-模板方法templatemethod模式)
    - [14. 策略（Strategy）模式](#14-策略strategy模式)
    - [15. 命令（Command）模式](#15-命令command模式)
    - [16. 职责链（Chain of Responsibility）模式](#16-职责链chain-of-responsibility模式)
    - [17. 状态（State）模式](#17-状态state模式)
    - [18. 观察者（Observer）模式](#18-观察者observer模式)
    - [19. 中介者（Mediator）模式](#19-中介者mediator模式)
    - [20. 迭代器（Iterator）模式](#20-迭代器iterator模式)
    - [21. 访问者（Visitor）模式](#21-访问者visitor模式)
    - [22. 备忘录（Memento）模式](#22-备忘录memento模式)
    - [23. 解释器（Interpreter）模式](#23-解释器interpreter模式)
  - [2. vue/react中应用什么设计模式](#2-vuereact中应用什么设计模式)

## 1. 常用设计模式，以及应用场景

> 设计模式的六大原则

1. 开闭原则（Open Close Principle）—— 对扩展开放，对修改关闭。在程序需要进行拓展的时候，不能去修改原有的代码，实现一个热插拔的效果。简言之，是为了使程序的扩展性好，易于维护和升级。想要达到这样的效果，我们需要使用接口和抽象类。

2. 里氏代换原则（Liskov Substitution Principle）—— 里氏代换原则是面向对象设计的基本原则之一。 里氏代换原则中说，任何基类可以出现的地方，子类一定可以出现。LSP 是继承复用的基石，只有当派生类可以替换掉基类，且软件单位的功能不受到影响时，基类才能真正被复用，而派生类也能够在基类的基础上增加新的行为。里氏代换原则是对开闭原则的补充。实现开闭原则的关键步骤就是抽象化，而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。

3. 依赖倒转原则（Dependence Inversion Principle）—— 这个原则是开闭原则的基础，具体内容：针对接口编程，依赖于抽象而不依赖于具体。

4. 接口隔离原则（Interface Segregation Principle）—— 使用多个隔离的接口，比使用单个接口要好。它还有另外一个意思是：降低类之间的耦合度。由此可见，其实设计模式就是从大型软件架构出发、便于升级和维护的软件设计思想，它强调降低依赖，降低耦合。

5. 迪米特法则，又称最少知道原则（Demeter Principle）—— 一个实体应当尽量少地与其他实体之间发生相互作用，使得系统功能模块相对独立。

6. 合成复用原则（Composite Reuse Principle）—— 尽量使用合成/聚合的方式，而不是使用继承。

> 23种设计模式

### 1. 单例（Singleton）模式

某个类只能生成一个实例，该类提供了一个全局访问点供外部获取该实例，其拓展是有限多例模式。

简介：单例模式是一种常用的模式，我们在多次引入其他模块时，并不需要每次都创建一个新的模块对象，复用之前创建过的对象不仅能减少内存的开销，同时也可以体验共享对象带来的便利。简单来说就是使用闭包持久保存函数上一次的执行结果，在之后的调用中直接返回。  
例如js 中模块加载的方式：require、import都使用到了该模式.  

```js
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
```

### 2. 原型（Prototype）模式

将一个对象作为原型，通过对其进行复制而克隆出多个和原型类似的新实例。  

```js
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
```

### 3. 工厂方法（Factory Method）模式

定义一个用于创建产品的接口，由子类决定生产什么产品。  

```js
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
p1.job("FE"); // Andy is a FE
p2.job("RD"); // Candy is a RD
```

### 4. 抽象工厂（Abstract Factory）模式

抽象工厂模式提供了一种封装一组具有相同主题的单个工厂而无需指定其具体类的方法。即工厂的工厂；一个将单个相关/从属工厂分组在一起的工厂，但未指定其具体类别。  

当存在相互关联的依赖关系且涉及非简单创建逻辑时，建议使用抽象工厂模式。  

通常在以下情况下考虑使用抽象工厂模式：  

1. 一个系统应该独立于其产品的创建，组成和表示方式
2. 系统应配置有多个产品系列之一
3. 一个相关产品对象系列旨在一起使用，因此需要强制执行此约束
4. 您想要提供产品的类库，并且只想显示它们的接口，而不是它们的实现
5. 从概念上讲，依赖项的生存期短于消费者的生存期。
6. 您需要一个运行时值来构建特定的依赖关系
7. 您想决定在运行时从系列中调用哪种产品。
8. 您需要提供一个或多个仅在运行时才知道的参数，然后才能解决依赖关系。
9. 当您需要产品之间的一致性时
10. 在将新产品或产品系列添加到程序时，您不想更改现有代码。

抽象工厂模式参与者主要有：

AbstractFactory:

1. 声明产品的接口
2. 在JavaScript中不使用

ConcreteFactory:

1. 工厂对象
2. create()方法返回新产品

产品 :

1. 工厂创建的产品实例

AbstractProduct:

1. 在JavaScript中没有使用
2. 声明要创建的产品的接口

参考： [设计模式(6)[JS版]-JavaScript如何实现抽象工厂模式？](https://cloud.tencent.com/developer/article/1694164)

### 5. 建造者（Builder）模式

将一个复杂对象分解成多个相对简单的部分，然后根据不同需要分别创建它们，最后构建成该复杂对象。  
它将变与不变相分离，即产品的组成部分是不变的，但每一部分是可以灵活选择的。  

例如，计算机是由 CPU、主板、内存、硬盘、显卡、机箱、显示器、键盘、鼠标等部件组装而成的，采购员不可能自己去组装计算机，而是将计算机的配置要求告诉计算机销售公司，计算机销售公司安排技术人员去组装计算机，然后再交给要买计算机的采购员。  

### 6. 代理（Proxy）模式

为某对象提供一种代理以控制对该对象的访问。即客户端通过代理间接地访问该对象，从而限制、增强或修改该对象的一些特性。

例如 防抖动函数（debounce 常用于控制用户输入后回调函数触发的时机），节流函数（throttle 常用于控制resize、scroll等事件的触发频率）.  

```js
function throttle(fn, delay = 1000) {
  let flag = true; // 是否已有定时器
  let timer = null;
  return function (...args) {
    if (!flag) return;
    flag = false;
    clearTimeout(timer); // 清除
    timer = setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}
// 处理函数
function handle() {
  console.log(Math.random());
}
// 滚动事件
window.addEventListener("scroll", throttle(handle));
```

### 7. 适配器（Adapter）模式

是解决两个软件实体间的接口不兼容的问题，对不兼容的部分进行适配.  

核心：解决两个已有接口之间不匹配的问题.  

```js
// 数据格式转换的适配器, 对非数组的进行转换适配
function arrayAdapter(data) {
  if (typeof data !== "object") {
    return [];
  }

  if (Object.prototype.toString.call(data) === "[object Array]") {
    return data;
  }

  const result = [];

  for (let item in data) {
    if (data.hasOwnProperty(item)) {
      result.push(data[item]);
    }
  }

  return result;
}
```

### 8. 桥接（Bridge）模式

将抽象与实现分离，使它们可以独立变化。它是用组合关系代替继承关系来实现，从而降低了抽象和实现这两个可变维度的耦合度。

### 9. 装饰（Decorator）模式

动态的给对象增加一些职责，即增加其额外的功能。而不会影响从这个类中派生的其他对象。  
是一种“即用即付”的方式，能够在不改变对 象自身的基础上，在程序运行期间给对象动态地 添加职责.  

核心: 是为对象动态加入行为，经过多重包装，可以形成一条装饰链.  

```js
// 使用传统面向对象的方法来实现装饰，添加技能
function Person() {}

Person.prototype.skill = function () {
  console.log("数学");
};

// 装饰器，还会音乐
function MusicDecorator(person) {
  this.person = person;
}

MusicDecorator.prototype.skill = function () {
  this.person.skill();
  console.log("音乐");
};

// 装饰器，还会跑步
function RunDecorator(person) {
  this.person = person;
}

RunDecorator.prototype.skill = function () {
  this.person.skill();
  console.log("跑步");
};

const person = new Person();

// 装饰一下
const person1 = new MusicDecorator(person);
person1 = new RunDecorator(person1);

person.skill(); // 数学
person1.skill(); // 数学 音乐 跑步
```

### 10. 外观（Facade）模式

为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使子系统更加容易使用  

核心: 可以通过请求外观接口来达到访问子系统，也可以选择越过外观来直接访问子系统  

实现: 外观模式在JS中，可以认为是一组函数的集合  

```js
// 三个处理函数
function start() {
  console.log("start");
}

function doing() {
  console.log("doing");
}

function end() {
  console.log("end");
}

// 外观函数，将一些处理统一起来，方便调用
function execute() {
  start();
  doing();
  end();
}

// 调用init开始执行
function init() {
  // 此处直接调用了高层函数，也可以选择越过它直接调用相关的函数
  execute();
}

init(); // start doing end
```

### 11. 享元（Flyweight）模式

运用共享技术来有效地支持大量细粒度对象的复用。是一种用于性能优化的模式，它的目标是尽量减少共享对象的数量.  

强调将对象的属性划分为内部状态（属性）与外部状态（属性）。内部状态用于对象的共享，通常不变；而外部状态则剥离开来，由具体的场景决定。

```js
// 要对某个班进行身体素质测量，仅测量身高体重来评判

// 健康测量
function Fitness(sex) {
  this.sex = sex;
}

// 工厂: 创建可共享的对象
const FitnessFactory = {
  objs: [],
  create(sex) {
    if (!this.objs[sex]) {
      this.objs[sex] = new Fitness(sex);
    }
    return this.objs[sex];
  },
};

// 管理器: 管理非共享的部分
const FitnessManager = {
  fitnessData: {},
  // 添加一项
  add(name, sex, age, height, weight) {
    const fitness = FitnessFactory.create(sex);
    // 存储变化的数据
    this.fitnessData[name] = {
      age,
      height,
      weight,
    };
    return fitness;
  },

  // 从存储的数据中获取，更新至当前正在使用的对象
  updateFitnessData(name, obj) {
    const fitnessData = this.fitnessData[name];
    for (const item in fitnessData) {
      if (fitnessData.hasOwnProperty(item)) {
        obj[item] = fitnessData[item];
      }
    }
  },
};

// 开始评判
Fitness.prototype.judge = function (name) {
  // 操作前先更新当前状态（从外部状态管理器中获取）
  FitnessManager.updateFitnessData(name, this);

  const ret = name + ": ";
  if (this.sex === "male") {
    ret += this.judgeMale();
  } else {
    ret += this.judgeFemale();
  }
  console.log(ret);
};

// 男性评判规则
Fitness.prototype.judgeMale = function () {
  const ratio = this.height / this.weight;
  return this.age > 20 ? ratio > 3.5 : ratio > 2.8;
};

// 女性评判规则
Fitness.prototype.judgeFemale = function () {
  const ratio = this.height / this.weight;
  return this.age > 20 ? ratio > 4 : ratio > 3;
};

const a = FitnessManager.add("A", "male", 18, 160, 80);
const b = FitnessManager.add("B", "male", 21, 180, 70);
const c = FitnessManager.add("C", "female", 28, 160, 80);
const d = FitnessManager.add("D", "male", 18, 170, 60);
const e = FitnessManager.add("E", "female", 18, 160, 40);

// 开始评判
a.judge("A"); // A: false
b.judge("B"); // B: false
c.judge("C"); // C: false
d.judge("D"); // D: true
e.judge("E"); // E: true
```

### 12. 组合（Composite）模式

将对象组合成树状层次结构，使用户对单个对象和组合对象具有一致的访问性。  

是用小的子对象来构建更大的 对象，而这些小的子对象本身也许是由更小 的“孙对象”构成的。  

### 13. 模板方法（TemplateMethod）模式

定义一个操作中的算法骨架，而将算法的一些步骤延迟到子类中，使得子类可以不改变该算法结构的情况下重定义该算法的某些特定步骤。  

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。

核心: 在抽象父类中封装子类的算法框架，它的 init方法可作为一个算法的模板，指导子类以何种顺序去执行哪些方法。由父类分离出公共部分，要求子类重写某些父类的（易变化的）抽象方法, 模板方法模式一般的实现方式为继承.  

### 14. 策略（Strategy）模式

定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的改变不会影响使用算法的客户。

一个基于策略模式的程序至少由两部分组成：  

第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。  
第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context 中要维持对某个策略对象的引用.  

策略模式可以用于组合一系列算法，也可用于组合一系列业务规则.  

```js
// 不同绩效有不同的奖金策略： 每个策略接受同类型的参数返回相同的结果
const strategies = {
  S(salary) {
    return salary * 3;
  },
  A(salary) {
    return salary * 2;
  },
  B(salary) {
    return salary;
  },
  C(salary) {
    return 0;
  },
};

const calculateBonus = (salary, strategy) => strategies[strategy](salary);

console.log(calculateBonus(10000, "S")); // 30000
console.log(calculateBonus(10000, "C")); // 0
```

### 15. 命令（Command）模式

将一个请求封装为一个对象，使发出请求的责任和执行请求的责任分割开。  

命令（command）指的是一个执行某些特定事情的指令  

核心: 命令中带有execute执行、undo撤销、redo重做等相关命令方法，建议显示地指示这些方法名  

```js
function IncrementCommand() {
  this.val = 0; // 当前值
  this.stack = []; // 命令栈
  this.stackPosition = -1; // 栈指针位置
}

IncrementCommand.prototype = {
  constructor: IncrementCommand,

  // 执行
  execute() {
    this.clearRedo();

    // 定义执行的处理
    const command = () => (this.val += 1);

    // 执行并缓存起来
    command();
    this.stack.push(command);
    this.stackPosition++;
    this.getValue();
  },

  canUndo() {
    return this.stackPosition >= 0;
  },

  canRedo() {
    return this.stackPosition < this.stack.length - 1;
  },

  // 撤销
  undo() {
    if (!this.canUndo()) {
      return;
    }
    this.stackPosition--;
    // 命令的撤销，与执行的处理相反
    const command = () => (this.val -= 1);
    // 撤销后不需要缓存
    command();
    this.getValue();
  },

  // 重做
  redo() {
    if (!this.canRedo()) {
      return;
    }

    // 执行栈顶的命令
    this.stack[++this.stackPosition]();
    this.getValue();
  },

  // 在执行时，已经撤销的部分不能再重做
  clearRedo() {
    this.stack = this.stack.slice(0, this.stackPosition + 1);
  },

  // 获取当前值
  getValue() {
    console.log(this.val);
  },
};

const incrementCommand = new IncrementCommand();

// 模拟事件触发，执行命令
const eventTrigger = {
  // 某个事件的处理中，直接调用命令的处理方法
  increment: function () {
    incrementCommand.execute();
  },

  incrementUndo: function () {
    incrementCommand.undo();
  },

  incrementRedo: function () {
    incrementCommand.redo();
  },
};

eventTrigger["increment"](); // 1
eventTrigger["increment"](); // 2
eventTrigger["incrementUndo"](); // 1
```

### 16. 职责链（Chain of Responsibility）模式

把请求从链中的一个对象传到下一个对象，直到请求被响应为止。通过这种方式去除对象之间的耦合。  

核心: 请求发送者只需要知道链中的第一个节点，弱化发送者和一组接收者之间的强联系，可以便捷地在职责链中增加或删除一个节点，同样地，指定谁是第一个节点也很便捷.  










### 17. 状态（State）模式

允许一个对象在其内部状态发生改变时改变其行为能力。

### 18. 观察者（Observer）模式

也叫发布-订阅模式  
多个对象间存在一对多关系，当一个对象发生改变时，把这种改变通知给其他多个对象，从而影响其他对象的行为。  

例如浏览器的dom事件通知机制(document.addEventListener)，以及vue框架中数据改变时自动刷新dom的双向绑定机制都是基于该模式  

```js
const Observer = function () {
  const clientList = {}; // 订阅者数组

  // 订阅
  this.listen = function (type, cb) {
    if (!clientList[type]) {
      clientList[type] = [];
    }

    // 收集订阅者的处理
    typeof cb === "function" && clientList[type].push(cb);
  };

  // 取消订阅
  this.remove = function (type, cb) {
    const fns = clientList[type];
    if (!cb) {
      clientList[type] = [];
    } else if (fns && fns.length) {
      clientList[type] = fns.filter((fn) => fn !== cb);
    }
  };

  // 通知订阅者
  this.trigger = function () {
    const key = [].shift.call(arguments),
      fns = clientList[key];

    if (fns && fns.length) {
      fns.map((fn) => fn.apply(this, arguments));
    }
  };
};

const observer = new Observer();

observer.listen("msg", function getMsg() {
  const value = [].pop.call(arguments);
  console.log(value + "来信了");
});

observer.trigger("msg", "Andy"); // Andy来信了
observer.trigger("msg", "Cindy"); // Cindy来信了
```

### 19. 中介者（Mediator）模式

中介者模式主要用于一个系统中存在大量的对象，而且这些大量的对象需要互相通信，因为两个对象需要通信，一个对象必须要持有另一个对象，这样就会导致，系统里每个对象都互相引用，会引起混乱，中介者把所有的对象都统一管理起来，其他的对象通过中介者去和别的对象通信。  

定义一个中介对象来简化原有对象之间的交互关系，降低系统中对象间的耦合度，使原有对象之间不必相互了解。使网状的多对多关系变成了相对简单的一对多关系（复杂的调度处理都交给中介者）  

```js
// 排名方法
const A = {
  score: 10,
  changeTo: function (score) {
    this.score = score;
    // 通过中介者获取
    rankMediator(A);
  },
};

const B = {
  score: 20,
  changeTo: function (score) {
    this.score = score;
    rankMediator(B);
  },
};

const C = {
  score: 30,
  changeTo: function (score) {
    this.score = score;
    rankMediator(C);
  },
};

// 中介者，计算排名
function rankMediator(person) {
  const scores = [A.score, B.score, C.score].sort(function (a, b) {
    return a < b;
  });
  console.log(scores.indexOf(person.score) + 1, scores);
}

A.changeTo(100); // 1 [ 100, 30, 20 ]
B.changeTo(200); // 1 [ 200, 100, 30 ]
C.changeTo(50); // 3 [ 200, 100, 50 ]
```

### 20. 迭代器（Iterator）模式

提供一种方法来顺序访问聚合对象中的一系列数据，而不暴露聚合对象的内部表示。

迭代器模式简单来说就是将迭代过程从业务逻辑中抽离，简化开发，其分为内迭代和外迭代。目前许多语言都已经内置了迭代器的实现，如ES5中的forEach函数就是一种内迭代的实现。  

```js
// 封装 对象和数组的遍历
function each(obj, cb) {
  let value;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; ++i) {
      value = cb.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  } else {
    for (let i in obj) {
      value = cb.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  }
}
```

### 21. 访问者（Visitor）模式

在不改变集合元素的前提下，为一个集合中的每个元素提供多种访问方式，即每个元素有多个访问者对象访问。

### 22. 备忘录（Memento）模式

在不破坏封装性的前提下，获取并保存一个对象的内部状态，以便以后恢复它。

### 23. 解释器（Interpreter）模式

提供如何定义语言的文法，以及对语言句子的解释方法，即解释器。











## 2. vue/react中应用什么设计模式

参考：[react/vue中的设计模式](https://zhuanlan.zhihu.com/p/270380299)
