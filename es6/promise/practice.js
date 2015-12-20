var $ = jQuery;
var sendMsg = function () {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'test.json',
      success: function (data) {
        resolve(data);
      }
    })
  })
};

sendMsg().then(function(data){
  console.log(data);
});