var nums = 10000000;

var result = 0;
for (var i = 0; i < nums; i += 1) {
    result += i;
}

self.postMessage({command: 'postDataToMain', payload: result})