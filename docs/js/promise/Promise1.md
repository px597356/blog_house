## Promise 第一节



### 1. 什么是 Promise ?

Promise 是 js 中进行异步编程的新解决方案。



### 2. 什么是异步编程？

- fs 文件操作

```javascript
require('fs').readFile('./index.html',(err,data)=>{}) // 回调写法
```

- 数据库操作

- AJAX

```javascript
$.('get',(data)=>{}) // 回调写法
```

- 定时器

```javascript
setTimeout(()=>{},1000) // 回调写法
```

旧的解决方案是单纯使用回调函数。



### 3. 为什么要用Promise

##### 1. 制定回调函数的方式更加灵活

###### 	1.1 旧的：必须在启动异步任务前指定

###### 	1.2 promise：启动异步任务 --> 返回 promise 对象 -->给promise对象绑定回调函数 ( 甚至可以在异步任务结束后指定/多个 ) 

##### 2. 支持链式调用，可以解决回调地狱问题

###### 	2.1 什么是回调地狱?

​			回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行条件

###### 	2.2 回调地狱的缺点是什么？

​			不便于阅读，不便于处理异常

###### 	2.3 解决方案？

​			promise链式调用

回调地狱函数：

```javascript
asyncFunc1(opt, (...args1)=> {
      asyncFunc2(opt, (...args2)=> {
          asyncFunc3(opt, (...args3)=> {
              // some operation
          })
      })
  })
```

