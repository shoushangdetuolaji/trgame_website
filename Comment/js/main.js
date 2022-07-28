function fnKeyCheck(objBox) {
  var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
  // ban copy & taste
  if (event.ctrlKey && (pressedKey == "c" || pressedKey == "v")) {
    event.returnValue = false;
  }
}

function fnCommentWrite() {
  // 做一些逻辑判断内容是否为空
  fnCommentPopup1()
}

// 发送成功的提示框
function fnCommentPopup1() {
  document.getElementById("commentPopup").style.display = "block";
}

// 页面刷新
function fnCommentReload() {
  self.location.reload(true)
}

document.getElementById("commentPopup").addEventListener("click", function() {
  fnCommentReload()
})