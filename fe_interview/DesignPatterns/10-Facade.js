// 三个处理函数
function start() {
  console.log("start");
}

function doing() {
  console.log("doing");
}

function end() {
  console.log("end");
}

// 外观函数，将一些处理统一起来，方便调用
function execute() {
  start();
  doing();
  end();
}

// 调用init开始执行
function init() {
  // 此处直接调用了高层函数，也可以选择越过它直接调用相关的函数
  execute();
}

init(); // start doing end
