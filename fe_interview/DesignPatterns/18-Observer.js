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
