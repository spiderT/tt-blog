# 1. react

## 1.2. redux

以Shopping Cart为例

### 1.2.1 Action

#### 1.2.1.1 Action

Action是把数据从应用传到store的有效载荷。是store数据的**唯一**来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

- 添加新任务的 action 是这样的

>constants／ActionTypes.js

```js
export const ADD_TO_CART = 'ADD_TO_CART'
```
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

>actions／index.js

```js
import * as types from '../constants/ActionTypes'
```

#### 1.2.1.2 Action创建函数

在 Redux 中的 action 创建函数只是简单的返回一个 action:

>actions／index.js
```js
const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products
})
```
Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。

```js
export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}
```

store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下你会使用 react-redux 提供的 connect() 帮助器来调用。

### 1.2.2 Reducer







