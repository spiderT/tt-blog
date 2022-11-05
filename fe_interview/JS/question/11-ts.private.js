// 基于闭包的实现方式
// 另外一种比较普遍的方式是利用JavaScript的闭包特性。构造函数内定义局部变量和特权函数，其实例只能通过特权函数访问此变量，如下：

function Person(name) {
  var _name = name;
  this.getName = function () {
    return _name;
  };
}

var person = new Person("Joe");
// 这种方式的优点是实现了私有属性的隐藏，Person 的实例并不能直接访问_name属性，只能通过特权函数getName获取：

alert(person._name); // undefined
alert(person.getName()); //'Joe'
