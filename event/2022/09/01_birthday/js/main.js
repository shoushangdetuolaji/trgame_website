// Character likability. Exposing lines
var charStepMsg = {
	1: [
		"반갑습니다. <br>학생회장 아벨입니다.",
		"학교가 따분하다 생각이 들었는데, <br>그렇진 않군요.",
		"덕분에 무척이나 <br>즐거운 것 같습니다.",
	],
	2: [
		"안녕. ...아야, <br>뭔가가 내 머리를 당기네.",
		"내 뒤에 유령? <br>유령은 없어. 아하핫!",
		"...유령이 너를 응원한다고? <br>유령은 없어.",
	],
}

$(function() {
  oddFixed();
  AOS.init();
  $('button[data-href]').click(function(e) {
		var href = $(this).data("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 400, "easeInOutExpo");

		e.preventDefault();
		return false;
	});

  // page OnInit
  viewCharacter(0);
  fngauge('.char1',28,30);
  fngauge('.char2',10,30);
  if ("-1" != "-1") {
    goToSection('.section01')
  }
})

// window odd fixed
function oddFixed() {
  if ($(window).width() % 2 != 0) {
    var width = $(window).width() - 1;
    $('html').width(width);
  } else {
    $('html').width('100%');
  }
}

$(window).resize(function() {
  oddFixed();
})


// tab
function tabView(index, btn, that) {
  $(btn).removeClass('current').eq(index).addClass('current');
  $(that).removeClass('current').eq(index).addClass('current');
}

// login
function fnLogin(btn) {
  alert('login success');
  $('.popup').eq(1).hide();
}

// popup
var $popup;
function popup(obj, url) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 100;
  var h = $popup.outerHeight() / 2;
  var w = $popup.outerWidth() / 2;
  $('body').addClass('dimmed');
  $popup.addClass('show').css({ top: targetY, opacity: 1 });
}

// popupClose
function popupClose(that) {
  $('body').removeClass('dimmed').unbind('touchmove');
  var type = typeof(that);
  if (type == 'object') {
    $(that).parents('.popup').removeAttr('style').removeClass('show');
    $(that).parents('.popup').find('.iframe iframe').remove();
  } else {
    $(that).parents('.popup').removeAttr('style').removeClass('show');
  }
}

// dimmed click popup close
$(document).on('click', function(e) {
  var $tgPoint = $(e.target);
  // console.log($tgPoint);
  if ( $tgPoint.hasClass('dimmed')) {
    $popup.removeAttr('style').removeClass('show');
    $('body').removeClass('dimmed');
    // popup object reset
    $popup = ''
  }
});

// Motion when clicking the Character tab
$(document).on('click', '.character-list li', function(e) {
	var tabIdx = $(this).index();
	// tlMotion.kill();
	viewCharacter(tabIdx);
});

// Character Appearance Motion
var tlMotion = '';
function viewCharacter(index) {
	var target = $('.char'+(index+1));
	var $bg = target.find('.bg-frame');
	var $bg2 = target.find('.bg-character span');
	var $character = target.find('.img-character');
	var $balloon = target.find('.balloon');
	var gaugeTxt = $('.char'+(index+1)+' .gauge').find('.bar i').text();

	//게이지
	$('.char'+(index+1)+' .gauge .bar').css('width',0).animate({
		'width': gaugeTxt + '%'
	});
	tabView(index,$('.character-list li'),$('.character-content'));

	tlMotion = new TimelineMax().add([
		TweenMax.fromTo( $bg, 0.8, {rotation:-180, opacity:0}, {rotation:0, opacity:0.5, yoyo:true, repeat:1 } ),
		TweenMax.fromTo( $bg2, 4, {scale:2, opacity:0}, {scale:1, opacity:1, ease:Elastic.easeOut.config(1,0.7) } ),
		TweenMax.fromTo( $character, 0.5, {opacity:0}, {opacity:1, delay:1 } ),
		TweenMax.fromTo( $balloon, 1, {scale:0, opacity:1}, {scale:1, opacity:1, delay:1.5, ease:Elastic.easeOut.config(1,0.4) } )
	]);
	return tlMotion;
}

// Gauge motion in bar
function fngauge(target, gaugeNum, total) {
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

	// Display Gauge Numbers
	$(target).find('.gauge-area').next('p').find('.gauge-step').html(gaugeNum);
	// gaugeNum >= total ? $gauge.next('.gauge-num').html('MAX') : $gauge.next('.gauge-num').html(percent+'%'); // Mark % on Hearts

	// Expose text by interval
	var gaugeStep = 1;
	gaugeNum == 30 ? gaugeStep = 3 : '';
	gaugeNum <= 29 ? gaugeStep = 2 : '';
	gaugeNum <= 15 ? gaugeStep = 1 : '';
	$target.attr('data-range',gaugeStep);
	insertData($target.find('.balloon'), charStepMsg[$target.index() - 1][gaugeStep - 1]);
}


// Insert character speech bubble text
function insertData(target, text) {
	target.find('p').html(text);
}

function goToSection(href) {
	var offsetTop = $(href).offset().top + 1;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 0, "easeInOutExpo");

	return false;
}