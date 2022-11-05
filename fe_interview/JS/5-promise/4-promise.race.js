Promise.race = function (promiseArr) {
  return new Promise(function (resolve, reject) {
    const length = promiseArr.length;
    if (length === 0) {
      return resolve();
    }

    for (let item of promiseArr) {
      Promise.resolve(item).then(
        function (value) {
          return resolve(value);
        },
        function (reason) {
          return reject(reason);
        }
      );
    }
  });
};
