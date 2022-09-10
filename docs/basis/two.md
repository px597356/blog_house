---
title: webpack笔记2
date: 2022-09-07
tags:
 - webpack
---

# webpack第二节

## 基本配置

在开始使用 `Webpack` 之前，我们需要对 `Webpack` 的配置有一定的认识。

## 5 大核心概念

1.entry（入口）

指示 `Webpack` 从哪个文件开始打包

2.output（输出）

指示 `Webpack` 打包完的文件输出到哪里去，如何命名等

3.loader（加载器）

`Webpack` 本身只能处理 `js`、`json` 等资源，其他资源（样式、图片等）需要借助 `loader`，`Webpack` 才能解析

4.plugins（插件）

扩展 `Webpack` 的功能

5.mode（模式）

主要由两种模式：

- 开发模式：development

- 生产模式：production

## 准备 `Webpack` 配置文件

在项目根目录下新建文件：`webpack.config.js`

```javascript
const path = require('path') // nodejs 核心模块,专门用来处理路径问题

module.exports = {
    // 入口
    entry: './src/main.js', // 相对路径
    // 输出
    output: {
        // 文件的输出路径
        // __dirname是nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, 'dist'), // 绝对路径
        // 文件名
        filename: 'main.js',
    },
    // 加载器
    module: { // 数组复数，对象是单数，例如module:{}，rules:[]，plugins:[]
        rules: [
            // loader的配置
        ]
    },
    // 插件
    plugins:[
        // plugins的配置
    ],
    // 模式
    mode: 'development',
}
```

Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范