---
title: Promise笔记
date: 2022-07-13
tags:
 - Promise

categories:
 - Promise
---



# Promise介绍



## Promise 是什么?

**Promise 是 js 中进行异步编程的新的解决方案**

##### 什么是异步编程?

- **fs 文件操作**

  `require('fs').readFile('./index.html',(err,data)=>{})` // 回调写法

- **数据库操作**
- **AJAX**

​		`$.('get',(data)=>{})` // 回调写法

- **定时器**

​		`setTimeout(()=>{},1000)` // 回调写法

旧的解决方案是单纯使用回调函数



## 为什么要用Promise

1. 制定回调函数的方式更加灵活

   1. 旧的： 必须在启动异步任务前指定
   2. `promise`： 启动异步任务 => 返回`promise`对象 =>  给`promise`对象绑定回调函数（甚至可以在异步任务结束后指定/多个）

2. 支持链式调用，可以解决回调地狱问题

   1. 什么是回调地狱？

      回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行条件

   2. 回调地狱的缺点？

      不便于阅读

      不便于处理异常

   3. 解决方案？

      `promise`链式调用

回调地狱

```javascript
asyncFunc1(opt, (...args1)=> {
      asyncFunc2(opt, (...args2)=> {
          asyncFunc3(opt, (...args3)=> {
              // some operation
          })
      })
  })
```

##### Promise 的状态改变

 实例对象的一个属性【`PromiseState`】

  \* `pending` 未决定的

  \* `resolved` / `fulfilled`  成功

  \* `rejected`  失败

 说明：只有这两种，且一个 `promise` 对象只能改变一次

​    无论变为成功还是失败，都会有一个结果数据

​    成功的结果数据一般称为 `value`，失败的结果数据一般称为 `reason` 

##### Promise 对象的值

 实例对象中的另一个属性【`PromiseResult`】

 保存着异步任务【成功/失败】的结果

  \* `resolve`

  \* `reject`

 说明：只有这两种方式可以改变 `PromiseResult` 的结果



## Promise 的 API

- ##### Promise 构造函数：Promise(executor=>{})

  - ###### executor 函数：执行器函数(resolve,reject)=>{}

  - ###### resolve 函数：内部定义成功时我们调用的函数 value => {}

  - ###### reject 函数：内部定义失败时我们调用的函数 reason => {}

  ​       **说明：**`executor` 会在 `Promise` 内部立即同步调用（详见 初步了解Promise.html ---> 41和54、57行打印顺序），异步操作在执行器中执行

  

- ##### Promise.prototype.then 方法：(onResolved, onRejected)=>{}

  - ###### onResolved 函数：成功的回调函数(value) => {}

  - ###### onRejected 函数：失败的回调函数 (reason) => {}

    **说明：**指定用于得到成功 `value` 的成功回调和用于得到失败 `reason` 的失败回调

    ​     返回一个新的 `promise` 对象

    

- ##### Promise.prototype.catch 方法：(onRejected)=>{}

  - ###### onRejected 函数：失败的回调函数 (reason) => {}

    **说明：**指定用于得到失败 `reason` 的失败回调

    ​     返回一个新的 `promise` 对象

- ##### Promise.resolve 方法：(value)=>{}

  - ###### value：成功的数据或 promise 对象

    **说明：**返回一个成功/失败的 `promise` 对象

- ##### Promise.reject 方法：(reason)=>{}

  - ###### reason: 失败的原因

    **说明：**返回一个失败的 `promise` 对象, 返回的结果永远都是传入的参数

- ##### Promise.all 方法：(promises)=>{}

  - ###### promises: 包含 n 个 promise 的数组

    **说明：**返回一个新的 promise, 只有所有的 `promise` 都成功才成功, 只要有一个失败了就直接失败。

    **返回的结果值：** 如果成功, 则返回数组内所有 `promise` 的结果; 如果失败, 则返回失败的那个 `promise`的结果

- ##### Promise.race 方法：(promises)=>{}

  - ###### promises: 包含 n 个 promise 的数组

    **说明：**返回一个新的 `promise`, 第一个完成的 `promise` 的结果状态就是最终的结果状态返回结果也是第一个完成结束状态的 `Promise`



## Promise 关键问题

- ##### **改变状态的方法有几种?**

  - ###### 回调函数内调用 resolve 方法 ---> 使 Promise 的状态变成成功

  - ###### 回调函数内调用 reject 方法 ---> 使 Promise 的状态变成失败

  - ###### throw 抛出错误, 也会改变 Promise 的状态, 状态改为失败

- ##### 一个 Promise 指定多个成/失败的回调函数, 都会调用吗?

  - ######  当 Promise 状态为对应状态时都会调用

- ##### 改变 Promise 状态和指定回调函数谁先谁后？

  - ###### 都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调

  - ###### 如何先改变状态再指定回调？

    - 在执行器中直接调用 `resolve()`/`reject()`（执行器函数内是非异步任务）
    - 延迟更长时间才调用`then()`

  - ###### 什么时候才能得到数据?

    - 如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
    - 如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据

  - ###### `promise.then()`返回的新 `promise` 的结果状态由什么决定?

    - 简单表达：由 `then()` 指定的回调函数执行的结果决定

    - 详细表达：

      - 如果抛出异常，新 `promise` 变为 `rejected`，`reason` 为抛出的异常
      - 如果返回的是非 `promise` 的任意值，新 `promise` 变为 `resolved`，`value` 为返回的值
      - 如果返回的是另一个新 `promise`，此 `promise` 的结果就会成为新 `promise` 的结果

      **代码演示:**

      ```javascript
      let p = new Promise((resolve, reject)=>{
          // resolve('ok')
          reject('error')
      })
      // 执行 then 方法
      let result = p.then(value =>{
          // console.log(value);
          // 1. 抛出错误
          // throw '出问题了';
          // 2. 返回结果是非 Promise 类型的对象
          // return 222;
          // 3. 返回结果是 Promise 对象
          return new Promise((resolve, reject) =>{
              // resolve('success');
              reject('error')
          })
      }, reason =>{
          // return 1111
          return new Promise((resolve, reject) =>{
              resolve('success');
              // reject('error')
          })
          // console.log(reason);
      })
      console.log(result);
      ```

      

  - ###### `Promise` 如何串联多个操作任务?

    - `Promise` 的 `then()` 返回一个新的 `Promise`, 可以看成 `then()` 的链式调用

    - 通过 `then()` 的链式调用串联多个同步/异步任务

      **注意:**`then` 方法的返回结果也是 `promise` 对象

      ```javascript
      let p = new Promise((resolve, reject)=>{
          resolve('ok');
      })
      
      p.then(value =>{
          return new Promise((resolve, reject) =>{
              resolve('success')
          })
      }).then(value =>{
          console.log(value);
      }).then(value =>{
          console.log(value); // undefined 因为没有返回值,所以直接返回成功的 promise 对象, 返回的值就是 undefined
      })
      ```

  - ###### `promise` 异常穿透?

    - 当使用 `promise` 的 `then` 链式调用时，可以在最后指定失败的回调。
    - 前面任何操作出了异常，都会传到最后失败的回调中处理

  - ###### 中断 promise 链？

    - 当使用 `promise` 的 `then` 链式调用时，在中间中断，不再调用后面的回调函数

      **方法：**在回调函数中返回一个 `pendding` 状态的 `promise` 对象

​	

































































