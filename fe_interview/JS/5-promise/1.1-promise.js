class MyPromise {
  constructor(executor) {
    this.PENDING = "pending";
    this.FULFILLED = "fulfilled";
    this.REJECTED = "rejected";
    this.state = this.PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      if (this.state === this.PENDING) {
        this.state = this.FULFILLED;
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.state === this.PENDING) {
        this.state = this.REJECTED;
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === this.FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.state === this.REJECTED) {
      onRejected(this.reason);
    }
    // 当状态state为pending时
    if (this.state === this.PENDING) {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

new MyPromise((resolve, reject) => {
  resolve(2);
}).then((res) => console.log("res", res));
