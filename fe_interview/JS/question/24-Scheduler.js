class Scheduler {
  // 问题：修改 Scheduler 类 add 方法，维护最大并发为两个
  constructor() {
    this.rtasks = [];
    this.maxlimit = 2;
  }
  add(promiseFunc) {
    if (this.rtasks.length >= this.maxlimit) {
      return Promise.race(this.rtasks).then(() => this.add(promiseFunc));
    }
    let task = promiseFunc();
    let rt = task.then(() => this.rtasks.splice(this.rtasks.indexOf(rt), 1));
    console.log('rt');
    this.rtasks.push(rt);
    return rt;
  }
}
const scheduler = new Scheduler();

const timeout = (time) => {
  return new Promise((r) => setTimeout(r, time));
};

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4); // log: 2 3 1 4
