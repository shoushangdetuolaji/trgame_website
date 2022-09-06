// tab
function tabView(index, btn, that) {
  $(btn).removeClass('current').eq(index).addClass('current');
  $(that).removeClass('current').eq(index).addClass('current');
}

