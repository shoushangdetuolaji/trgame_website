// 일일미션
// daily mission sign if user logined
// 动态绑定元素的点击事件
// removeClass() hide() 如果没有规定参数，则该方法将从被选元素中删除所有类
$(document).on('click', '.tab-list li:not(.comingsoon) a', function(e) {
	e.preventDefault();
	var index = $(this).parents('li').index();
	tabView(index);
});
function tabView(idx) {
	$('.tab-list li').removeClass('on').eq(idx).addClass('on');
	$('.tab-cont').hide().eq(idx).show();
}

// 스페셜미션 tab
// Special mission sign if user logined
$(document).on('click', '.tab-list2 li:not(.comingsoon) a', function(e) {
	e.preventDefault();
	var index = $(this).parents('li').index();
	tabSpecia(index);
});
function tabSpecia(idx) {
	$('.tab-list2 li').removeClass('on').eq(idx).addClass('on');
	$('.tab-cont-s').hide().eq(idx).show();
}


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

function SetPageNumber(index) {
	var page;
	page = index + 1;
	if (page == 3) {
			$('span[data-type="title"]');
			$($(".popup" + this.$popup.selector + " .btn-guide-reward")[0]).attr("disabled", false);
	}
}

// Popup
var $popup;
function popup(obj, url) {
	$popup = $(obj);
	var targetY = $(window).scrollTop() + 100;
	var h = $popup.outerHeight() / 2;
	var w = $popup.outerWidth() / 2;
	$('body').addClass('dimmed');
	$popup.addClass('show').css({
		top: targetY,
		opacity: 1
	});
}

// PopupClose
function popupClose(that) {
	$('body').removeClass('dimmed').unbind('touchmove');
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