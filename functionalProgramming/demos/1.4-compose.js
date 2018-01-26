const compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
}

const toUpperCase = function (x) {
  return x.toUpperCase()
}

const exclaim = function (x) {
  return x + '!'
}

const shout = compose(exclaim,toUpperCase)

console.log(shout('hello')); //HELLO!


/*
const reduce = require('lodash').reduce

const head = function (x) {
  return x[0]
}

const reverse = reduce(function (acc, x) {
  return [x].concat(acc)
},[])


const last = compose(head, reverse)

const arr = ['abc','123','一二三']

console.log(last(arr));*/
