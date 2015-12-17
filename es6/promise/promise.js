/*
 * common use
 *
 * */

var p = new Promise(function (resolve, reject) {
  //setTimeout(function () {
  resolve('Async Hello World');
  //});
});

// 'onFulfilled' is a batter name than 'anyName' or you can use a anonymous function
p.then(function anyName(value) {
  console.log('success');
  console.log(value);
}).catch(function (error) {
  console.log(error);
});


/*
 *  <a> equals <b>
 *  Promise.resolve作为 new Promise() 的快捷方式，在进行promise对象的初始化或者编写测试代码的时候都非常方便
 * */


//<a>
Promise.resolve('test').then(function (value) {
  console.log('test <a> equals <b>', 'value:', value);
});


//<b>
new Promise(function (resolve) {
  resolve('test');
}).then(function (value) {
  console.log('test <a> equals <b>', 'value:', value);
});

/*
 * 将thenable对象转换promise对象
 * */

let $ = jQuery;
let promise = Promise.resolve($.ajax('test.json'));
promise.then(function (value) {
  console.log('将thenable对象转换promise对象', value);
});


/*
 * promise chain
 * */

function tastA() {
  console.log('task A');
  throw new Error('tastA throw a error');
}

function tastB() {
  console.log('task B');
}

function onRejected(err) {
  console.log('onRejected', '  error :', err);
}

function finalTask() {
  console.log('finalTask');
}

var proChain = Promise.resolve();

proChain
  .then(tastA)
  .then(tastB)
  .catch(onRejected)
  .then(finalTask);

/*
 * promise chain : transmitting parameter
 *
 * */

function double(value) {
  return value * 2;
}

function increment(value) {
  return ++value;
}

function output(value) {
  console.log(value);
}

var proTransmit = Promise.resolve(1);

proTransmit
  .then(double)
  .then(increment)
  .then(output)
  .catch(function (err) {
    console.log(err);
  });

/*
 * promise.then 每次调用都返回一个不同的promise对象
 * 体会<c> <d>两段代码的不同
 * */

// <c>: 对同一个promise对象同时调用 `then` 方法
var aPromise = new Promise(function (resolve) {
  resolve(100);
});
aPromise.then(function (value) {
  return value * 2;
});
aPromise.then(function (value) {
  return value * 2;
});
aPromise.then(function (value) {
  console.log("<c>: " + value); // => 100
})

// vs

// <d>: 对 `then` 进行 promise chain 方式进行调用
var bPromise = new Promise(function (resolve) {
  resolve(100);
});
bPromise.then(function (value) {
  return value * 2;
}).then(function (value) {
  return value * 2;
}).then(function (value) {
  console.log("<d>: " + value); // => 100 * 2 * 2
});