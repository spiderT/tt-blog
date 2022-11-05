const promise = Promise.resolve().then(() => {
  return promise;
});
promise.catch(console.error);

// TypeError: Chaining cycle detected for promise #<Promise>
