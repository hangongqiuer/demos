/*
 * promise.all
 *
 * */

function getURL(URL) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}
var request = {
  comment: function getComment() {
    console.log('call comment');
    return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
  },
  people: function getPeople() {
    console.log('call people');
    return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
  }
};
function main() {
  return Promise.all([request.comment(), request.people()]);
}

main().then(function (value) {
  console.log('then');
  console.log(value);
}).catch(function(error){
  console.log(error);
});




// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(delay);
    }, delay);
  });
}
var startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128)
]).then(function (values) {
  console.log(Date.now() - startDate + 'ms');
  // 約128ms
  console.log(values);    // [1,32,64,128]
});


// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128)
]).then(function (value) {
  console.log('race', value);    // => 1
});

/*
* 使用promise.then(onFulfilled, onRejected) 的话
*     1.在 onFulfilled 中发生异常的话，在 onRejected 中是捕获不到这个异常的。
*     2.在 promise.then(onFulfilled).catch(onRejected) 的情况下, then 中产生的异常能在 .catch 中捕获
*     3.但是.then 和 .catch 在本质上是没有区别的
*
* */

Promise.resolve(1).then(function (value) {
  throw new Error('onReject can not catch exception of onFulfilled')
}, function (err) {
  console.log(err); // --> can not console
});

Promise.resolve(1).then(function (value) {
  throw new Error('onReject can not catch exception of onFulfilled2')
}).catch(function (err) {
  console.log(err); // --> can console
});