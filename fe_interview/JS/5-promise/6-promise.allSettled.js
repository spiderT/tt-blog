Promise.allSettled = function (promises) {
  return new Promise((resolve) => {
    const data = [],
      len = promises.length;
    let count = len;
    for (let i = 0; i < len; i += 1) {
      const promise = promises[i];
      promise
        .then(
          (res) => {
            data[i] = { status: "fulfilled", value: res };
          },
          (error) => {
            data[i] = { status: "rejected", reason: error };
          }
        )
        .finally(() => {
          // promise has been settled
          if (!--count) {
            resolve(data);
          }
        });
    }
  });
};
