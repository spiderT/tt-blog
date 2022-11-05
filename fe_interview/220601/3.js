console.log(1);
setTimeout((e) => {
  console.log(2);
}, 20);
new Promise((resolve) => {
  console.log(3);
  resolve();
  setTimeout((e) => {
    console.log(4);
  }, 20);
}).then((data) => {
  console.log(5);
});
console.log(6);
