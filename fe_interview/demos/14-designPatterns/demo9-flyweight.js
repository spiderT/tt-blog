// example: 要对某个班进行身体素质测量，仅测量身高体重来评判
// 健康测量
function Fitness(name, sex, age, height, weight) {
  this.name = name;
  this.sex = sex;
  this.age = age;
  this.height = height;
  this.weight = weight;
}

// 开始评判
Fitness.prototype.judge = function () {
  let ret = this.name + ": ";

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

const a = new Fitness("A", "male", 18, 160, 80);
const b = new Fitness("B", "male", 21, 180, 70);
const c = new Fitness("C", "female", 28, 160, 80);
const d = new Fitness("D", "male", 18, 170, 60);
const e = new Fitness("E", "female", 18, 160, 40);

// !!!!!!评判五个人就需要创建五个对象，一个班就几十个对象
// 开始评判
a.judge(); // A: false
b.judge(); // B: false
c.judge(); // C: false
d.judge(); // D: true
e.judge(); // E: true

// 享元模式
// 可以将对象的公共部分（内部状态）抽离出来，与外部状态独立。将性别看做内部状态即可，其他属性都属于外部状态。
// 这么一来我们只需要维护男和女两个对象（使用factory对象），而其他变化的部分则在外部维护（使用manager对象）
// 健康测量
function Fitness(sex) {
  this.sex = sex;
}

// 工厂，创建可共享的对象
const FitnessFactory = {
  objs: [],

  create: function (sex) {
    if (!this.objs[sex]) {
      this.objs[sex] = new Fitness(sex);
    }

    return this.objs[sex];
  },
};

// 管理器，管理非共享的部分
const FitnessManager = {
  fitnessData: {},
  // 添加一项
  add: function (name, sex, age, height, weight) {
    const fitness = FitnessFactory.create(sex);
    // 存储变化的数据
    this.fitnessData[name] = {
      age: age,
      height: height,
      weight: weight,
    };
    return fitness;
  },

  // 从存储的数据中获取，更新至当前正在使用的对象
  updateFitnessData: function (name, obj) {
    const fitnessData = this.fitnessData[name];
    for (let item in fitnessData) {
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
  let ret = name + ": ";

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
