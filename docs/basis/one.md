---
title: webpack笔记1
date: 2022-09-06
tags:
 - webpack
---

# webpack第一节

## 1.资源文件

```
webpack_code # 项目根目录（所有指令必须在这个目录运行）
     --src # 项目源码目录
       -- js # js文件目录
         -- count.js
         -- sum.js
       -- main.js # 项目主文件（入口文件）
```



## 2.创建目录

创建文件`src`并在该目录下创建`main.js`文件

- **count.js**

```javascript
export default function count (x, y) {
    return x - y
}
```

- **sum.js**

```javascript
export default function sum(...args) {
    return args.reduce((p, c)=> p + c, 0)
}
```

- **main.js**

```javascript
import count from './js/count';
import sum from './js/sum';

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```



## 3.下载依赖

打开终端，来到项目根目录。运行以下指令：

- 初始化 `package.json`

```
npm init -y
```

此时会生成一个基础的`package.json`文件。

**需要注意的是 ` package.json ` 中 ` name ` 字段不能叫做 ` webpack `，否则下一步会报错。**

- 下载依赖

```
npm i webpack webpack-cli -D
```



## 4.启动Webpack

- 开发模式

```
npx webpack ./src/main.js --mode=development
```

- 生产模式

```
npx webpack ./src/main.js --mode=production
```

`npx webpack`：是用来运行本地安装 `Webpack` 包的。

`./src/main.js`：指定 `Webpack` 从 `main.js` 文件开始打包，不但会打包 `main.js` ，还会将其依赖也一起打包进来。

`--mod-xxx`：指定模式（环境）。



## 5.观察输出文件

默认  `Webpack` 会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下文件情况就好了。



## 小结

 `Webpack` 本身功能比较少，只能处理 js 资源，一旦遇到 css 等其他资源就会报错。