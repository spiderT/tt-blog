// 创建了两个具体的工厂：EmployeeFactory和VendorFactory。EmployeeFactory用于创建Employee的实例，VendorFactory用于创建Vendor的实例。两种产品都可以看做是人员类型（具有相同的接口），所以客户可以将它们看做是相同。在run函数中，我们通过不同的工厂创建了两个员工和两个供应商，它们存储在同一个数组中。每个员工或供应商都要说出他们的名字和类型。日志函数用来收集和显示结果。

//员工类
function Employee(name) {
  this.name = name;
  this.say = function () {
    log.add("我是员工：" + name);
  };
}
//员工工厂
function EmployeeFactory() {
  this.create = function (name) {
    return new Employee(name);
  };
}
//供应商类
function Vendor(name) {
  this.name = name;
  this.say = function () {
    log.add("我是供应商：" + name);
  };
}
//供应商工厂
function VendorFactory() {
  this.create = function (name) {
    return new Vendor(name);
  };
}
// 日志函数
const log = (function () {
  let log = "";
  return {
    add: function (msg) {
      log += msg + "\n";
    },
    show: function () {
      console.log(log);
      log = "";
    },
  };
})();
function run() {
  const persons = [];
  const employeeFactory = new EmployeeFactory();
  const vendorFactory = new VendorFactory();
  persons.push(employeeFactory.create("张三"));
  persons.push(employeeFactory.create("李四"));
  persons.push(vendorFactory.create("王麻子"));
  persons.push(vendorFactory.create("赵六"));
  for (let i = 0, len = persons.length; i < len; i++) {
    persons[i].say();
  }
  log.show();
}
run();
