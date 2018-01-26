const Container = function (x) {
  this.__value = x;
}

Container.of = function (x) {
  return new Container(x);
};


// 以下是node打印结果

// console.log(Container.of(3)); //Container { __value: 3 }

// console.log(Container.of(Container.of({name: '小明'}))); //Container { __value: Container { __value: { name: '小明' } } }


Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}


console.log(Container.of(2).map(function (two) {
  return two + 2
}));
// Container { __value: 4 }

console.log(Container.of("flamethrowers").map(function (s) {
  return s.toUpperCase()
}));
// Container { __value: 'FLAMETHROWERS' }


const Maybe = function (x) {
  this.__value = x
}

Maybe.of = function (x) {
  return new Maybe(x)
}

Maybe.prototype.isNothing = function () {
  return (this.__value === null || this.__value === undefined)
}

// Maybe 会先检查自己的值是否为空，然后才调用传进来的函数。
Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}

const _ = require('lodash');

const add = function (x) {
  return function (y) {
    return x + y
  }
}


//点记法（dot notation syntax）
console.log(Maybe.of({name: "小明", age: 9}).map(_.property("age")).map(add(10))); //19




const curry = require('lodash').curry
const moment = require('moment')


const either = curry(function(f, g, e) {
  switch(e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
  }
});

//  getAge :: Date -> User -> Either(String, Number)
const getAge = curry(function(now, user) {
  var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if(!birthdate.isValid()) return Left.of("Birth date could not be parsed");
  return Right.of(now.diff(birthdate, 'years'));
});

const compose = function(f,g) {
  return function(x) {
    return f(g(x));
  };
}


const zoltar = compose(map(console.log), map(fortune), getAge(moment()));

console.log(zoltar({bitrhdate: '1991-12-12'}));

console.log(zoltar({bitrhdate: 'tt'}));



















