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