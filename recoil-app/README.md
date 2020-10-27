# recoil

react的状态管理库https://recoiljs.org/  
Recoil 本身就是为了解决 React 全局数据流管理的问题，采用分散管理原子状态的设计模式。  
状态管理单位 Atom，它是可更新和可订阅的，当一个 Atom 被更新时，每个被订阅的组件都会用新的值来重新渲染。如果从多个组件中使用同一个 Atom ，所有这些组件都会共享它们的状态。  
atom组件可以订阅的状态。selectors改变这种状态同步或异步。  

## 安装

npm

```text
npm install recoil
```

yarn

```text
yarn add recoil
```

## RecoilRoot

使用 recoil 状态的组件需要使用 RecoilRoot 包裹起来。最好放在根组件:

```js
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

## Atom

Atom代表一块的状态。Atom可以读取和写入任何组件. 可以被任何组件订阅，当一个 Atom 被更新时，每个被订阅的组件都会用新的值来重新渲染。  
要创建一个 Atom ，必须要提供一个 key ，其必须在 RecoilRoot 作用域中是唯一的，并且要提供一个默认值，默认值可以是一个静态值、函数甚至可以是一个异步函数。  

```js
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
```

订阅和更新状态  

Recoil 采用 Hooks 方式订阅和更新状态，常用的是下面三个 API：  

- useRecoilState：类似 useState 的一个 Hook，可以取到 atom 的值以及 setter  
- useSetRecoilState：只获取 setter 函数，如果只使用了这个函数，状态变化不会导致组件重新渲染  
- useRecoilValue：只获取状态  

组件使用useRecoilState()读和写atom  

```js
function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

## selector

selector 表示一段派生状态，它使我们能够建立依赖于其他 atom 的状态。它有一个强制性的 get 函数，其作用与 redux 的 reselect 或 MobX 的 @computed 类似。  

selector 是一个纯函数：对于给定的一组输入，它们应始终产生相同的结果（至少在应用程序的生命周期内）。这一点很重要，因为选择器可能会执行一次或多次，可能会重新启动并可能会被缓存.

```js
const lengthState = selector({  
  key: 'lengthState',
  get: ({get}) => {  
    const text = get(nameState);  
    return text.length;  
  },  
});  
function NameLength() {  
  const length = useRecoilValue(charLengthState);  
  return <>Name Length: {length}</>;  
}
```




