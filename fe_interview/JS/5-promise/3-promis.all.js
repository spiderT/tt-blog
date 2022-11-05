// 手写Promise.all()
Promise.all = function (iterators) {
  const promises = Array.from(iterators);
  const len = promises.length;
  let count = 0;
  let resultList = [];
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((result) => {
          count++;
          resultList[index] = result;
          if (count === len) {
            resolve(resultList);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};


