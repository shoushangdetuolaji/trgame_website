// init 初始化
initHeight();
setSwiper();

function initHeight() {
	$('#evt_wrap').css({
		'min-height': 'calc(100% - ' + $('#evt_wrap').offset().top + 'px)'
	});
}

var titleMotion = new TimelineMax({}).add([
  TweenMax.fromTo( $('.intro .title'), .8, {opacity:0, height:'0%'}, {opacity:1, height:'348px', ease:Power1.easeOut, delay:1.2}),
  TweenMax.fromTo( $('.intro .ceo-list li'), .8, {opacity:0, scale:1.2}, {opacity:1, scale:1, ease:Power1.easeOut, delay:0.5}),
]);




// 按标签分类的 YouTube id 值
var youtubeId = ['h_GGnLkTdqU', 'T70pLRzEFjA', 'CIZ9L7mfMeI', '274U-kYlXDQ', '3FYlXy30NyA' ,'YB6Xo0VbtdM'];

// direct 分组标签切换
$(document).on('click', '.tab-area li', function(e) {
	if ( $(this).find('a').attr('href') === "#" || $(this).find('a').attr('onclick') == '' ) {
		e.preventDefault();
		tabView($(this).index(), $('.tab-area li'), $('.tab-area .tab-content'));
		var idx = $(this).index();
		insertYoutube($('.tab-area'), youtubeId[idx]);
	}
});

// tab切换
function tabView(index, btn, that) {
  $(btn).removeClass('current').eq(index).addClass('current');
  $(that).removeClass('current').eq(index).addClass('current');
}

// 嵌入油管链接
function insertYoutube(obj, url) {
  $(obj).find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>')
  console.log(obj, url);
}

// 
function fnTeamChoice(val) {
  $("#teamChoiceNo").val(val);

  switch (val) {
      case 1:
          $("#teamChoiceName").val('사업팀');
          break;
      case 2:
          $("#teamChoiceName").val('저승관리팀');
          break;
      case 3:
          $("#teamChoiceName").val('마케팅팀');
          break;
      case 4:
          $("#teamChoiceName").val('차사팀');
          break;
      case 5:
          $("#teamChoiceName").val('경영지원팀');
          break;
      case 6:
          $("#teamChoiceName").val('이승관리팀');
          break;
  }
  return;
}

fnTeamChoice(2)



// TeamChoice_direct Page
function fnTeamChoiceInsert() {
  // 判断有无登录状态信息
  // 这里就直接显示已经选好队伍了
  alert('런너님께서는 이미 소속 팀을 선택하셨습니다.Runner已经选好了所属队')
}


// TeamChoice_test  
function fnTeamChoice_test_pop() {
  // 先走登录逻辑程序
  // 是否登录啊，登录了就拿取登录信息
  popup('[data-popup-id=test]');
  swiper.slideTo(0,0);
  return
}
// 当玩家选择12个问题的倾向后，就会走这个ajax返回适合哪个部门名单
function fnTeamChoice_Test() {
 // 最后跳转到一个结果测试页面
 window.location.href = 'teamChoice_Test_Result.html'
}

// Popup
var $popup;
function popup(obj, url) {
  $popup = $(obj);
	var targetY = $(window).scrollTop()+100,
		h = $popup.outerHeight() / 2, w = $popup.outerWidth() / 2;
	$("body").addClass("dimmed");
	$popup.addClass("show").css({top:targetY,opacity:1});
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


var swiper;
function setSwiper() {
	swiper = new Swiper('#swiper', {
		slidesPerView: 1,
		speed : 0,
		touchRatio: 0,	//드래그 금지 No Dragging
		pagination: {
			el: '.swiper-pagination',
			type: "fraction",
		},
		navigation: {
			prevEl: '.btn-prev',
		},
		on: {
			init: function() {
				$('.btn-prev').hide();
			},
			slideChange: function() {
				// console.log( this.realIndex );
				if ( this.realIndex != 0 ) {
					$('.txt-start-msg').hide();
					$('.btn-prev').show();
				}
				else {
					$('.txt-start-msg').show();
					$('.btn-prev').hide();
				}
			}
		}
	});
}
// Next slide exposure function
// 다음 슬라이드 노출 함수
function viewNextSlide() {
	setTimeout(function() {
		swiper.slideNext();
	}, 100);	
}



function fnSetAnswer(q, val) {
  //alert(q);
  $("#q" + q).val(val);
  return;
}

function fnSetAnswerEnd(q, val) {
  //alert(q);
  $("#q" + q).val(val);
  fnTeamChoice_Test();
  return;
}
