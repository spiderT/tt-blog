# 安全

- [安全](#安全)
  - [1. XSS](#1-xss)
  - [2. CSRF](#2-csrf)
  - [3. HTTPS原理](#3-https原理)
  - [4. 浏览器安全策略](#4-浏览器安全策略)
  - [5. 代码保护](#5-代码保护)

## 1. XSS

Cross-site scripting（跨站脚本攻击），参考：https://zhuanlan.zhihu.com/p/98938342  

常见的 XSS 攻击有三种：反射型XSS攻击、DOM-based 型XXS攻击以及存储型XSS攻击。  

1. 反射型XSS攻击  

反射型 XSS 一般是攻击者通过特定手法（如电子邮件），诱使用户去访问一个包含恶意代码的 URL，当受害者点击这些专门设计的链接的时候，恶意代码会直接在受害者主机上的浏览器执行。反射型XSS通常出现在网站的搜索栏、用户登录口等地方，常用来窃取客户端 Cookies 或进行钓鱼欺骗。  

2. 存储型XSS攻击

也叫持久型XSS，主要将XSS代码提交存储在服务器端（数据库，内存，文件系统等），下次请求目标页面时不用再提交XSS代码。当目标用户访问该页面获取数据时，XSS代码会从服务器解析之后加载出来，返回到浏览器做正常的HTML和JS解析执行，XSS攻击就发生了。存储型 XSS 一般出现在网站留言、评论、博客日志等交互处，恶意脚本存储到客户端或者服务端的数据库中。

3. DOM-based 型XSS攻击  

基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞。  

如何防御XSS攻击？

1. 对输入内容的特定字符进行编码，例如表示 html标记的 < > 等符号。
2. 对重要的 cookie设置 httpOnly, 防止客户端通过document.cookie读取 cookie，此 HTTP头由服务端设置。
3. 将不可信的值输出 URL参数之前，进行 URLEncode操作，而对于从 URL参数中获取值一定要进行格式检测（比如你需要的时URL，就判读是否满足URL格式）。
4. 不要使用 Eval来解析并运行不确定的数据或代码，对于 JSON解析请使用 JSON.parse() 方法。
5. 后端接口也应该要做到关键字符过滤的问题。

## 2. CSRF

Cross Site Request Forgery（跨站请求伪造）  参考：https://tech.meituan.com/2018/10/11/fe-security-csrf.html  

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

一个典型的CSRF攻击有着如下的流程：

1. 受害者登录a.com，并保留了登录凭证（Cookie）。
2. 攻击者引诱受害者访问了b.com。
3. b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie。
4. a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
5. a.com以受害者的名义执行了act=xx。
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。

> 几种常见的攻击类型  

1. GET类型的CSRF

GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：

```text
![](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker)
```

在受害者访问含有这个img的页面后，浏览器会自动向http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker发出一次HTTP请求。bank.example就会收到包含受害者登录信息的一次跨域请求。  

2. POST类型的CSRF

这种类型的CSRF利用起来通常使用的是一个自动提交的表单，如：

```html
 <form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```

访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

3. 链接类型的CSRF

链接类型的CSRF并不常见，比起其他两种用户打开页面就中招的情况，这种需要用户点击链接才会触发。这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招，攻击者通常会以比较夸张的词语诱骗用户点击，例如：

```html
  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
  <a/>
```

由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个PHP页面，则表示攻击成功。

> CSRF的特点  

攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。

1. 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
2. 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
3. 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。
4. CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。

> 防护策略  

1. 阻止不明外域的访问

- 同源检测

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：  

Origin Header  
Referer Header  

- Samesite Cookie

为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax.  

1. 提交时要求附加本域才能获取的信息

- CSRF Token

可以要求所有的用户请求都携带一个CSRF攻击者无法获取到的Token。服务器通过校验请求是否携带正确的Token，来把正常的请求和攻击的请求区分开，也可以防范CSRF的攻击。  

CSRF Token的防护策略分为三个步骤：

1) 将CSRF Token输出到页面中  
2) 页面提交的请求携带这个Token  
3) 服务器验证Token是否正确  

- 双重Cookie验证

在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）。  
在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）。  
后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。  

总结：

CSRF自动防御策略：同源检测（Origin 和 Referer 验证）。  
CSRF主动防御措施：Token验证 或者 双重Cookie验证 以及配合Samesite Cookie。  
保证页面的幂等性，后端接口不要在GET页面中做用户操作。  

## 3. HTTPS原理

参考：https://time.geekbang.org/column/article/156181  

HTTPS 并非是一个新的协议，通常 HTTP 直接和 TCP 通信，HTTPS 则先和安全层通信，然后安全层再和 TCP 层通信。也就是说 HTTPS 所有的安全核心都在安全层(SSL/TLS)，它不会影响到上面的 HTTP 协议，也不会影响到下面的 TCP/IP，因此要搞清楚 HTTPS 是如何工作的，就要弄清楚安全层是怎么工作的。  

安全层有两个主要的职责：对发起 HTTP 请求的数据进行加密操作和对接收到 HTTP 的内容进行解密操作。  

> 数据传输

非对称加密结合对称加密，对称加密的密钥通过非对称加密传输，数据通过加密传输。  

> 数字证书  

向 CA 申请证书。  

## 4. 浏览器安全策略

> 1. 同源策略  

如果两个 URL 的协议、域名和端口都相同，我们就称这两个 URL 同源。  

同源策略主要表现在 DOM、Web 数据和网络这三个层面。  

第一个，DOM 层面。同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作。  

第二个，数据层面。同源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据。由于同源策略，我们依然无法通过第二个页面的 opener 来访问第一个页面中的 Cookie、IndexDB 或者 LocalStorage 等内容。你可以自己试一下，这里我们就不做演示了。  

第三个，网络层面。同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点。

> 2. 多进程架构和浏览器沙箱  

在渲染进程和操作系统之间建一道墙，即便渲染进程由于存在漏洞被黑客攻击，但由于这道墙，黑客就获取不到渲染进程之外的任何操作权限。将渲染进程和操作系统隔离的这道墙就是我们要聊的安全沙箱。  

参考：https://time.geekbang.org/column/article/155183

## 5. 代码保护

[代码保护-- 几款加壳工具](https://zhuanlan.zhihu.com/p/268849609)

