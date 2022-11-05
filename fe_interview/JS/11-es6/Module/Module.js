// 1. a的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性。

// import { a } from "./xxx.js";
// a.foo = "hello"; // 合法操作

// 2. import命令具有提升效果，会提升到整个模块的头部，首先执行。
// foo();
// import { foo } from 'my_module';
// 上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。


// 3. 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
// 用到了表达式、变量和if结构。在静态分析阶段，这些语法都是没法得到值的。
// // 报错
// import { 'f' + 'oo' } from 'my_module';

// // 报错
// let module = 'my_module';
// import { foo } from module;

// // 报错
// if (x === 1) {
//   import { foo } from 'module1';
// } else {
//   import { foo } from 'module2';
// }



// 4. 整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
// import * as circle from './circle';

// console.log('圆面积：' + circle.area(4));
// console.log('圆周长：' + circle.circumference(14));

// // 模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

// import * as circle from './circle';

// // 下面两行都是不允许的
// circle.foo = 'hello';
// circle.area = function () {};

// 5. export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。
// // 正确
// export default 42;

// // 报错
// export 42;


// 6. import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行， require是运行时加载模块
// import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。




// 7. import()的一些适用场合。

// 7.1. 按需加载。
// import()可以在需要的时候，再加载某个模块。




// 8. 加载规则
// 浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
// 浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
// <script type="module" src="./foo.js"></script>

// 如果网页有多个<script type="module">，它们会按照在页面出现的顺序依次执行。
{/* <script>标签的async属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。 */}


// 9. 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。
// const isNotModuleScript = this !== undefined;



// 10. ES6 模块与 CommonJS 模块的差异 https://www.yuque.com/ostwind/es6/docs-module-loader#15235937



// 11. ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。


// ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。




