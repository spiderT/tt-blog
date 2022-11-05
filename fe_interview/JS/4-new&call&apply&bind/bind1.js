import { func } from "prop-types";

// 因为bind转换后的函数可以作为构造函数使用，此时this应该指向构造出的实例，而不是bind绑定的第一个参数
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  //返回一个绑定this的函数，这里我们需要保存this
  const _this = this;
  const args = [...arguments].slice(1);
  //返回一个函数
  return function F() {
    //因为返回一个函数，我们可以new F()需要判断能当做构造函数吗
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

Function.prototype.myBind = function (cotext) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  } 

  const self = this;

  const args = [...arguments].slice(1);
  return function F(){
    if( f instanceof F){
      return new self(...args, ...arguments)
    }
    return self.apply(context, args.concat(...arguments))
  }







};
