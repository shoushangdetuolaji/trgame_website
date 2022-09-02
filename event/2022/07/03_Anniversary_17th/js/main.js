$(function() {
  oddFixed();
  loadAjax('./api/event_1.html');
  tabMenu(0);
})

var lnbTop;
var fromTop;
window.onload = function() {
  lnbTop = $('.lnb-wrap').offset().top;
  $(window).scroll(function() {
    fromTop = $(this).scrollTop();
    if (fromTop > lnbTop) {
      $('body').addClass('fxied');
      $('.lnb-wrap').css({
        position: 'fixed',
        top:'0px'
      })
    } else if (fromTop <= lnbTop) {
      $('body').removeClass('fixed');
			$(".lnb-wrap").css({
				position: 'absolute',
				top:'540px'
			});
    }
  })
}

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

// Popup
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

function popupYoutube(obj, url, isOpend) {
  $popup = $(obj);
  $popup.attr('tabindex', 0).addClass('show').focus();
  $popup.blur(function() {
    $(this).removeAttr('tabindex');
  });

  $('body').addClass('dimmed');
	$popup.addClass("show").css({top:100,opacity:1});
	$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	$popup.attr('data-popup-re','').attr('data-popup-re',isOpend);
	return false;
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


function tabMenu(idx) {
  $('.Menu-list li').removeClass('on').eq(idx).addClass('on');
}

//레어닉네임 tab
$(document).on('click', '.tab-list li:not(.comingsoon) a', function(e) {
	e.preventDefault();
	var index = $(this).parents('li').index();
	tabRare(index);
});
function tabRare(idx) {
	$('.tab-list li').removeClass('on').eq(idx).addClass('on');
	$('.tab-cont').hide().eq(idx).show();
}

//컨셉 닉네임 tab
$(document).on('click', '.tab-list2 li:not(.comingsoon) a', function(e) {
	e.preventDefault();
	var index = $(this).parents('li').index();
	tabConcept(index);
});
function tabConcept(idx) {
	$('.tab-list2 li').removeClass('on').eq(idx).addClass('on');
	$('.tab-cont-s').hide().eq(idx).show();
}



// ajax request

function loadAjax(url) {
  $.ajax({
    type: 'GET',
    async: true,
    cache: false,
    url: url,
    dataType: 'html',
    contentType: 'application/x-www-form-urlencoded; charset=euc-kr',
    beforeSend: function(data) {
      data.overrideMimeType('application/x-www-form-urlencoded; charset=euc-kr');
    },
    success: function(result) {
      var refine = $(".content-body").html(result).find('.evt-content').html();
      $('.content-body').html(refine);
    }
  })
}


function loadAjax_sub(url, num) {
  $.ajax({
      type: "GET",
      url: url,
      async: true,
      cache: false,
      dataType: "html",
      contentType: 'application/x-www-form-urlencoded; charset=euc-kr',
      beforeSend: function (data) {
          data.overrideMimeType('application/x-www-form-urlencoded; charset=euc-kr');
      },
      success: function (result) {
          var refine = $(".content-body").html(result).find('#nick_contents').html();
          $('#nick_contents').html(refine);
          tabRare(num);
          tabConcept(num);
      }
  });
}

// loadAjax('./api/event_1.html')