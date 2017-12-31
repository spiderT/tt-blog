# 1. redux

如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- Redux 的适用场景：多交互、多数据源。

 + 用户的使用方式复杂
 + 不同身份的用户有不同的使用方式（比如普通用户和管理员）
 + 多个用户之间可以协作
 + 与服务器大量交互，或者使用了WebSocket
 + View要从多个来源获取数据


- 从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux.

 + 某个组件的状态，需要共享
 + 某个状态需要在任何地方都可以拿到
 + 一个组件需要改变全局状态
 + 一个组件需要改变另一个组件的状态
 
- Redux 的设计思想:

 + Web 应用是一个状态机，视图与状态是一一对应的。
 + 所有的状态，保存在一个对象里面。
  


## 1.2.1 Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

### 1.2.1.1 Action

- Action是把数据从应用传到store的有效载荷。是store数据的**唯一**来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

- 添加新任务的 action 是这样的

>constants／ActionTypes.js

```js
export const ADD_TODO = 'ADD_TODO'
```
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

>actions／index.js

```js
export const addTodo = text => ({ type: types.ADD_TODO, text })
```
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

### 1.2.1.2 Action创建函数

- View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

- 在 Redux 中的 action 创建函数只是简单的返回一个 action:

>actions／index.js

```js
export const addTodo = text => ({ type: types.ADD_TODO, text })
```
Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。

```js
dispatch(addTodo(text))
dispatch(completeTodo(index))
```

或者创建一个 被绑定的 action 创建函数 来自动 dispatch：

```js
const boundAddTodo = (text) => dispatch(addTodo(text))
const boundCompleteTodo = (index) => dispatch(completeTodo(index))

//然后直接调用它们：

boundAddTodo(text);
boundCompleteTodo(index);
```

store 里能直接通过 store.dispatch() 调用 dispatch() 方法，但是多数情况下你会使用 react-redux 提供的 connect() 帮助器来调用。

bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。


## 1.2.2 Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。 Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

- **永远不要在 reducer 里做这些操作：**

 + 修改传入参数；
 + 执行有副作用的操作，如 API 请求和路由跳转；
 + 调用非纯函数，如 Date.now() 或 Math.random()。

- 整个应用的初始状态，可以作为 State 的默认值

>reducers/todos.js

```js
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    ...
    
    default:
      return state
  }
}
```

>注意:

- 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。

- 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。


### 1.2.2.1 combineReducers

- Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

```js
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp;
```
- 这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名

- 你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：
 
```js
const reducer = combineReducers({
         a: doSomethingWithA,
         b: processB,
         c: c
       })
       function reducer(state = {}, action) {
         return {
           a: doSomethingWithA(state.a, action),
           b: processB(state.b, action),
           c: c(state.c, action)
         }
  }
```  
  
>combineReducers 接收一个对象，可以把所有顶级的 reducer 放到一个独立的文件中，通过 export 暴露出每个 reducer 函数，然后使用 import * as reducers 得到一个以它们名字作为 key 的 object：

```js
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const todoApp = combineReducers(reducers) 
```
 
## 1.2.3 Store
 
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

- Store 有以下职责：

 + 维持应用的 state；
 + 提供 getState() 方法获取 state；
 + 提供 dispatch(action) 方法更新 state；
 + 通过 subscribe(listener) 注册监听器;
 + 通过 subscribe(listener) 返回的函数注销监听器。

- Redux 提供createStore这个函数，用来生成 Store。

```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```

- createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。

```js
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```

## 1.2.4 组件

- React-Redux 将所有组件分成两大类：UI 组件（component）和容器组件（container）

- **UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑**


### 1.2.4.1 UI组件

UI 组件有以下几个特征:

  + 只负责 UI 的呈现，不带有任何业务逻辑
  + 没有状态（即不使用this.state这个变量）
  + 所有数据都由参数（this.props）提供
  + 不使用任何 Redux 的 API


>因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

### 1.2.4.2 容器组件

容器组件的特征:

  + 负责管理数据和业务逻辑，不负责 UI 的呈现
  + 带有内部状态
  + 使用 Redux 的 API
  
  
>如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。

>React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。  
  
>明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入.

|               | 容器组件           | 展示组件         |
| ------------- |:-------------:   | -----:         |
| Location      | 最顶层，路由处理     | 最顶层，路由处理  |
| Aware of Redux|  是               |   否           |
| 读取数据        |从Redux获取state   |从props获取数据   |
| 修改数据        |向Redux派发actions |从props调用回调函数|


### 1.2.4.3 连接到 Redux

将 App 组件连接到 Redux 并且让它能够 dispatch actions 以及从 Redux store 读取到 state。

- 首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，并且在渲染之前将根组件包装进 <Provider>。

```js
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp);

let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
- 原理是React组件的context属性

```js
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}
```


- 接着，我们想要通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。尽量只做一个顶层的组件，或者 route 处理。

```js
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({todos, actions}) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

```

- connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

#### 1.2.4.3.1 mapStateToProps

- mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
  作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射.
  
```js
const mapStateToProps = state => ({
  todos: state.todos
})
```  
- mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

- mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。


#### 1.2.4.3.2 mapDispatchToProps

mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

- bindActionCreators

- bindActionCreators(actionCreators, dispatch)
  把 action creators 转成拥有同名 keys 的对象，但使用 dispatch 把每个 action creator 包围起来，这样可以直接调用它们。

```js
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
```

### 1.2.5 React-Router 路由库

- 可以使用Provider在Router外面包一层。

```js
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```
  









