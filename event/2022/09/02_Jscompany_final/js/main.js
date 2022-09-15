var youtubeId = ['qCWsqsKL8VY'];
$(function () {
  oddFixed();
  startMotion();
  insertYoutube($('.section01'), youtubeId[0]);
  AOS.init();

  $('button[data-href]').click(function(e){
    var href = $(this).data("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 400, "easeInOutExpo");

    return false;
    e.preventDefault();
  });
});

window.onload = function() {
// startMotion();
};

//window odd fixed
function oddFixed() {
  if ($(window).width() % 2 != 0)	{
    var width = $(window).width() - 1;
    $('html').width(width);
  }
  else {
    $('html').width('100%');
  }
  }
  $(window).resize(function() {
  oddFixed();
});

//Popup
var $popup;
function popup(obj, url) {
  $popup = $(obj);
  var targetY = $(window).scrollTop()+100;
    h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
  $("body").addClass("dimmed");
  $popup.addClass("show").css({top:targetY,opacity:1});

  if ( $popup.attr('data-popup-id') == 'youtube') {
    $popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
  }
}
var imgSrc;
function popupItem(itemName, imgName, isOpend) {
  $popup = $('[data-popup-id="item"]');
  var targetY = $(window).scrollTop()+100;
    h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;

  $popup.addClass("show").css({top:targetY,opacity:1});
  $("body").addClass("dimmed");

  imgSrc = imgSrc ? imgSrc : "./assets/images/items/";
  $popup.find('.item-name').html(itemName);
  $popup.find('.item-img').html('<img src="' + imgSrc + imgName + '.jpg" alt="item image">');
  $popup.attr('data-popup-re','').attr('data-popup-re',isOpend);

}
function popupClose(that) {
  $("body").removeClass("dimmed").unbind('touchmove');
  var type = typeof(that); //this == "object"
  if ( type == "object" ) {
    $(that).parents('.popup').removeAttr("style").removeClass("show");
    $(that).parents('.popup').find(".iframe iframe").remove();

    if ( $(that).parents('.popup').attr('data-popup-id') == 'item') {
      if ( $(that).parents('.popup').attr('data-popup-re') != 're') {
        document.location.reload();
      }
    }
  } else {
    $(that).parents('.popup').removeAttr("style").removeClass("show");
  }
}

//tab
function tabView(index, btn, that) {
  $(btn).removeClass('current').eq(index).addClass('current');
  $(that).removeClass('current').hide().eq(index).addClass('current').show();
}

//새로고침 시 스크롤 컨텐츠 원하는 위치로 이동
function goToSection(href) {
  offsetTop = $(href).offset().top - 200;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 0, "easeInOutExpo");

  return false;
}

//타이틀 등장 모션
var tlMotion = '';
function startMotion(target) {
  tlMotion = new TimelineMax({delay:0.5}).add([
    TweenMax.fromTo( $('.title'), 1, {y:-500}, {y:0, delay:1, ease:Elastic.easeOut.config(1,0.6) } ),
    TweenMax.fromTo( $('.frame-bg'), 3, {scale:1.55, transformOrigin:'center top'}, {scale:1, ease:Power4.easeOut } ),
  ]);
  return tlMotion;
}

//youtube 삽입 함수
function insertYoutube(obj, url) {
  $(obj).find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
}