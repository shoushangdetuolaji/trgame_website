$(function () {
  oddFixed();

  // 初始进度条
	fngauge('.gauge-area',18000);

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

imgSrc = imgSrc ? imgSrc : "./assets/images/items/";
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

function fngauge(target, gaugeNum, total) {
var total = 100000;
var $target = $(target);
var $gauge = $(target).find('.gauge');
var percent = gaugeNum/total*100;

$gauge.css("opacity","1");
if ( gaugeNum >= total ) {
  var percent = 100;
  setTimeout(function() { $gauge.addClass('max'); }, 1000);
} else {
  var percent = parseInt(gaugeNum/total*100);
}
$target.find('.bar').css("width",percent+"%").find('i').html(percent);

var gaugeStep = 0;
gaugeNum >= 100000 ? gaugeStep = 5 : '';
gaugeNum <= 99999 ? gaugeStep = 4 : '';
gaugeNum <= 69999 ? gaugeStep = 3 : '';
gaugeNum <= 49999 ? gaugeStep = 2 : '';
gaugeNum <= 19999 ? gaugeStep = 1 : '';
gaugeNum <= 4999 ? gaugeStep = 0 : '';

incrementalCounter(gaugeNum);
$('.gauge-step').attr('data-range',gaugeStep);
}

function incrementalCounter(num) {
$({ val: 0 }).animate({ val: num }, {
  duration: 600,
  step: function () {
    var num = numberWithCommas(Math.floor(this.val));
    $(".gauge-num").text(num);
  },
  complete: function () {
    var num = numberWithCommas(Math.floor(this.val));
    $(".gauge-num").text(num);
  }
});
}

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
