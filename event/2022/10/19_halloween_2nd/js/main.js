$(function () {
  oddFixed();
  startMotion($('.motion'));

$('button[data-href]').click(function(e){
  var href = $(this).data("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 400, "easeInOutExpo");

  return false;
  e.preventDefault();
});

$('html').mousemove(function(e){
  var wx = $(window).width();
  var wy = $(window).height();

  var x = e.pageX - this.offsetLeft;
  var y = e.pageY - this.offsetTop;

  var newx = x - wx/2;
  var newy = y - wy/2;

  $('.visual').each(function(){
    var speed = $(this).attr('data-speed') ? $(this).attr('data-speed') : 0.03;
    if ($(this).attr('data-revert')) speed *= -1;
    // TweenMax.to($(this), 1, {x: (1 - newx*speed)});
    TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
  });
});

});

//window odd fixed
function oddFixed() {
if ($(window).width() % 2 != 0)
{
  var width = $(window).width() - 1;
  $('html').width(width);
}
else
{
  $('html').width('100%');
}
}

$(window).resize(function() {
oddFixed();
});

//lnb 
$(document).on('click', '.tab-list li:not(.comingsoon)', function(e) {
console.log(e);
$(this).siblings('li').removeClass('current');
$(this).addClass('current');

var index = $(this).index();
tabView(index, '.tab-list li', '.tab-wrap .tab-content');

});

//tab
function tabView(index, btn, that) {
$('.tab-wrap').attr('data-tabNum',index);

$(btn).removeClass('current').eq(index).addClass('current');
$(that).removeClass('current').hide().eq(index).addClass('current').show();
}


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

imgSrc = imgSrc ? imgSrc : "https://tr-image.game.onstove.com/event/202210/19_halloween_2nd/assets/images/items/";
$popup.find('.item-name').html(itemName);
$popup.find('.item-img').html('<img src="' + imgSrc + imgName + '.png" alt="item image">');
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

function goToSection(href) {
offsetTop = $(href).offset().top - 200;
$('html, body').stop().animate({
  scrollTop: offsetTop
}, 0, "easeInOutExpo");

return false;
}

var tlMotion = '';
function startMotion(target) {
tlMotion = new TimelineMax({delay:0.5}).add([
  TweenMax.fromTo( $('.m1'), 1, {scale:0}, {scale:1, opacity:1, ease:Elastic.easeOut.config(1,0.5) } ),
  TweenMax.fromTo( $('.m2'), 0.1, {opacity:0}, {opacity:1, ease:Power1.easeInOut, delay:2.8, repeat:1, onComplete:function() {
    TweenMax.fromTo( $('.m2'), 0.8, {opacity:1}, {opacity:0.8, ease:Power1.easeInOut, yoyo:true, delay:1, repeat:-1})
  }}),
  TweenMax.fromTo( $('.m3'), 0.8, {width: 0, opacity:0}, {width: 816, opacity:1, delay:0.4 } ),
  TweenMax.fromTo( $('.m4'), 1.2, {width: 0, opacity:0}, {width: 816, opacity:1, delay:0.8 } ),

  TweenMax.fromTo( $('.m5'), 0.4, {x:300, y:200, scale: 0, opacity:0}, {x:0, y:0, scale: 1, opacity:1, delay:1.0 } ),
  TweenMax.fromTo( $('.m7'), 0.4, {x:-200, y:200, scale: 0, opacity:0}, {x:0, y:0, scale: 1, opacity:1, delay:1.3 } ),
  TweenMax.fromTo( $('.m6'), 0.4, {x:50, y:200,scale: 0, opacity:0}, {x:0, y:0, scale: 1, opacity:1, delay:1.1 } ),
]);
setTimeout(function() {
  $('.motion span').addClass('visual');
},4000);
return tlMotion;
}

function fnGetItem(itemType) {
  if (itemType == 1) {
    // 是否可以点击得次数
  }
  // 写个1-10的随机数
  var ranNum = Math.floor(Math.random()*10) + 1;
  // ajax => jResult
  var jResult= { "Result": "OK_FIND", "Msg": "", "UseMsg": "2022 개발자 캡슐 코인 I 3개", "UseMsg2": "item"+ranNum }
  var strResult = jResult.Result;
  var strRetMsg = jResult.Msg;
  var strRetUseMsg = jResult.UseMsg;
  var strRetUseMsg2 = jResult.UseMsg2;
  if (strResult == "OK_FIND") {
    popupItem(strRetUseMsg, strRetUseMsg2);
    return;
  }
}