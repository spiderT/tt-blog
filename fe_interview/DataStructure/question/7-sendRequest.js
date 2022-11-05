function sendRequest(urls, num, callback) {
  let res = [];
  function request(res) {
    console.log("urls.length", urls.length, "res", res);
    urls.length
      ? Promise.all(urls.splice(0, num).map((url) => fetch(url))).then((r) =>
          request(res.concat(r))
        )
      : callback(res);
  }
  request(res);
}

const fetch = function (idx) {
  return new Promise((resolve) => {
    console.log(`start request ${idx}`);
    // const timeout = parseInt(Math.random() * 1e4);
    setTimeout(() => {
      // console.log(`end request ${idx}`);
      resolve(idx);
      // }, timeout);
    }, 1000);
  });
};

const max = 4;
const urls = Array.from({ length: 12 }, (v, k) => k + 1);

const callback = () => {
  console.log("run callback");
};

sendRequest(urls, max, callback);
