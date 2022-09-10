---
title: webpack笔记4
date: 2022-09-09
tags:
 - webpack
---

# webpack第四节



## 输出修改文件目录

```javascript
// 输出
output: {
    // 所有文件的输出路径
    // __dirname是nodejs的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    // 文件名
    filename: 'js/main.js',
},

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
                },
                generator: {
                    // 输出图片名称
                    // [hash:10] hash值取前10位
                    // ext ---> png/jpg/svg...
                    // query 参数
                    filename: 'images/[hash:10][ext][query]'
                }
            },
        ]
    },
```

## 自动清空上一次打包内容

```javascript
// 输出
output: {
    // 自动清空上次打包的内容
    // 原理: 在打包前将path整个目录内容清空，再进行打包
    clean: true,
},
```

## 处理文字图标资源

下载字体文件 `.ttf` `.woff` `.woff2` 并且放在 `src` 目录下的 `fonts` 文件下

##### 配置如下

```javascript
module: {
        rules: [
            // loader的配置
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource', // 不走 base64 格式
                generator: {
                    // 输出名称
                    filename: 'fonts/[hash:10][ext][query]'
                }
            },
        ]
},
```

## 处理其他资源

```
module: {
        rules: [
            // loader的配置
            {
                test: /\.(mp3|mp4|avi|key|md)$/,
                type: 'asset/resource', // 不走 base64 格式
                generator: {
                    // 输出名称
                    filename: 'other/[hash:10][ext][query]'
                }
            },
        ]
},
```

