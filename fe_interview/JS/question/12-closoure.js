function test() {
  let num = 1;
  let string = "string";
  let bool = true;
  let obj = {
    attr1: 1,
    attr2: "string",
    attr3: true,
    attr4: "other",
  };
  return function log() {
    console.log(num, string, bool, obj);
  };
}

const log = test();
console.dir(log);
