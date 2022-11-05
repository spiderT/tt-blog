function a() {
  return () => {
    return () => {
      console.log(this === global); // true
    };
  };
}
console.log(a()()());
