$(function () {
    oddFixed();		
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

//Popup
var $popup;
function popup(obj, url) {
	$popup = $(obj);
	var targetY = $(window).scrollTop()+100;
		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
	$("body").addClass("dimmed");
	$popup.addClass("show").css({top:targetY,opacity:1});

	if ( $popup.attr('data-popup-id') == 'youtube' || $popup.attr('data-popup-id') == 'tab' ) {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
		insertYoutube(youtubeId);
	}
}
var imgSrc;
function popupItem(itemName, imgName, isOpend) {
	$popup = $('[data-popup-id="item"]');
	var targetY = $(window).scrollTop()+100;
		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;

	$popup.addClass("show").css({top:targetY,opacity:1});
	$("body").addClass("dimmed");

	imgSrc = imgSrc ? imgSrc : "./images/items/";
	$popup.css({'background-image':'url('+imgSrc+itemName+'.png)'});
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

//일일미션 tab
$(document).on('click', '.tab-list li:not(.comingsoon) a', function(e) {
	e.preventDefault();
	var index = $(this).parents('li').index();
	tabView(index);
});
function tabView(idx) {
	$('.tab-list li').removeClass('on').eq(idx).addClass('on');
	$('.tab-cont').hide().eq(idx).show();
}


//스페셜미션 tab
$(document).on('click', '.tab-list2 li:not(.comingsoon) a', function(e) {
	e.preventDefault();
	var index = $(this).parents('li').index();
	tabSpecia(index);
});
function tabSpecia(idx) {
	$('.tab-list2 li').removeClass('on').eq(idx).addClass('on');
	$('.tab-cont-s').hide().eq(idx).show();
}


//포인트 샵  popup tab
$(document).on('click', '.popup-tab li', function(e) {
	if ( $(this).find('a').attr('href') === "#" || $(this).find('a').attr('onclick') == '' ) {
		e.preventDefault();
		$(this).parent('.tab').find('li').removeClass('current');
		$(this).addClass('current');

		var idx = $(this).index();
		$('.popup-tab-cont').removeClass('current');
		$('.popup-tab-cont').eq(idx).addClass('current');	
		//포인트 획득내역 탭 호출
		tabList(idx);	
	}
});

//가이드 보기 스와이프
window.onload = function() {
	// //slide
	var mySwiper = new Swiper('.mySwiper', {
		updateOnWindowResize: true,
		touchRatio: 0,
		navigation: {
			nextEl: '.swiper-next-button',
			prevEl: '.swiper-prev-button',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
			clickable: true,
		},
		watchOverflow: true,
		on: {
			slideChange: function () {
				//개발 호출 콜백 함수(페이징 콜백)
				SetPageNumber(this.realIndex);
			}
		},
	});
};
