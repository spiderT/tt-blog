var p = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(p) // 报错 TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible