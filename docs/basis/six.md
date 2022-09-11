---
title: webpack笔记6
date: 2022-09-11
tags:
 - webpack

categories:
 - webpack
---

# webpack第六节



## 处理 Html 资源



### 1.下载包

```
npm install --save-dev html-webpack-plugin
```

### 2.配置

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 插件
    plugins:[
        // plugins的配置
        new HtmlWebpackPlugin()
    ],
}
```

如果想要用之前的 `html` 的 `dom` 模板

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path') // nodejs 核心模块,专门用来处理路径问题

module.exports = {
    // 插件
    plugins:[
        // plugins的配置
        new HtmlWebpackPlugin({
            // 模板: 以 public/index.html 文件创建新的html文件
            // 新的html文件特点: 1. dom结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "public/index.html")
        })
    ],
}
```

### 3.修改 index.html

去掉引入的 js 文件，因为 HtmlWebpackPlugin 会自动引入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>hello webpack</h1>
    <div class="main"></div>
    <div class="box1"></div>
    <div class="box2"></div>
    <span class="iconfont icon-banquan"></span>
    <span class="iconfont icon-anquanyinsi"></span>
    <span class="iconfont icon-dicengjiagou"></span>
    <span class="iconfont icon-cangchucangku"></span>
    <!-- <script src="../dist/js/main.js"></script> -->
</body>
</html>
```

### 4.运行指令

```
npx webpack
```

此时 dist 目录就会输出一个 index.html 文件





## 开发服务器&自动化

每次写完代码都需要手动输入指令才能编译代码，太麻烦了，我们希望一切自动化



## 1. 下载包

```
npm i webpack-dev-server -D
```



## 2. 配置

- webpack.config.js

```javascript

module.exports = {
    // 入口
    entry: './src/main.js', // 相对路径
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "6565", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    },

    // 模式
    mode: 'development',
}
```



## 3. 运行指令

```text
npx webpack serve
```

**注意运行指令发生了变化**

并且当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。

开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道。