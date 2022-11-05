// 发布订阅
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, cb) {
    if (!this.events[type]) {
      this.events[type] = [cb];
    } else {
      this.events[type].push(cb);
    }
  }

  remove(type, cb) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((item) => item !== cb);
    }
  }

  emit() {
    const type = [].shift.call(arguments);
    this.events[type]?.map((cb) => cb(arguments));
  }
}

const observer = new EventEmitter();

observer.on("msg", function getMsg(value) {
  console.log(value[0] + "来信了");
});

observer.on("aa", function getMsg(value) {
  console.log(value[0] + "--aa");
});

observer.emit("msg", "Andy");
observer.emit("aa", "Cindy");
