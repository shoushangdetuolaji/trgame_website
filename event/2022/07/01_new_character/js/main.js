var youtubeId = ['GRjzLdhwaPE','SkNJx-VfTQo'];

var swiperData = {
	1: {
		"tit": "<span class=\"slide1\">담연 소개 영상</span>",
		"url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/BhtxYEGYj7E?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
	},
	2: {
		"tit": "<span class=\"slide2\">담연 야근 일러스트</span>",
		"url": "<div class=\"image\"><img src=\"./images/img_slide02.jpg\" alt=\"담연 야근 일러스트 이미지\"></div>",
	},
	3: {
		"tit": "<span class=\"slide3\">담연 백화선 일러스트</span>",
		"url": "<div class=\"image\"><img src=\"./images/img_slide03.jpg\" alt=\"담연 백화선 일러스트 이미지\"></div>",
	},
	4: {
		"tit": "<span class=\"slide4\">담연 모션 영상</span>",
		"url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/S0bbZ_LVmcI?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
	}
}


$(function() {
	oddFixed();
initHeight();
setSwiper();
insertYoutube($('.section01'), youtubeId[0]);
insertYoutube($('.section05'), youtubeId[1]);

$('button[data-href]').click(function(e) {
	var href = $(this).data("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top + 1 - 85;

	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 400, "easeInOutExpo");

	e.preventDefault();
	return false;
});
});

//gnb 높이 가변에 따른 event min-height 100% init
function initHeight() {
$('#evt_wrap').css({
	'min-height': 'calc(100% - ' + $('#evt_wrap').offset().top + 'px)'
});
}

//window odd fixed
function oddFixed() {
if ($(window).width() % 2 != 0)	{
	var width = $(window).width() - 1;
	$('html').width(width);
	// $('.gnb-wrap').width(width);
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
if ( $popup.attr('data-popup-id') == 'idCard') {
	$popup.css({top:0});
}
if ( $popup.attr('data-popup-id') == 'complete') {
	$('.popup:not([data-popup-id=complete])').each(function() {
		$(this).removeAttr("style").removeClass("show");
	});
}
}
var imgSrc;
function popupItem(itemName, imgName, isOpend) {
$popup = $('[data-popup-id="item"]');
var targetY = $(window).scrollTop()+100;
	h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;

$popup.addClass("show").css({top:targetY,opacity:1});
$("body").addClass("dimmed");

imgSrc = imgSrc ? imgSrc : "./images/";
$popup.css({'background-image':'url('+imgSrc+'items/'+itemName+'.png)'});
$popup.find('.item-img').html('<img src="' + imgSrc +'items/'+ imgName + '.jpg" alt="item image">');
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

	if ( $(that).parents('.popup').attr('data-popup-id') == 'media') {
		stopSwiperYoutube();
	}
} else {
	$(that).parents('.popup').removeAttr("style").removeClass("show");
}
}

//tab
function tabView(index, btn, that) {
$(btn).removeClass('current').eq(index).addClass('current');
$(that).removeClass('current').eq(index).addClass('current');
}

function insertYoutube(obj, url) {
$(obj).find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
}

var swiper;
function setSwiper() {
swiper = new Swiper('#swiper', {
	slidesPerView: 1,
	loop: true,
	speed : 0,
	touchRatio: 0,	//드래그 금지
	pagination: {
		// el: '.swiper-pagination',
		// type: "fraction",
	},
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next',
	},
	on: {
		init: function() {
			// console.log( this.realIndex );
		},
		slideChange: function() {
			insertSwiperData( this.realIndex +1 );
			stopSwiperYoutube();
		}
	}
});
}

function insertSwiperData(index) {
var title = swiperData[index]["tit"];
$('.popup-tit').html(title);
}
function stopSwiperYoutube() {
$('.swiper-slide').each(function () {
	var youtubePlayer = $(this).find('iframe').get(0);
	if (youtubePlayer) {
		//iframe src must contain "?enablejsapi=1" It will allow to use youtube api to pause video on slide change
		youtubePlayer.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
	}
});
}

var isClick = 0;
$(document).on('click', '.media-area li button', function() {
var idx = $(this).parents('li').attr('data-slide-num');
popup('[data-popup-id=media]');

$('#swiper .swiper-slide').each(function(e) {
	if ( isClick == 0 ) {
		var dataNum = $(this).attr('data-slide-num');
		var data = swiperData[dataNum]["url"];
		$(this).html(data);
	}			
});
insertSwiperData(idx);
isClick = 1;
swiper.slideTo(idx);

//페이지 내에 있는 youtube 초기화
insertYoutube($('.section01'), youtubeId[0]);
insertYoutube($('.section05'), youtubeId[1]);
});