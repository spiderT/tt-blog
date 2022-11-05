// 以展示不同类型的变量为例，设置一条职责链，可以免去多重if条件分支
// 定义链的某一项
function ChainItem(fn) {
  this.fn = fn;
  this.next = null;
}

ChainItem.prototype = {
  constructor: ChainItem,

  // 设置下一项
  setNext: function (next) {
    this.next = next;
    return next;
  },

  // 开始执行
  start: function () {
    this.fn.apply(this, arguments);
  },

  // 转到链的下一项执行
  toNext: function () {
    if (this.next) {
      this.start.apply(this.next, arguments);
    } else {
      console.log("无匹配的执行项目");
    }
  },
};

// 展示数字
function showNumber(num) {
  if (typeof num === "number") {
    console.log("number", num);
  } else {
    // 转移到下一项
    this.toNext(num);
  }
}

// 展示字符串
function showString(str) {
  if (typeof str === "string") {
    console.log("string", str);
  } else {
    this.toNext(str);
  }
}

// 展示对象
function showObject(obj) {
  if (typeof obj === "object") {
    console.log("object", obj);
  } else {
    this.toNext(obj);
  }
}

const chainNumber = new ChainItem(showNumber);
const chainString = new ChainItem(showString);
const chainObject = new ChainItem(showObject);

// 设置链条
chainObject.setNext(chainNumber).setNext(chainString);

chainString.start("12"); // string 12
chainNumber.start({}); // 无匹配的执行项目
chainObject.start({}); // object {}
chainObject.start(123); // number 123

// 想判断未定义的时候呢，直接加到链中即可

// 展示未定义
function showUndefined(obj) {
  if (typeof obj === "undefined") {
    console.log("undefined");
  } else {
    this.toNext(obj);
  }
}

const chainUndefined = new ChainItem(showUndefined);
chainString.setNext(chainUndefined);

chainNumber.start(); // undefined
