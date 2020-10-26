# babel

官网：https://babeljs.io/  

Babel是一个JavaScript编译器，是一个工具链，使用ECMAScript 2015 +代码转换成JavaScript的向后兼容版本。  

此外它还拥有众多模块可用于不同形式的静态分析。  
静态分析是在不需要执行代码的前提下对代码进行分析的处理过程 （执行代码的同时进行代码分析即是动态分析）。 静态分析的目的是多种多样的， 它可用于语法检查，编译，代码高亮，代码转换，优化，压缩等等场景。  

## 1.常见plugins

### 1.1. JSX and React

```text
npm install --save-dev @babel/preset-react
```

### 1.2. TypeScript

```text
npm install --save-dev @babel/preset-typescript
```

## 2. babel原理

通过 babel 我们可以很方便的实现这一切，你需要用到的就是 babel 中的三个包：  

- @babel/parser 用于把代码转换为 AST  
- @babel/traverse 用于遍历 AST，在这个过程中你就可以修改你的代码了  
- @babel/generator 把 AST 生成为最终代码  

除了这三个包以外还有一些辅助的工具包：
[@babel/types](https://babeljs.io/docs/en/babel-types) 对 AST 的节点做一些类型判断或者生成一些新的类型节点等.  

### 2.1. 解析（parse）

解析步骤接收代码并输出 AST。 这个步骤分为两个阶段：词法分析（Lexical Analysis）和 语法分析（Syntactic Analysis）。  

Babel 使用一个基于 ESTree 并修改过的 AST。怎么知道代码的语法树是什么样子的呢？你可以通过 https://astexplorer.net/ 这个工具在线查看代码的 AST 结构.  

example:  

```js
function square(n) {
  return n * n;
}
```

这个程序可以被表示成如下的一棵树：

```text
- FunctionDeclaration:
  - id:
    - Identifier:
      - name: square
  - params [1]
    - Identifier
      - name: n
  - body:
    - BlockStatement
      - body [1]
        - ReturnStatement
          - argument
            - BinaryExpression
              - operator: *
              - left
                - Identifier
                  - name: n
              - right
                - Identifier
                  - name: n
```

### 2.1.1. 词法分析

词法分析阶段把字符串形式的代码转换为 令牌（tokens） 流。

可以把令牌看作是一个扁平的语法片段数组：

```text
n * n;
```

```text
[
  { type: { ... }, value: "n", start: 0, end: 1, loc: { ... } },
  { type: { ... }, value: "*", start: 2, end: 3, loc: { ... } },
  { type: { ... }, value: "n", start: 4, end: 5, loc: { ... } },
  ...
]
```

每一个 type 有一组属性来描述该令牌：

```text
{
  type: {
    label: 'name',
    keyword: undefined,
    beforeExpr: false,
    startsExpr: true,
    rightAssociative: false,
    isLoop: false,
    isAssign: false,
    prefix: false,
    postfix: false,
    binop: null,
    updateContext: null
  },
  ...
}
```

和 AST 节点一样它们也有 start，end，loc 属性。  

### 2.1.2. 语法分析

语法分析阶段会把一个令牌流转换成 AST 的形式。 这个阶段会使用令牌中的信息把它们转换成一个 AST 的表述结构，这样更易于后续的操作。  

## 2.2. 遍历

转换 AST ,需要进行递归的树形遍历。  

一个 FunctionDeclaration 类型。它有几个属性：id，params，和 body，每一个都有一些内嵌节点。  

```text
{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
```

从 FunctionDeclaration 开始并且我们知道它的内部属性（即：id，params，body），所以我们依次访问每一个属性及它们的子节点。  

接着我们来到 id，它是一个 Identifier。Identifier 没有任何子节点属性，所以我们继续。  

之后是 params，由于它是一个数组节点所以我们访问其中的每一个，它们都是 Identifier 类型的单一节点，然后我们继续。  

此时我们来到了 body，这是一个 BlockStatement 并且也有一个 body节点，而且也是一个数组节点，我们继续访问其中的每一个。  

这里唯一的一个属性是 ReturnStatement 节点，它有一个 argument，我们访问 argument 就找到了 BinaryExpression。  

BinaryExpression 有一个 operator，一个 left，和一个 right。 Operator 不是一个节点，它只是一个值因此我们不用继续向内遍历，我们只需要访问 left 和 right。  

Babel 的转换步骤全都是这样的遍历过程。  










参考：https://babeljs.io/  
https://juejin.im/entry/6844903568332308487#toc-traversal  
https://www.yuque.com/yuzhidao/life/yzuq0r  
