# 1. react

## 1.1. react

### 1.1.1. 

### 1.1.2. 

### 1.1.3. react-css-modules

#### 1.1.3.1. **样式默认局部**

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
#### 1.1.3.2. **Compose 来组合样式**

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
  
#### 1.1.3.3. **class 命名技巧**

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

#### 1.1.3.4. **如何实现CSS，JS变量共享**

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
#### 1.1.3.5. CSS Modules 使用技巧

- CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

    + 不使用选择器，只使用 class 名来定义样式
    + 不层叠多个 class，只使用一个 class 把所有样式定义好
    + 所有样式通过 composes 组合来实现复用
    + 不嵌套
    
- 上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做.
  
#### 1.1.3.6. CSS Modules 结合 React 实践

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
  
  
#### 1.1.3.7. 外部如何覆盖局部样式

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

#### 1.1.3.8. 如何与全局样式共存

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










### 1.1.4. router

### 1.1.5. immutable.js

-api:[fromJS](http://facebook.github.io/immutable-js/docs/#/fromJS)
-github:[fromJS](https://github.com/facebook/immutable-js)
-介绍:[fromJS](https://www.w3ctech.com/topic/1595)

1. setIn 赋值
2. getIn 取值
3. mergeDeep
4. updateIn







### react 和 antd 的版本升级

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








