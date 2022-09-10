// $.getJSON('/guide/js/characters_20220720.json', function(data) {
//   console.log(data)
// })
$(document).ready(function() {
  if (window.location.search) {
    let search = window.location.search.split('?')[1]

    let cnum = search.split('&')[0].split('=')[1]
    let ctype = search.split('&')[1].split('=')[1]
    insertData(ctype, cnum);
  } else {
    insertData(1, 1);
  }
});

document.addEventListener("DOMContentLoaded", function() {
	//main
	if ($('#wrapper.main').length > 0) trCharacter.main();
	//sub
	if ($('#wrapper.sub').length > 0) trCharacter.sub();
});


var trCharacter = {
  // 设置出场动画效果
  main: function() {
    $('.character-wrap').each(function(e) {
      var delayTime = 0.2;
      TweenMax.fromTo($(this).find('.tit-character'), 2, {opacity:0, y:100}, {opacity:1, y:0, delay:0.4*e, ease: Power4.easeOut});
			TweenMax.fromTo($(this).find('.character-list'), 2, {opacity:0, y:100}, {opacity:1, y:0, delay:delayTime+(0.4*e), ease: Power4.easeOut});
    })
  },
  sub: function() {
    motionCharacter();
		tlMotion.restart();
		$('.character-list a').on('click', function(e) {
			e.preventDefault();
			tlMotion.restart();
			$('html, body').scrollTop(0);
		});
  }
}

// 角色登场动作时间线
var tlMotion = '';
var motionCharacter = function() {
	tlMotion = new TimelineMax().add([
		TweenMax.to(".character-name", 0, {opacity:0}),
		TweenMax.fromTo(".character-name", 1.2, {x:-200, opacity:0}, {x:0, opacity:1, delay:0.4, ease:Power4.easeOut}),
		TweenMax.fromTo(".info-area", 1.2, {x:-200, opacity:0}, {x:0, opacity:1, delay:0.4, ease:Power4.easeOut}),
		TweenMax.fromTo(".desc", 1.2, {x:-200, opacity:0}, {x:0, opacity:1, delay:0.6, ease:Power4.easeOut}),
		TweenMax.fromTo(".profile", 1.2, {x:-200, opacity:0}, {x:0, opacity:1, delay:0.8, ease:Power4.easeOut}),
		TweenMax.fromTo(".info-area .chart", 1.2, {x:-200, opacity:0}, {x:0, opacity:1, delay:0.8, ease:Power4.easeOut}),

		TweenMax.fromTo($('.character-img'), 1, {opacity:0}, {opacity:1, delay:0.2}), // 角色
		TweenMax.fromTo($('.character-img span'), 1, {opacity:0, scale:1.8}, {opacity:1, scale:1, delay:0.2, ease: Elastic.easeOut.config(1,0.93)}), // 角色
		TweenMax.fromTo($('.character-img i'), 2, {opacity:0}, {opacity:1, delay:0.2, ease: Power4.easeOut}),	// 角色的背景光
		TweenMax.fromTo($('.multimedia-area'), 2, {y:-50, opacity:0}, {y:0, opacity:1, delay:1.3, ease: Power4.easeOut}),
	]);
	return tlMotion;
}



//Popup
var posY;
var $popup;
function popup(obj,msgNum) {
	$popup = $(obj);
	$popup.attr('tabindex', 0).addClass('show').focus();
	$popup.blur(function() {
		$(this).removeAttr('tabindex');
	});

	// 弹出消息框
	if ($popup.attr('data-popup-id') == 'alert' || $popup.attr('data-popup-id') == 'confirm') {
		$('body').addClass('modal');
		$popup.find('.popup-msg').html(msgNum);
	}
	else {
		$('body').addClass('dimmed');
	}

	if ( $popup.attr('data-popup-id') == 'youtube' ) {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	}

	// 弹出尺寸为奇数时变更为偶数（防止变模糊现象）
	var w = document.querySelector(obj).offsetWidth,
		h = document.querySelector(obj).offsetHeight;
	if ( w % 2 != 0) {
		$popup.css('width', w + 1);
	}
	if ( h % 2 != 0) {
		$popup.css('height', h + 1);
	}
	return false;
}
// Popup Media(illust, youtube)
function popupMedia(obj, url) {
	$popup = $(obj);
	$("body").addClass("dimmed");
	$popup.addClass("show");

	if ( $popup.attr('data-popup-id') == 'youtube' ) {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	}
	else if ( $popup.attr('data-popup-id') == 'illust' ) {
		$popup.find('.illust').empty().html('<img src="' + url + '" alt="illust image">');
	}
}
// Popup close
function popupClose(that) {
	var obj = typeof(that); //this == 'object'
	if ( obj == 'object' ) {
		$(that).parents('.popup').removeAttr('style').removeClass('show');
		if ($(that).parents('.popup').attr('data-popup-id') == 'alert' || $(that).parents('.popup').attr('data-popup-id') == 'confirm') {
			$('body').removeClass('modal');
		}
		else {
			$('body').removeClass('dimmed');
		}
		
		if ( $(that).parents('.popup').attr('data-popup-id') == 'youtube' ) {
			$(that).parents('.popup').find('iframe').remove();
		}
	}
	else {
		$('body').removeClass('dimmed');
		$(that).removeAttr('style').removeClass('show');
	}
	// YouTube时从弹出窗口删除 iframe
	if( that === '[data-popup-id=youtube]') {
		$(that).find('.iframe').remove();
	}
}
// Popup dimmed click
$(document).on('click', function(e) {
	var $tgPoint = $(e.target);
	if ( $tgPoint.hasClass('dimmed') ) {
		$popup.removeAttr("style").removeClass("show");
		$("body").removeClass("dimmed");

		if ( $popup.attr('data-popup-id') == 'youtube' ) {
			$popup.find('iframe').remove();
		}
		// popup object reset
		$popup = '';
	}
});


// 角色数据联动
// getJSON函数来自 librarys.js的封装
var jsonUrl = '';
function insertData(characterType, index) {
  if (index == '') return false; // 空闲时角色无变化处理
  if ( characterType == 0) {
    // 本地json数据的
    // 线上链接 https://tr-image.game.onstove.com/webapp/pc/character/assets/data/characters.json?20220720
    // jsonUrl = '/guide/js/characters_20220720.json'
    jsonUrl = 'https://tr-image.game.onstove.com/webapp/pc/character/assets/data/characters.json?20220720'
  } else if (characterType == 1) {
    // 线上链接 https://tr-image.game.onstove.com/webapp/pc/character/assets/data/characters_story.json?20220720
    // jsonUrl = '/guide/js/characters_story_20220720.json'
    jsonUrl = 'https://tr-image.game.onstove.com/webapp/pc/character/assets/data/characters_story.json?20220720'
  }
  $.getJSON(jsonUrl, function(data) {
		var dataNum = data[index],
			profileHtml = '',
			chartHtml = '',
			tooltipHtml = '',
			multimediaHtml = '';

		//init
		$('.multimedia').remove();
	
		//insert data
		$('.character-name').attr('style','background-image:url("' + dataNum["nameImg"] + '")').html(dataNum["name"]);
		$('.info-area .desc').html(dataNum["desc"]);
		$.each(dataNum["profile"], function(key, value) {
			profileHtml += '<li><strong>' + key + '</strong><span>' + value + '</span></li>'
		});
		tooltipHtml += '<div class="tooltip-area">',
		tooltipHtml += '	<i class="ico ico-tooltip-s"></i>',
		tooltipHtml += '	<p class="tooltip"><em>전용 능력치</em>는 해당 캐릭터가 가지고 있는 고유한 능력치입니다.</p>',
		tooltipHtml += '</div>';
	
		$('.profile').html(profileHtml);
		$('.profile li:last-child').addClass('stat-own').append(tooltipHtml);
	
		$('.chart ul').attr('style','background-image:url("' + dataNum["chartImg"] + '")');
		$.each(dataNum["chart"], function(key, value) {
			chartHtml += '<li><strong>' + key + '</strong><span>' + value + '</span></li>'
		});
		$('.chart ul').html(chartHtml);
		$('.character-img span').attr('style','background-image:url("' + dataNum["characterImg"] + '")');
	
		if ( dataNum["multimedia"] != '' ) {
			multimediaHtml += '<ul class="multimedia">';
				$.each(dataNum["multimedia"], function(key, value) {
					var value1 = dataNum["multimedia"][key]["popupType"];
					var value2 = dataNum["multimedia"][key]["popupValue"];
					var value3 = dataNum["multimedia"][key]["thumbImg"];
					var value4 = dataNum["multimedia"][key]["popupName"];
	
					multimediaHtml += '<li class="' + value1 + '">';
						if ( value1 == "link" ) {
							multimediaHtml += '		<button type="button" onclick="window.open(\'' + value2 + '\')">';
						} else {
							multimediaHtml += '		<button type="button" onclick="popupMedia(\'[data-popup-id=' + value1 + ']\',\'' + value2 + '\')">';
						}
					multimediaHtml += '			<span style="background-image:url(\'' + value3 + '\')"></span>';
					multimediaHtml += '		</button>';
					multimediaHtml += '		<p>' + value4 + '</p>';
					multimediaHtml += '</li>';
				});
			multimediaHtml += '</ul>';
			$('.container-bottom .multimedia-area').html(multimediaHtml);
		}
	
		$('[data-popup-id="motion"] .popup-name').attr('style','background-image:url("' + dataNum["popupTitImg"] + '")');
	
		$.each(dataNum["popupMotion"], function(key, value) {
			$('[data-popup-id="motion"] table td').eq(key).html(value);
		});
	});
}