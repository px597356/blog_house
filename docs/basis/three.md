---
title: webpack笔记3
date: 2022-09-08
tags:
 - webpack
---

# Webpack第三节



## 处理样式文件

本节学习使用 Webpack 如何处理 Css、Less、Sass、Scss、Style 样式资源

#### 介绍

Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源

我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用

[Webpack 官方 Loader 文档](https://webpack.docschina.org/loaders/)

##### 处理 `.css` 文件

安装依赖项

```
npm install --save-dev css-loader style-loader
```

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

##### 处理 `.less` 文件

安装依赖项

```
npm install --save-dev less-loader less
```

webpack.config.js

```javascript
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
};
```



## 处理图片资源

过去在 `Webpack4` 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

现在 `Webpack5` 已经将两个 `Loader` 功能内置到 `Webpack` 里了，我们只需要简单配置即可处理图片资源

#### 1.配置

```javascript
module: {
        rules: [
            // loader的配置
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于32kb的图片转base64
                        // 优点: 减少请求数量  缺点: 体积会变得更大
                        maxSize: 32 * 1024  // 32kb
                    }
                }
            },
        ]
    },
```

