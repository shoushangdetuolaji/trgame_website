var rewardItemList = [
	{
		name: '봉인해제 두루마리 1개',
		imgSrc: './images/items/item19'
	},
	{
		name: '봉인해제 두루마리 2개',
		imgSrc: './images/items/item01'
	}
]

$(function() {
  // 05_hangawe 中秋活动
  startMotion($('.motion'));

  // 鼠标左右移动 触发startMotion
  $('html').mousemove(function(e) {
    var wx = $(window).width();
    var wy = $(window).height();

    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    var newx = x - wx/2;
    var newy = y - wy/2;

    $('.visual').each(function() {
      var speed = $(this).attr('data-speed') ? $(this).attr('data-speed') : 0.03;
      if ($(this).attr('data-revert')) speed *= -1;
      TweenMax.to($(this), 1, {x: (1 - newx*speed)});
			// TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
    })
  })

	$('button[data-href]').click(function(e){
		var href = $(this).data("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 400, "easeInOutExpo");

		return false;
		e.preventDefault();
	});
})


$(window).scroll(function(){
	if ( $(window).scrollTop() > 100 ){
			$(".btn-top").addClass("show")
	} else {
			$(".btn-top").removeClass("show")
	}
});


// api request
function loadAjax(url) {
  $.ajax({
    type: 'GET',
    async: false,
    cache: false,
    url: url,
    dateType: 'html',
    BeforeSend: function(data) {
      data.overrideMimeType('application/x-www-form-urlencoded; charset=euc-kr');
    },
    success: function (result) {
      var refine = $(".content-body").html(result).find('.tab-cont').html();
      $('.content-body').html(refine);
    }
  })
}


// 05_hangawe 中秋活动 
// Title Appearance Motion
var tlMotion = '';
function startMotion(target) {

  tlMotion = new TimelineMax({delay:0.5}).add([
		TweenMax.fromTo( $('.m1'), 1, {scale:1.02, x:-500, opacity:0, transformOrigin:'left bottom'}, {scale:1, x:0, opacity:1 } ),
		TweenMax.fromTo( $('.m2'), 1.4, {scale:1.02, x:500, opacity:0, transformOrigin:'right bottom'}, {scale:1, x:0, opacity:1, delay:0.4 } ),
		TweenMax.fromTo( $('.m3'), 1, {scale:0.6, y:600, opacity:1}, {scale:1, y:0, opacity:1, delay:1, ease:Elastic.easeOut.config(1,1) } ),
		TweenMax.fromTo( $('.m4, .m5'), 1, {y:100, opacity:0}, {y:0, opacity:1, delay:1.8, ease:Elastic.easeOut.config(1,0.7) } ),
		TweenMax.fromTo( $('.m6'), 0.8, {y:20, opacity:0}, {y:0, opacity:1, delay:2.6 } ),
	]);
	setTimeout(function() {
		$('.motion span').addClass('visual');
	},4000);
	return tlMotion;
}

// lnb switch status
$(document).on('click', '.lnb-wrap li:not(.comingsoon)', function() {
  $(this).siblings('li').removeClass('current');
  $(this).addClass('current');

  var index = $(this).index();
  $('body').attr('data-tabNum', index);
})

// 05_hangawe tab3 click cause to motion
function fnGame(itemName, imgName) {
	$('.visual-motion').addClass('on');
	$('.btn-start').attr('disabled', true);
	setTimeout(function() {
		$('.visual-motion').removeClass('on');
		popupItem(itemName, imgName);
	}, 3000);
}

function fnValidate(num) {
	// var strParams = {Type: num, Acc: Acc};
	// 模拟请求 J_Send_Item.asp， strParams, 然后获取
	// var strRetUseMsg = jResult.UseMsg;
	// var strRetUseMsg2 = jResult.UseMsg2;
	// 触发页面动画效果
	if (num === 1) {
		const {name, imgSrc} = rewardItemList[0];
		fnGame(name, imgSrc);
	} else {
		alert('获取奖品成功');
		// 然后修改buttn的状态
	}

}

// popup
//Popup
var $popup;
function popup(obj, url) {
	$popup = $(obj);
	var targetY = $(window).scrollTop()+100;
	var	h = $popup.outerHeight()/2;
  var w = $popup.outerWidth()/2;
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
	var h = $popup.outerHeight()/2;
  var w = $popup.outerWidth()/2;

	$popup.addClass("show").css({top:targetY,opacity:1});
	$("body").addClass("dimmed");

	// imgSrc = imgSrc ? imgSrc : "./assets/images/items/";
	$popup.find('.item-name').html(itemName);
	$popup.find('.item-img').html('<img src="'+ imgName + '.png" alt="item image">');
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

function popupClose_item(that) {
	$("body").removeClass("dimmed").unbind('touchmove');
	var type = typeof (that); //this == "object"
	if (type == "object") {
			$(that).parents('.popup').removeAttr("style").removeClass("show");
			$(that).parents('.popup').find(".iframe iframe").remove();

			if ($(that).parents('.popup').attr('data-popup-id') == 'item') {
					if ($(that).parents('.popup').attr('data-popup-re') != 're') {
							loadAjax(refreshUrl);
					}
			}
	} else {
			$(that).parents('.popup').removeAttr("style").removeClass("show");
	}
}