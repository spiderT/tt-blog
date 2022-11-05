function bar() {
  console.log(myName);
}
function foo() {
  var myName = "A";
  bar();
}
var myName = "B";
foo(); // B
