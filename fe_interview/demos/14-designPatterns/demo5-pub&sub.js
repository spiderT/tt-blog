// 小A在公司C完成了笔试及面试，小B也在公司C完成了笔试。他们焦急地等待结果，每隔半天就电话询问公司C，导致公司C很不耐烦。一种解决办法是 AB直接把联系方式留给C，有结果的话C自然会通知AB这里的“询问”属于显示调用，“留给”属于订阅，“通知”属于发布

// 观察者
const observer = {
  // 订阅集合
  subscribes: [],

  // 订阅
  subscribe: function (type, fn) {
    if (!this.subscribes[type]) {
      this.subscribes[type] = [];
    }

    // 收集订阅者的处理
    typeof fn === "function" && this.subscribes[type].push(fn);
  },

  // 发布  可能会携带一些信息发布出去
  publish: function () {
    const type = [].shift.call(arguments),
      fns = this.subscribes[type];

    // 不存在的订阅类型，以及订阅时未传入处理回调的
    if (!fns || !fns.length) {
      return;
    }

    // 挨个处理调用
    for (let i = 0; i < fns.length; ++i) {
      fns[i].apply(this, arguments);
    }
  },

  // 删除订阅
  remove: function (type, fn) {
    // 删除全部
    if (typeof type === "undefined") {
      this.subscribes = [];
      return;
    }

    const fns = this.subscribes[type];

    // 不存在的订阅类型，以及订阅时未传入处理回调的
    if (!fns || !fns.length) {
      return;
    }

    if (typeof fn === "undefined") {
      fns.length = 0;
      return;
    }

    // 挨个处理删除
    for (let i = 0; i < fns.length; ++i) {
      if (fns[i] === fn) {
        fns.splice(i, 1);
      }
    }
  },
};

// 订阅岗位列表
function jobListForA(jobs) {
  console.log("A", jobs);
}

function jobListForB(jobs) {
  console.log("B", jobs);
}

observer.subscribe("job", jobListForA);
observer.subscribe("job", jobListForB);


observer.publish("job", ["前端", "后端", "测试"]); // 输出A和B的岗位

// A都取消订阅了岗位
observer.remove("job", jobListForA);

observer.publish("job", ["前端", "后端", "测试"]); // 输出B的岗位
