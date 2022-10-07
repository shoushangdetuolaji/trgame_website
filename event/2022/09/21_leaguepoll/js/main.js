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
if(index === 1) {
  $('.content-body').addClass('v2');
  $('.evt-header').addClass('v2');
} else {
  $('.content-body').removeClass('v2');
  $('.evt-header').removeClass('v2');
}
$('.compensation-content').removeClass('current').hide().eq(index).addClass('current').show();
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

function fnGame(itemName, imgName) {
$('.visual-motion').addClass('on');
$('.btn-start').attr('disabled',true);
setTimeout(function() {
  $('.visual-motion').removeClass('on');
  popupItem(itemName,imgName);
}, 3000);
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
  TweenMax.fromTo( $('.m1'), 1, {scale:0}, {scale:1, opacity:1, ease:Elastic.easeOut.config(1,0.8) } ),
  TweenMax.fromTo( $('.m2'), 0.4, {scale:1.02, x:-100, opacity:0, transformOrigin:'left bottom'}, {scale:1, x:0, opacity:1, delay:0.4 } ),
  TweenMax.fromTo( $('.m3'), 0.4, {scale:1.02, x:100, opacity:0, transformOrigin:'right bottom'}, {scale:1, x:0, opacity:1, delay:0.4 } ),
]);
setTimeout(function() {
  $('.motion span').addClass('visual');
},4000);
return tlMotion;
}