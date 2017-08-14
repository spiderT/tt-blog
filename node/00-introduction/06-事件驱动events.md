# node

## 0. introduction

### 0.6 事件驱动 events

- events 是 Node.js 最重要的模块，原因是 Node.js 本身架构就是事件式 的，而它提供了唯一的接口

#### 0.6.1 事件发射器

- events 模块只提供了一个对象: events.EventEmitter。EventEmitter 的核心就 是事件发射与事件监听器功能的封装.

- EventEmitter 的每个事件由一个事件名和若干个参 数组成，事件名是一个字符串，通常表达一定的语义。

- 对于每个事件，EventEmitter 支持 若干个事件监听器。当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作 为回调函数参数传递。

>Example

```js
const events=require('events');

const emitter=new events.EventEmitter();

emitter.on('someEvent',function (arg1,arg2) {
    console.log('listener1',arg1,arg2);
})

emitter.on('someEvent',function (arg1,arg2) {
    console.log('listener2',arg1,arg2);
})

emitter.emit('someEvent','abd',1991);
//listener1 abd 1991
//listener2 abd 1991

```
- EventEmitter.on(event, listener) 为指定事件注册一个监听器，接受一个字符串event 和一个回调函数listener。
- EventEmitter.emit(event, [arg1], [arg2], [...]) 发射 event 事件，传递若干可选参数到事件监听器的参数表。
- EventEmitter.once(event, listener) 为指定事件注册一个单次监听器，即监听器最多只会触发一次，触发后立刻解除该监听器。
- EventEmitter.removeListener(event, listener) 移除指定事件的某个监听器，listener 必须是该事件已经注册过的监听器。
- EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定 event，则移除指定事件的所有监听器。

#### 0.6.2 error事件

- 在遇到 异常的时候通常会发射 error 事件。

- 当 error 被发射时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并打印调用栈。

```js
const events=require('events');

const emitter=new events.EventEmitter();

emitter.emit('error');
```

#### 0.6.3 继承 EventEmitter

- 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

- 首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发射应该是一个对象的方法。其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

