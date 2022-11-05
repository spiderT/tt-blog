var a = 1;
function output() {
  console.log(a);
  var a = 2;
  console.log(a);
}
console.log(a);
output();
console.log(a);

// 1
// undefined
// 2
// 1
