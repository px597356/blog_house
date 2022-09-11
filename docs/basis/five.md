---
title: webpack笔记5
date: 2022-09-10
tags:
 - webpack

categories:
 - webpack
---

# webpack第五节



## 处理js资源

js 资源 Webpack 不是已经处理过了吗，为什么我们还要处理呢？

原因是 Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。

其次开发中，团队对代码格式是有严格要求的，我们不能用肉眼去检测代码格式，需要使用专业的工具来检测。

- 针对 js 兼容性处理，我们用 Babel 来完成

- 针对代码格式，我们使用 Eslint 来完成

我们先完成 Eslint，检测代码格式无误后，再由 Babel 做代码兼容性处理。



## Eslint

可组装的 JavaScript 和 JSX 检查工具。

它是用来检测 js 和 jsx 语法的工具，可以配置各项功能。

我们是用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查。

### 1.配置文件

配置文件有很多种写法：

- `.eslintrc.`*：新建文件，位于项目根目录
  - `.eslintrc`
  - `.eslintrc.js`
  - `.eslintrc.json`
  - 区别在于配置格式不一样

- `package.json` 中 `eslintConfig` ：不需要创建文件，在原有文件基础上写

`Eslint` 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

### 2.具体配置

我们以 `.eslintrc.js` 配置文件为例：

```javascript
module.exports = {
	// 解析选项
	parserOptions: {},
	// 具体检查规则
	rules: {},
	// 继承其他规则
	extends: [],
	// 其他规则详见: https://eslint.bootcss.com/docs/user-guide/configuring
}
```

#### 1.parserOptions 解析选项

```javascript
parserOptions: {
	ecmaVersion: 6, //ES 语法版本
	sourceType: "module", // ES模块化
	ecmaFeatures: { // ES 其他特性
		jsx: true // 如果是 React 项目，就需要开启 jsx 语法
	}
}
```

#### 2.rules 具体规则

- `“off”` 或   `0`  - 关闭规则

- `“warn”` 或 `1`  - 开启规则，使用警告级别的错误：`warn`（不会导致程序退出）

- `“error”` 或  `2`  - 开启规则，使用错误级别的错误，`error`（当被触发时，程序会退出）

```javascript
rules：{
	semi：“error”, // 禁止使用分号
	'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
	'default-case': [
		'warn', // 要求 switch 语句中有 default 分支，否则警告
		{ commentPattern: '^no default$' } // 允许在最后注释 no default，就不会有警告了
	],
	eqeqeq: [
		'warn', // 强制使用 === 和 !==, 否则警告
		'smart' // http://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
	]
}
```

更多规则详见：[规则文档](http://eslint.bootcss.com/docs/rules/)

#### 3.`   extends` 继承

开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

现有以下较为有名的规则：

[Eslint 官方的规则](https://eslint.bootcss.com/docs/rules/)：`eslint: recommended`

[Vue Cli 官方的规则](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint)：`plugin: vue/essential`

[React Cli 官方的规则](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app):  `react-app`

```javascript
// 例如在 React 项目中, 我们可以这样写配置
module.exports = {
	extends: ["react-app"],
	rules: {
		// 我们的规则会覆盖掉 React-app 的规则
		// 所以想要修改规则直接改就行
		eqeqeq: ["warn", "smart"],
	}
}
```

### 3.在 Webpack 中使用

1.下载包

```javascript
npm install eslint-webpack-plugin eslint --save-dev
```

2.定义 Eslint 配置文件

- .eslintrc.js

```javascript
module.exports = {
  // 继承 Eslint 规则
  extends: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
};
```

3.修改 js 文件代码

- main.js

```javascript
var aaa = count(2, 1);
console.log(aaa);
```

4.配置

- webpack.config.js

```javascript
const path = require('path') // nodejs 核心模块,专门用来处理路径问题
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    // 插件
    plugins:[
        // plugins的配置
        new ESLintPlugin({
            // context 检查哪些文件
            context: path.resolve(__dirname, 'src'),
        }),
    ],
}
```

5.运行指令

```
npx webpack
```

查看检查结果

### 4.VSCode Eslint 插件

打开 VSCode，下载 Eslint 插件，即可不用编译就能看到错误，可以提前解决

但是此时就会对项目所有文件默认进行 Eslint 检查了，我们 dist 目录下的打包后文件就会报错。但是我们只需要检查 src 下面的文件，不需要检查 dist 下面的文件。

所以可以使用 Eslint 忽略文件解决。在项目根目录新建下面文件:

- .eslintignore

```
# 忽略dist目录下所有文件
dist
```



## Babel

Babel 是 Javascript 编译器。

主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

### 1.配置文件

配置文件有很多种写法：

- `babel.config.*` :  新建文件，位于项目根目录
  - `babel.config.js`
  - `babel.config.json`
- `.babelrc.*` :  新建文件，位于项目根目录
  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`
- `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写

Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

### 2.具体配置

我们以 `babel.config.js` 配置文件为例：

```javascript
// 此文件等同于 webpack.config.js 中 babel-loader 的 options 中的参数
module.exports = {
    presets: ['@babel/preset-env']
} 
```

1. presets 预设

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。

- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

### 3. 在 Webpack 中使用

1. 下载包

```
npm i babel-loader @babel/core @babel/preset-env -D
```

2. 定义 Babel 配置文件

- babel.config.js

```javascript
// 此文件等同于 webpack.config.js 中 babel-loader 的 options 中的参数
module.exports = {
    presets: ['@babel/preset-env']
} 
```

- 或者直接写在 `webpack.config.js` 中

```javascript
module.exports = {
    // 加载器
    module: { 
        rules: [
            // loader的配置
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除 node_modules 中的js文件
                use: {
                  loader: 'babel-loader',
                   options: {
                     presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    },
}
```

3. 运行指令

```
npx webpack
```

打开打包后的 `dist/static/js/main.js` 文件查看，会发现箭头函数等 ES6 语法已经转换了
