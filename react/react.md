# 1. react

## 1.1. [高级指南](https://reactjs.org/docs/jsx-in-depth.html)

### 1.1.1 [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)

1. JSX 只是给React.createElement(component, props, ...children) 提供了语法糖

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
与下面的是相等的

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

没有子元素的时候，可以这样写

```js
<div className="sidebar" />
```

等同于

```js
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```

2.  点语法

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

3. 自定义的组件必须大写

```js
import React from 'react';

// Correct! This is a component and should be capitalized:
function Hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Correct! React knows <Hello /> is a component because it's capitalized.
  return <Hello toWhat="World" />;
}
```


4. JSX 的类型不能是一个表达式

    + 错误方式
    
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}

```
    + 正确方式
    
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}


```
    
5. Props in JSX
    
5.1. 字符串props, 下面两种写法一样的
    
```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />


<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
``` 
       
5.2. Props 默认是 “True” 
     
- 如果没有给prop赋值，默认是'true'

```js
// 同等
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

- 一般来说，我们不建议使用它，因为它可能与{foo：foo}而不是{foo：true}的ES6对象速记{foo}混淆。这种行为就是为了匹配HTML的行为

5.3. 扩展运算符

- 以下两种是等价的

```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

5.4 Booleans, Null, and Undefined 是被忽略的

```js
//以下是同等的
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>

```

- 一些应用场景

```js
//showHeader为true的时候，展示header组件
<div>
  {showHeader && <Header />}
  <Content />
</div>
```
> 0 还是会被渲染的，所以要值的注意

```js
<div>
{props.messages.length > 0 &&
 <MessageList messages={props.messages} />
}
</div>
```


- 如果你想展示false, true, null, or undefined ，首先得把他们转换成字符串

```js
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```

### 1.1.2 [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

> React.PropTypes 已经在 v15.5被移除了. 请使用 prop-types 库.


```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

- PropTypes 提供了一种验证，可以保证传入的数据格式是正确的，如果是一个无效数据，控制台会有一个警告。propTypes只有在开发环境才会检查。

1. 通过设置defaultProps 来设定默认值

```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
typechecking 也适用于defaultProps




### 1.1.3 [Static Type Checking](https://reactjs.org/docs/static-type-checking.html)


### 1.1.4 [Refs and the DOM
](https://reactjs.org/docs/refs-and-the-dom.html)


#### 1.1.4.1 什么时候用Refs

1. 管理焦点、文本选择或媒体回放。Managing focus, text selection, or media playback.
2. 触发必要的动画。Triggering imperative animations.
3. 与第三方DOM库集成。Integrating with third-party DOM libraries.


#### 1.1.4.2 不要过度使用Refs

1. 














    
    



























## 1.2. 

## 1.3. react-css-modules

### 1.3.1. **样式默认局部**

- 使用了 CSS Modules 后，就相当于给每个 class 名外加加了一个 :local，以此来实现样式的局部化，如果你想切换到全局模式，使用对应的 :global。

```css
.normal {
  color: green;
}

/* 以上与下面等价 */
:local(.normal) {
  color: green; 
}

/* 定义全局样式 */
:global(.btn) {
  color: red;
}

/* 定义多个全局样式 */
:global {
  .link {
    color: green;
  }
  .box {
    color: yellow;
  }
}
```
### 1.3.2. **Compose 来组合样式**

- 对于样式复用，CSS Modules 只提供了唯一的方式来处理：composes 组合

```css
/* components/Button.css */
.base { /* 所有通用的样式 */ }

.normal {
  composes: base;
  /* normal 其它样式 */
}

.disabled {
  composes: base;
  /* disabled 其它样式 */
}
```

```js
import styles from './Button.css';

buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
```

生成的 HTML 变为

```html
<button class="button--base-daf62 button--normal-abc53">Submit</button>
```

由于在 .normal 中 composes 了 .base，编译后会 normal 会变成两个 class。

- composes 还可以组合外部文件中的样式。

```css
/* settings.css */
.primary-color {
  color: #f40;
}

/* components/Button.css */
.base { /* 所有通用的样式 */ }

.primary {
  composes: base;
  composes: primary-color from './settings.css';
  /* primary 其它样式 */
}
```

- 对于大多数项目，有了 composes 后已经不再需要 Sass/Less/PostCSS。但如果你想用的话，由于 composes 不是标准的 CSS 语法，编译时会报错。就只能使用预处理器自己的语法来做样式复用了。
  
### 1.3.3. **class 命名技巧**

CSS Modules 的命名规范是从 BEM 扩展而来。BEM 把样式名分为 3 个级别，分别是：

- Block：对应模块名，如 Dialog

- Element：对应模块中的节点名 Confirm Button

- Modifier：对应节点相关的状态，如 disabled、highlight

- 综上，BEM 最终得到的 class 名为 dialog__confirm-button--highlight。使用双符号 __ 和 -- 是为了和区块内单词间的分隔符区分开来。虽然看起来有点奇怪，但 BEM 被非常多的大型项目和团队采用。我们实践下来也很认可这种命名方法。

- CSS Modules 中 CSS 文件名恰好对应 Block 名，只需要再考虑 Element 和 Modifier。BEM 对应到 CSS Modules 的做法是：
  
```css
/* .dialog.css */
.ConfirmButton--disabled {
}
```

你也可以不遵循完整的命名规范，使用 camelCase 的写法把 Block 和 Modifier 放到一起：

```css
/* .dialog.css */
.disabledConfirmButton {
}
```

### 1.3.4. **如何实现CSS，JS变量共享**

>注：CSS Modules 中没有变量的概念，这里的 CSS 变量指的是 Sass 中的变量

- 上面提到的 :export 关键字可以把 CSS 中的 变量输出到 JS 中。下面演示如何在 JS 中读取 Sass 变量：

```scss
/* config.scss */
$primary-color: #f40;

:export {
  primaryColor: $primary-color;
}
```

```js
/* app.js */
import style from 'config.scss';

// 会输出 #F40
console.log(style.primaryColor);
```
### 1.3.5. CSS Modules 使用技巧

- CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

    + 不使用选择器，只使用 class 名来定义样式
    + 不层叠多个 class，只使用一个 class 把所有样式定义好
    + 所有样式通过 composes 组合来实现复用
    + 不嵌套
    
- 上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做.
  
### 1.3.6. CSS Modules 结合 React 实践

- 在 className 处直接使用 css 中 class 名即可。

```css
/* dialog.css */
.root {}
.confirm {}
.disabledConfirm {}
```

```js
import classNames from 'classnames';
import styles from './dialog.css';

export default class Dialog extends React.Component {
  render() {
    const cx = classNames({
      [styles.confirm]: !this.state.disabled,
      [styles.disabledConfirm]: this.state.disabled
    });

    return <div className={styles.root}>
      <a className={cx}>Confirm</a>
      ...
    </div>
  }
}
```
- 注意，一般把组件最外层节点对应的 class 名称为 root。这里使用了 classnames 库来操作 class 名。
  如果你不想频繁的输入 styles.**，可以试一下 react-css-modules，它通过高阶函数的形式来避免重复输入 styles.**。
  
  
### 1.3.7. 外部如何覆盖局部样式

当生成混淆的 class 名后，可以解决命名冲突，但因为无法预知最终 class 名，不能通过一般选择器覆盖。我们现在项目中的实践是可以给组件关键节点加上 data-role 属性，然后通过属性选择器来覆盖样式。

```js
// dialog.js
  return <div className={styles.root} data-role='dialog-root'>
      <a className={styles.disabledConfirm} data-role='dialog-confirm-btn'>Confirm</a>
      ...
  </div>
```

```css
// dialog.css
[data-role="dialog-root"] {
  // override style
}
```

因为 CSS Modules 只会转变类选择器，所以这里的属性选择器不需要添加 :global。

#### 1.3.8. 如何与全局样式共存

前端项目不可避免会引入 normalize.css 或其它一类全局 css 文件。使用 Webpack 可以让全局样式和 CSS Modules 的局部样式和谐共存。下面是我们项目中使用的 webpack 部分配置代码：

```js
module: {
  loaders: [{
    test: /\.jsx?$/,
    loader: 'babel'
  }, {
    test: /\.scss$/,
    exclude: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css?modules&localIdentName=[name]__[local]!sass?sourceMap=true'
  }, {
    test: /\.scss$/,
    include: path.resolve(__dirname, 'src/styles'),
    loader: 'style!css!sass?sourceMap=true'
  }]
}
```

```js
/* src/app.js */
import './styles/app.scss';
import Component from './view/Component'

/* src/views/Component.js */
// 以下为组件相关样式
import './Component.scss';
```
目录结构如下：

```text
src
├── app.js
├── styles
│   ├── app.scss
│   └── normalize.scss
└── views
    ├── Component.js
    └── Component.scss
```

这样所有全局的样式都放到 src/styles/app.scss 中引入就可以了。其它所有目录包括 src/views 中的样式都是局部的。










## 1.4. router

## 1.5. immutable.js

-api:[fromJS](http://facebook.github.io/immutable-js/docs/#/fromJS)
-github:[fromJS](https://github.com/facebook/immutable-js)
-介绍:[fromJS](https://www.w3ctech.com/topic/1595)

1. setIn 赋值
2. getIn 取值
3. mergeDeep
4. updateIn





## 1.6  react组件间通信

### 1.6.1 父组件 向 子组件 传递信息

1. 主要是通过 prop进行传值

// 子组件
```js
import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {list} = this.props

    const option = list.map(item=><li key={item}>{item}</li>)

    return (
      <div>
        <ul>{option}</ul>
      </div>
    )
  }
}
```

// 父组件

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:['haha','aaaa','bbbb','ccccc']
    }
  }

  render() {
    const {data} = this.state

    return(
      <div>
          <Son list={data} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
```


2. 父组件 向更深层的 子组件 进行传递信息————利用（context）

- 首先在顶层组件中：定义了顶层组件所拥有的子类context对象——该顶层组件所拥有的的子类context对象为title，且必须为字符串。然后通过getChildText方法，来给子context对象的属性赋值；

- 越级传递：因为title属性，在一级子组件Son中并没有直接用到，因此我们可以直接传递到最底层（越级），在Grandson组件中使用；

- 最底层：声明了所接受到的context的子组件title的类型，声明必须为字符串。

// 孙子组件
```js
import React, {Component} from 'react'

export default class GrandSon extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    return (
      <div>
        <h1>{this.context.title}</h1>
      </div>
    )
  }
}

GrandSon.contextTypes = {
  title: React.PropTypes.string
}
```

// 子组件
```js
import React, {Component} from 'react'
import Grandson from './grandson'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {list} = this.props

    const option = list.map(item => <li key={item}>{item}</li>)

    return (
      <div>
        <Grandson />
        <ul>{option}</ul>
      </div>
    )
  }
}
```

// 父组件
```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:['haha','aaaa','bbbb','ccccc']
    }
  }

  getChildContext() {
    return {title: "列表"};
  }

  render() {
    const {data} = this.state

    return(
      <div>
          <Son list={data} />
      </div>
    )
  }
}
App.childContextTypes = {
  title: React.PropTypes.string
};

ReactDOM.render(<App />, document.getElementById('main'))
```


### 1.6.2 子组件 向 父组件 传递信息

- 依赖 props 来传递事件的引用，并通过回调的方式来实现的;

// 子组件

```js
import React, {Component} from 'react'

export default class Son extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange() {
    var newState = !this.state.checked
    this.setState({
      checked: newState
    })
    this.props.changeParent(newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.state.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}
```
// 父组件

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Son from './son'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }

  handleChange(value) {
    console.log('value', value);
    this.setState({
      value: value
    })
  }

  render() {

    const {value} = this.state

    return (
      <div>
        <h1>是否选中: {value > 0 ? '是' : '否'}</h1>
        <Son changeParent={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('main'))
```

- 在子组件利用 this.props.changeParent(newState) 触发父组件的方法，在父组件绑定changeParent={this.handleChange.bind(this)}，进而将子组件的数据（newState）传递到了父组件。


### 1.6.3 兄弟组件之间传值

- 使用PubSub监听机制传参

    + 发送消息：PubSub.publish(名称,参数)
    + 订阅消息：PubSub.subscrib(名称,函数)
    + 取消订阅：PubSub.unsubscrib(名称)
    
// check组件
 
```js
import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  handleChange() {
    var newState = !this.state.checked
    this.setState({
      checked: newState
    })
    PubSub.publish('checkmessage',newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.state.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}
``` 
// result组件
```js
import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }

  componentDidMount() {
    this.pubsub_check = PubSub.subscribe('checkmessage',function (topic, message) {
      this.setState({
        checked:message
      })
    }.bind(this))
  }

  componentWillUnmount(){
    PubSub.unsubscribe(this.pubsub_check)
  }

  render() {

    return (
      <div>
        <h1>选中了吗: {this.state.checked > 0 ? '是' : '否'}</h1>
      </div>
    )
  }
}
```

- 在check组件中发布一个消息checkmessage，在result组件中订阅这个消息，使得两个组件又产生了联系，进行传递的信息。


### 1.6.4 利用react-redux进行组件之间的状态信息共享

- Redux 的基本做法：用户发出 Action，Reducer 函数算出新的 State，View 重新渲染。

// actions

- 在里面定义actionType，也可以单独文件定义，然后引入进来
- action：存放数据的对象，即消息的载体。

```js
export const actionType = {
  CHECK_MESSAGE: 'CHECK_MESSAGE',
}

export const actions = {
  check (value){
    console.log('value', value);
    return dispatch => {
      dispatch({
        type: actionType.CHECK_MESSAGE,
        payload: {
          checked: !value
        }
      })
    }
  }
}
```

- 以下是两个组件，共享checked这个属性 

// components/check

```js
import React, {Component} from 'react'

export default class Check extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange() {
    var newState = this.props.checked
    this.props.check(newState)
  }

  render() {

    return (
      <div>
        <label>
          选择：
          <input type='checkbox' checked={this.props.checked} onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    )
  }
}
```

// components/result
```js
import React, {Component} from 'react'

export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {

    return (
      <div>
        <h1>选中了吗: {this.props.checked > 0 ? '是' : '否'}</h1>
      </div>
    )
  }
}
```

- connect来向component中注入state。

// containers/App
```js
import React,{Component}  from 'react'
import {connect} from 'react-redux'
import Check from '../components/check'
import Result from '../components/result'
import {actions} from '../actions'

class App  extends Component{


  render() {
    const props = this.props

    return (
      <div>
        <Result {...props} />
        <Check {...props} />
      </div>
    )
  }
}
export default connect(state => state, actions)(App)

```

- State 的计算过程就叫做 Reducer

// reducers

```js
import {actionType} from '../actions'

export const initState = {
  checked: false
}

export function reducer(state = initState, action) {
  const {type, payload} = action
  switch (type) {
    case actionType.CHECK_MESSAGE:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}
```

-  React Redux 组件 <Provider> 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

// index
```js
import React from 'react'
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { reducer, initState } from './reducers'


let buildStore = compose(applyMiddleware(thunk))(createStore)
let store = buildStore(reducer, initState)

export default class Page extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

ReactDOM.render(<Page/>, document.getElementById('main'))

```



## react 和 antd 的版本升级

[antd的升级方案](https://github.com/ant-design/ant-design/issues/3759)

1. [antd-migration-helper](https://github.com/ant-design/antd-migration-helper)

扫描项目代码，找出使用了废弃/移除 API 的地方，类似 ESLint

2. [antd-codemod](https://github.com/ant-design/antd-codemod)

自动修改代码

```shell
jscodeshift -t getFieldProps-to-getFieldDecorator.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client
jscodeshift -t time-related-value-to-moment.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client
jscodeshift -t GregorianCalendar-to-moment.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client
jscodeshift -t Popover-overlay-to-content.js /Users/lianjia/tt/project/ljfe-ehr-estuary/src/client

```

3. 自测，处理antd 内置的 warning












