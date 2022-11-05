console.log("begin");

setTimeout(() => {
  console.log("settimeout1");

  Promise.resolve()
    .then(() => {
      console.log("promise1");

      setTimeout(() => {
        console.log("settimeout2 between promise1&2");
      });
    })
    .then(() => console.log("promise2"));
}, 0);

console.log('end')


// begin
// end
// settimeout1
// promise1
// promise2
// settimeout2 between promise1&2
