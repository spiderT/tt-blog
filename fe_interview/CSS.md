# CSS

- [CSS](#css)
  - [1. BFC](#1-bfc)
  - [2. flex布局](#2-flex布局)
  - [3. grid布局](#3-grid布局)
  - [4. css 3D 加速](#4-css-3d-加速)
  - [5. css伪类和伪元素](#5-css伪类和伪元素)
  - [6. 浏览器的绘制原理，浏览器重绘(Repaint)和回流(Reflow重排)](#6-浏览器的绘制原理浏览器重绘repaint和回流reflow重排)
  - [面试题](#面试题)
    - [1. css 垂直居中](#1-css-垂直居中)
    - [2. css 的 10px 字体无法显示的解决方案](#2-css-的-10px-字体无法显示的解决方案)
    - [3. 多行省略](#3-多行省略)
    - [4. 自适应 search 框; input + button 布局](#4-自适应-search-框-input--button-布局)
    - [5. 移动端开发和 pc 端开发的不同之处](#5-移动端开发和-pc-端开发的不同之处)
    - [6. 移动端适配方案，rem 计算相对哪个元素的 fontsize](#6-移动端适配方案rem-计算相对哪个元素的-fontsize)
    - [7. Html meta 标签介绍，和性能相关的标签](#7-html-meta-标签介绍和性能相关的标签)
    - [8. CSS 画三角形](#8-css-画三角形)
    - [9. 平行四边形](#9-平行四边形)

## 1. BFC

BFC 即 Block Formatting Contexts (块级格式化上下文),BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。  

> **BFC的布局规则**

1. 内部的Box会在垂直方向，一个接一个地放置。  
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。  
3. 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算。

> **触发 BFC只要元素满足下面任一条件即可触发 BFC 特性：**

1. float的值不是none。
2. position的值不是static或者relative。
3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4. overflow的值不是visible

> **BFC 特性及应用**  

1. 利用BFC避免margin重叠。

属于同一个BFC的两个相邻的Box会发生margin重叠，所以我们可以设置，两个不同的BFC  

demo路径：CSS/1-BFC/BFC1.html  

2. 自适应两栏布局  

BFC的区域不会与float box重叠。  

demo路径：CSS/1-BFC/BFC2.html  

3. 清除浮动

计算BFC的高度时，浮动元素也参与计算。

demo路径：CSS/1-BFC/BFC3.html  

## 2. flex布局

[阮一峰老师的Flex 布局教程](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)  

## 3. grid布局

[阮一峰老师的Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)  

## 4. css 3D 加速

css3硬件加速: 通过GPU进行渲染，解放CPU。  

原理  
DOM树和CSS结合后形成渲染树。渲染树中包含了大量的渲染元素，每一个渲染元素会被分到一个图层中，每个图层又会被加载到GPU形成渲染纹理。GPU中transform是不会触发 repaint 的，这一点非常类似3D绘图功能，最终这些使用 transform的图层都会由独立的合成器进程进行处理。  

如下几个css属性可以触发硬件加速：

transform  
opacity  
filter  
will-change：哪一个属性即将发生变化，进而进行优化。

不想对元素应用3D变换，可我们一样可以开启3D引擎。例如我们可以用transform: translateZ(0); 来开启硬件加速 。  

## 5. css伪类和伪元素

参考：https://blog.csdn.net/m0_37686205/article/details/88396191  

伪类：用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。  
伪元素：用于创建一些不在文档树中的元素，并为其添加样式。  

常见的状态伪类主要包括：

1. :link 应用于未被访问过的链接；
2. :hover 应用于鼠标悬停到的元素；
3. :active 应用于被激活的元素；
4. :visited 应用于被访问过的链接，与:link互斥。
5. :focus 应用于拥有键盘输入焦点的元素。

常见的伪元素选择器：

1. ::first-letter 选择元素文本的第一个字（母）。
2. ::first-line 选择元素文本的第一行。
3. ::before 在元素内容的最前面添加新内容。
4. ::after 在元素内容的最后面添加新内容。
5. ::selection匹配用户被用户选中或者处于高亮状态的部分
6. ::placeholder匹配占位符的文本，只有元素设置了placeholder属性时，该伪元素才能生效

## 6. 浏览器的绘制原理，浏览器重绘(Repaint)和回流(Reflow重排)

浏览器的绘制原理： https://www.cnblogs.com/xiahj/p/11777786.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E  

重绘（Repaint）  当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color 等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。  

回流（Reflow）  当 Render Tree 中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。  

会导致回流的操作：

1. 页面渲染初始化
2. 添加、删除可见的 DOM 元素
3. 元素尺寸、位置发生变化
4. 浏览器窗口大小 resize 发生改变
5. 元素字体大小发生改变
6. 激活 CSS 伪类
7. 查询某些属性或者调用某些方法

下面列出一些常用的会导致回流的属性和方法：  

clientWidth、clientHeight、clientTop、clientLeftoffsetWidth、
offsetHeight、offsetTop、offsetLeftscrollWidth、
scrollHeight、scrollTop、scrollLeftscrollIntoView()、scrollIntoViewIfNeeded()、getComputedStyle()、getBoundingClientRect()、scrollTo()  

浏览器都会优化重绘和回流的操作。浏览器会把所有会引起回流、重绘的操作放入1个队列中，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。  

另外，当我们取一些属性值时，类似offsetWidth、clientWidth、width等，会导致浏览器提前flush队列，只为了取到正确的值，即便是队列里的操作不影响所取的值。  

如何减少、避免重绘和回流  

CSS  

1. 避免使用 table 布局
2. 尽可能在 DOM 树的最末端改变 class
3. 避免设置多层内联样式
4. 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上
5. 避免使用 CSS 表达式 例如：calc()

Javascript

1. 避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性
2. 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中
3. 也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘
4. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
5. 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流

## 面试题

### 1. css 垂直居中

```html
<div class="g-container">
    <div class="g-box"></div>
</div>
```

1. flex 布局下的 margin: auto, display: flex 替换成 display: inline-flex | grid | inline-grid 也是可以的。

```css
.g-container {
    display: flex;
}

.g-box {
    margin: auto;
}
```

2. grid 布局下的 place-items: center;

```css
.g-container {
    display: grid;
    place-items: center
}

```

3. display：table-cell;

```css
.g-container {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.g-box {
  display: inline-block;
  vertical-align: middle;
}
```

4. CSS3 transform;

```css
.g-container {
  position: relative;
}

.g-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 2. css 的 10px 字体无法显示的解决方案

```css
html {
  font-size: 100px;
}
span {
  font-size: 0.1rem;
}
```

```css
transform:scale(0.8);
```

### 3. 多行省略

```css
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 4. 自适应 search 框; input + button 布局

https://blog.csdn.net/weixin_41506373/article/details/106948796

```html
<style>
  div {
    display: flex;
  }
  button {
    width: 100px;
  }
  input {
    flex-grow: 1;
  }
</style>
<body>
  <div>
    <input />
    <button type="button">搜索</button>
  </div>
</body>
```

### 5. 移动端开发和 pc 端开发的不同之处

https://blog.csdn.net/fairyier/article/details/81454120  

### 6. 移动端适配方案，rem 计算相对哪个元素的 fontsize

rem是CSS3新增的一个相对单位，rem是相对于HTML根元素的字体大小（font-size）来计算的长度单位,如果你没有设置html的字体大小，就会以浏览器默认字体大小，一般是16px.

### 7. Html meta 标签介绍，和性能相关的标签

https://www.php.cn/div-tutorial-417816.html  

浏览器，搜索引擎和其他网络服务。  

meta标签共有两个属性，分别是name属性, http-equiv属性。

> name属性主要是用于描述网页，比如网页的关键词，叙述等，便于搜索引擎抓取。  

```html
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta name="referrer" content="no-referrer-when-downgrade"/>
<!-- Chrome85+将策略修改为strict-origin-when-cross-origin，即如果请求地址与请求页面非同源，将只携带请求的域名，不会再带上来源页面地址的请求参数。 -->

```

> http-equiv顾名思义，相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确和精确地显示网页内容.

expires(期限)说明：可以用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。  
用法：<meta http-equiv="expires" content="Fri,12Jan200118:18:18GMT">  

### 8. CSS 画三角形

等腰三角形把其它border边的颜色设置为透明色

```css
/* 正三角形 */
/* 如果想要得到其它边上的三角形，只需要将剩余的border边颜色设置为透明色即可 */
div {
    width: 0;
    height: 0;
    border: 40px solid;
    border-color: transparent transparent red;
}
```

直角三角形：基于之前绘制的三角形而来的。如果想绘制右直角三角，则将左border设置为0；如果想绘制左直角三角，将右border设置为0即可（其它情况同理）。  

```css
#right {
  width: 0;
  height: 0;
  border: 40px solid;
  border-color: transparent transparent red;
  border-left: 0;
}
```

带边框三角形：三角形叠放，即把当前三角形叠放在更大的三角形上方，需要利用绝对定位方法

```css
/* 带边框的三角形 */
#blue {
  position: relative;
  width: 0;
  height: 0;
  border-width: 0 40px 40px;
  border-style: solid;
  border-color: transparent transparent blue;
}
/* 绝对定位的区域是基于绝对定位父元素的padding区域 */
#blue:after {
  content: "";
  position: absolute;
  top: 1px;
  left: -38px;
  border-width: 0 38px 38px;
  border-style: solid;
  border-color: transparent transparent yellow;
}
```

### 9. 平行四边形

skew API: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/skew()  

skew() 函数指定一个或两个参数，它们表示在每个方向上应用的倾斜量。  

```js
skew(ax)  

// ax 是一个 <angle>，表示用于沿横坐标扭曲元素的角度。ay 是一个 <angle> ，表示用于沿纵坐标扭曲元素的角度。如果未定义，则其默认值为0，导致纯水平倾斜。
skew(ax, ay)  
```

```css
div {
  width: 200px;
  height: 100px;
  background-color: aqua;
  transform: skew(-30deg);
}
```
