var arr = [];
var output = (i) =>
  new Promise((res) => {
    setTimeout(() => {
      console.log(i);
      res();
    }, 1000 * i);
  });
for (var i = 0; i < 5; i++) {
  arr.push(output(i));
}
Promise.all(arr).then(() => console.log(5));
