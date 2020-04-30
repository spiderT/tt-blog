# antd 根据设备主题换肤

有浅色和深色两套主题，供用户选择，用matchMedia方法获取当前设备的主题模式，之后使用 less 提供的 modifyVars 的方式进行覆盖变量，但antd的变量大概有[400多](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less),更换起来太多，而且容易遗漏，所以又结合另一种方法，下载antd的黑色主题的css文件dark.css，在主题切换时，动态添加或卸载HTMLLinkElement。以下分三步介绍。

## 1. 如何获得设备主题

文档：[MDN prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme), chrome 支持 prefers-color-scheme。

> 系统兼容情况

macOS 10.14 引入了 darkmode  
ios13 2019 年 3 月发布的 ios13 版本加入了 darkmode  
Android 10 (API 级别 29) 及更高版本中提供深色主题背景  
window10 2018.10.10  

```js
let theme = 'light';
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  theme = 'dark';
}
```

## 2. 使用 less 提供的 modifyVars 的方式进行覆盖变量

配合使用了一个库 antd-theme-generator

1. 目录下添加主题切换文件 color.js ，添加配置内容：

```js
const path = require('path');
const {
  generateTheme
} = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  mainLessFile: path.join(__dirname, './src/styles/index.less'),
  themeVariables: [ //需要动态切换的主题变量
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@body-background',
    '@component-background',
    '@background-color-light',
    '@background-color-base',
    '@btn-primary-color',
    '@item-hover-bg',
    '@item-active-bg',
    '@table-selected-row-bg',
    '@layout-body-background',
    '@modal-mask-bg',
    '@menu-bg-color'
  ],
  indexFileName: path.join(__dirname, './public/index.html'),
  outputFilePath: path.join(__dirname, './public/color.less')
}

generateTheme(options).then(less => {
    console.log('Theme generated successfully');
  })
  .catch(error => {
    console.log('Error', error);
  });
```

2. CSS 文件下添加 variables.less 文件  

```less
@import "~antd/lib/style/themes/default.less";

@menu-bg-color:'#fff';

.container,
.item-bar,
.add-item {
  background: @body-background;
}
.paui-menu{
  background: @menu-bg-color;
}

.paui-main{
  background: @layout-body-background;
}

.timeout-item-selected{
  background: @background-color-light;
}

.unreadlogs-loglist .logitem {
  &:hover {
    background-color: @item-hover-bg;
  }
}
```

3. 项目启动处修改  

修改项目运行配置 package.json ，项目运行的同时完成页面color文件的配置  

```json
"scripts": {
    "start": "node color.js && export PORT=9005 && react-app-rewired start --verbose",
    "build": "node color.js && react-app-rewired build",
  },
```

4. 主题切换配置

```js
const setColors = (light, dark, primary, active, lightDark, layout, menuBg) => {
  return {
    '@primary-color': primary,
    '@secondary-color': primary,
    '@text-color': light,
    '@text-color-secondary': light,
    '@heading-color': light,
    '@body-background': dark,
    '@component-background': dark,
    '@background-color-light': lightDark,
    '@background-color-base': dark,
    '@btn-primary-color': dark,
    '@item-hover-bg': active,
    '@item-active-bg': active,
    '@table-selected-row-bg': active,
    '@layout-body-background': layout,
    '@menu-bg-color': menuBg,
  };
};

if (theme === 'dark') {
      less
        .modifyVars(
          setColors(LIGHT_COLOR, DARK_COLOR, DARK_PRIMARY, DARK_ACTIVE, DARK_LIGHT_DARK, DARK_LAYOUT, DARK_COLOR)
        )
        .then(() => {
          console.log('darksuccess');
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (theme === 'light') {
      less
        .modifyVars(
          setColors(DARK_COLOR, LIGHT_COLOR, LIGHT_PRIMARY, LIGHT_ACTIVE, LIGHT_LIGHT_DARK, LIGHT_LAYOUT, LIGHT_COLOR)
        )
        .then(() => {
          console.log('lightsuccess');
        })
        .catch((error) => {
          console.log(error);
        });
    }
```

## 3. 动态添加或卸载HTMLLinkElement

根据当前设置的主题判读是否引入dark.css文件

```js
function updateAntTheme(theme) {
  const hide = message.loading('正在加载主题');
  const href = theme === 'dark' ? 'dark' : '';
  const dom = document.getElementById('theme-style') as HTMLLinkElement;

  if (!href) {
    if (dom) {
      dom.remove();
    }
    return;
  }

  const url = `${href}.css`;
  if (dom) {
    dom.onload = () => {
      window.setTimeout(() => {
        hide();
      });
    };
    dom.href = url;
  } else {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'theme-style';
    style.onload = () => {
      window.setTimeout(() => {
        hide();
      });
    };
    style.href = url;
    if (document.body.append) {
      document.body.append(style);
    } else {
      document.body.appendChild(style);
    }
  }
}
```