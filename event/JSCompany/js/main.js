initHeight();
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


var gnbTop;
window.onload = function() {
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
	var isScroll = $('body').hasClass('scroll') ? -$(window).scrollLeft() : 0
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