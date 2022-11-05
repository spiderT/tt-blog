function SetManager(name) {
  this.manager = name;
}

SetManager.prototype.getName = function () {
  console.log(this.manager);
};

const SingletonSetManager = (function () {
  let manager = null;

  return function (name) {
    if (!manager) {
      manager = new SetManager(name);
    }

    return manager;
  };
})();

SingletonSetManager("a").getName(); // a
SingletonSetManager("b").getName(); // a
SingletonSetManager("c").getName(); // a
