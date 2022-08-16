// promotion swiperData

var swiperData = {
  1: {
    "tit": "§ 마고 & 염라의 17주년 축사 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/CUJJZ9j3Wqk?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  2: {
    "tit": "§ 저승컴퍼니 웹툰 3화 §",
    "url": "<div class=\"image\"><img src=\"../Promotion/images/img_slide1_1.jpg\" alt=\"웹툰 3-1\"><img src=\"../Promotion/images/img_slide1_2.jpg\" alt=\"웹툰 3-2\"><img src=\"../Promotion/images/img_slide1_3.jpg\" alt=\"웹툰 3-3\"><img src=\"../Promotion/images/img_slide1_4.jpg\" alt=\"웹툰 3-4\"><img src=\"../Promotion/images/img_slide1_5.jpg\" alt=\"웹툰 3-5\"><img src=\"../Promotion/images/img_slide1_6.jpg\" alt=\"웹툰 3-6\"></div>",
  },
  3: {
    "tit": "§ 저승컴퍼니 웹툰 2화 §",
    "url": "<div class=\"image\"><img src=\"../Promotion/images/img_slide2_1.jpg\" alt=\"웹툰 2-1\"><img src=\"../Promotion/images/img_slide2_2.jpg\" alt=\"웹툰 2-2\"><img src=\"../Promotion/images/img_slide2_3.jpg\" alt=\"웹툰 2-3\"><img src=\"../Promotion/images/img_slide2_4.jpg\" alt=\"웹툰 2-4\"></div>",
  },
  4: {
    "tit": "§ 신입 차사 오리엔테이션 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/oxW_SrDa1pE?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  5: {
    "tit": "§ 담연 부장 소개 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/BhtxYEGYj7E?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  6: {
    "tit": "§ 저승 전경 §",
    "url": "<div class=\"image\"><img src=\"../Promotion/images/img_slide5.jpg\" alt=\"저승 전경 이미지\" width=\"100%\" height=\"100%\"></div>",
  },
  7: {
    "tit": "§ 저승컴퍼니 : 프롤로그 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/nv_5FaVDJaw?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  8: {
    "tit": "§ 신입 차사 공개 채용 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/vYcXfgxKaM0?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  9: {
    "tit": "§ 저승컴퍼니 기업 광고 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/wHbrQOMWxik?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  10: {
    "tit": "§ 저승컴퍼니 웹툰 1화 §",
    "url": "<div class=\"image\"><img src=\"../Promotion/images/img_slide9_1.jpg\" alt=\"웹툰 1-1\"><img src=\"../Promotion/images/img_slide9_2.jpg\" alt=\"웹툰 1-2\"><img src=\"../Promotion/images/img_slide9_3.jpg\" alt=\"웹툰 1-3\"><img src=\"../Promotion/images/img_slide9_4.jpg\" alt=\"웹툰 1-4\"><img src=\"../Promotion/images/img_slide9_5.jpg\" alt=\"웹툰 1-5\"></div>",
  },
  11: {
    "tit": "§ 업데이트 트레일러 §",
    "url": "<div class=\"youtube\"><iframe src=\"https://www.youtube.com/embed/PsURbJZFQgs?enablejsapi=1&rel=0\" frameborder=\"0\" allowfullscreen></iframe></div>",
  },
  12: {
    "tit": "§ 저승컴퍼니 건물 §",
    "url": "<div class=\"image\"><img src=\"../Promotion/images/img_slide11.jpg\" alt=\"저승컴퍼니 건물 이미지\" width=\"100%\" height=\"100%\"></div>",
  },
}



initHeight();
setSwiper();

// 当页面加载完元素
if ($('.main').length > 0) {
  // TimelineMax 来自librarys的动画工具函数
  var titleMotion = new TimelineMax({ repeat: 2, delay: 0. }).add([
    TweenMax.fromTo( $('.evt-header'), 1, { height:844 }, { height: 764, ease: Elastic.easeOut.config(1,0.4) } ),
    TweenMax.fromTo( $('.content-body'), 1.4, { y:100, opacity:1 }, { y:0, opacity: 1, ease: Elastic.easeOut.config(1,0.4) } ),
  ]);
}

//gnb 메뉴별 활성화 제어
//gnb 菜单移入移出效果
$('.gnb > li').on('mouseover', function(e) {
  $('.lnb-area').stop().hide();
  $(this).find('.lnb-area').stop().show();
});
$('.gnb').on('mouseleave', function(e) {
  $('.lnb-area').stop().hide();
  $('.gnb > li.current').find('.lnb-area').stop().show();
});

//gnb 메뉴에 따른 페이지별 클래스 부여
//gnb 按菜单栏分配样式类名
$('.gnb > li.current').each(function() {
  var currentMenu = $(this).index();
  console.log(currentMenu)
  var className = '';
  switch(currentMenu) {
    case 0: className = 'lobby'
      break;
    case 1: className = 'information'
      break;
    case 2 : className = 'office'
      break;
    case 3 : className = 'shop'
      break;
    case 4 : className = 'promotion'
      break;
    case 5 : className = 'director'
      break;
  }
  $('#evt_wrap').addClass(className);
});


//gnb 높이 가변에 따른 lnb 상단 고정(window.onload로 해야 stove랑 미충돌)
var gnbTop;
window.onload = function() {
  console.log('onload ...')
	gnbTop = $(".gnb-wrap").offset().top;
	$(this).scrollTop() > gnbTop ? $('body').addClass('scroll') : $('body').removeClass('scroll')
	
	$(window).scroll(function(){		
		$(this).scrollTop() > gnbTop ? $('body').addClass('scroll') : $('body').removeClass('scroll')
		gnbResize();
	});

	$(window).resize(function() {
		gnbResize();
	});
	gnbResize();
};

function gnbResize() {
	//gnb fixed 여부에 따른 스타일 분기
	var isScroll = $('body').hasClass('scroll') ? - $(window).scrollLeft() : 0
	$('.gnb-wrap').css({
		left: isScroll,
		width: $('#evt_wrap').width()
	});
}

//gnb 높이 가변에 따른 event min-height 100% init
function initHeight() {
	$('#evt_wrap').css({
		'min-height': 'calc(100% - ' + $('#evt_wrap').offset().top + 'px)'
	});
}


// var isAnagram = function (s, t) {
//   if (s.length !== t.length) {
//     return false;
//   }
//   const map = new Map();
//   for (let i = 0; i<s.length;i++) {
//     if (map.has[s[i]]) {
//       map.set(s[i], map.get(s[i])+1);
//     } else {
//       map.set(s[i], 1)
//     }
//     if (map.has[t[i]]) {
//       map.set(t[i], map.get(t[i])-1);
//     } else {
//       map.set(t[i], -1)
//     }
//   }
//   for (const letter of map) {
//     console.log(letter)
//     console.log(map)
//     if (letter[1]!==0) {
//       return false;
//     }
//   }
//   return true;
// }
// isAnagram('anagram', 'nagaram')


// Promotion板块的swiper 定义
var swiper;
function setSwiper() {
	swiper = new Swiper('#swiper', {
		slidesPerView: 1,
		loop: true,
		speed : 0,
		touchRatio: 0,	//드래그 금지
		pagination: {
			el: '.swiper-pagination',
			type: "fraction",
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

//회사홍보관
var isClick = 0;
$(document).on('click', '.promotion-area li button', function() {
	var idx = $(this).parents('li').attr('data-slide-num');
	popup('[data-popup-id=promotion]');

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

	//개발 호출 함수
	// fnCallGA(idx);
});


//Popup
var $popup;
function popup(obj, msgNum, url) {
	$popup = $(obj);
	$popup.attr('tabindex', 0).addClass('show').focus();
	$popup.blur(function() {
		$(this).removeAttr('tabindex');
	});
	var targetY = $(window).scrollTop()+100;
		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;
		
	//알럿&컨펌 팝업의 경우 모달형식으로 띄움
	if ( $popup.attr('data-popup-type') == 'modal' ) {
		$('body').addClass('modal');
		$popup.find('.popup-msg').html(msgNum);
		$popup.addClass("show");
	}
	else {
		$('body').addClass('dimmed');
		$popup.addClass("show").css({top:targetY,opacity:1});
	}

	if ( $popup.attr('data-popup-type') == 'youtube') {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	}
	return false;
}


// popupClose
function popupClose(that) {
	$("body").removeClass("dimmed").unbind('touchmove');
	var type = typeof(that); //this == "object"
	if ( type == "object" ) {
		$(that).parents('.popup, .talk-modal').removeAttr("style").removeClass("show");
		$(that).parents('.popup, .talk-modal').find(".iframe iframe").remove();
		if ($(that).parents('.popup, .talk-modal').attr('data-popup-type') == 'modal') {
			$('body').removeClass('modal');
		}
		else {
			$('body').removeClass('dimmed');
		}

		// if ( $(that).parents('.popup, .talk-modal').attr('data-popup-type') == 'item') {
		// 	if ( $(that).parents('.popup, .talk-modal').attr('data-popup-re') != 're') {
		// 		document.location.reload();
		// 	}
		// }
		if ( $popup.attr('data-popup-id') == 'promotion') {
			stopSwiperYoutube();
		}
	} else {
		$(that).parents('.popup').removeAttr("style").removeClass("show");
	}
}
