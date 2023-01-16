var popupYoutubeId = "XrqcvFxh8J8";
$(function () {
  oddFixed();

  $(".btn-anymore").on("click", function () {
    notToday = true;
  });
});

//window odd fixed
function oddFixed() {
  if ($(window).width() % 2 != 0) {
    var width = $(window).width() - 1;
    $("html").width(width);
  } else {
    $("html").width("100%");
  }
}

$(window).resize(function () {
  oddFixed();
});

var notToday = false;
$(window).on("load", function () {
  if (!!notToday) {
    startMotion();
  }
});

//Popup
var $popup;
function popup(obj) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 100;
  (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);
  $("body").addClass("dimmed");
  $popup.addClass("show").css({ top: targetY, opacity: 1 });

  if ($popup.attr("data-popup-id") == "youtube") {
    $popup
      .find(".iframe")
      .empty()
      .append(
        '<iframe src="https://www.youtube.com/embed/' +
          popupYoutubeId +
          '?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>'
      );
  }

  if (!!notToday) {
    $(".btn-anymore").hide();
  }
}

function popupClose(that) {
  $("body").removeClass("dimmed").unbind("touchmove");
  $(that).parents(".popup").removeAttr("style").removeClass("show");

  if ($popup.attr("data-popup-id") == "youtube") {
    $popup.find(".iframe").empty();
  }

  if (!isMotionView) {
    startMotion();
    isMotionView = true;
  }
}

//tab
function tabView(index, btn, that) {
  $(btn).removeClass("current").eq(index).addClass("current");
  $(that).removeClass("current").hide().eq(index).addClass("current").show();
}

//새로고침 시 스크롤 컨텐츠 원하는 위치로 이동
function goToSection(href) {
  offsetTop = $(href).offset().top - 200;
  $("html, body").stop().animate(
    {
      scrollTop: offsetTop,
    },
    0,
    "easeInOutExpo"
  );

  return false;
}

$(document).ready(function () {
  $window = $(window);

  var delayPosition = $window.height() / 2, // 다음 섹션이 브라우저 하단으로부터 브라우저 높이의 반만큼 보여질때
    windowheight; // 현재 브라우저의 높이값

  // 브라우저의 크기가 변하면 대상 엘리먼트의 위치값을 다시 할당
  $window.on("resize", function () {
    insertTargetPosition();
  });

  // 스크롤이 이동할때
  $window.on("scroll", function () {
    // 현재의 위치 = 스크롤이 이동한 값 + 윈도우 높이 - 처음에 선언한 지연 위치값;
    var position = $window.scrollTop() + windowheight - delayPosition;

    $('[data-type="motion"]').each(function () {
      // 활성화되어 있지 않고 타겟의 위치값이 현재 위치값보다 작으면 (한번만 노출)
      if (!$(this).hasClass("active") && $(this).data("offsetTop") < position) {
        $(this).addClass("active");
      }

      // 타겟의 위치값이 현재 위치값보다 작으면 (스크롤 이동시 재노출)
      // if ($(this).data('offsetTop') < position) {
      // 	$(this).addClass('active');
      // }
      // else {
      // 	$(this).removeClass('active');
      // }
    });
  });

  function insertTargetPosition() {
    windowheight = $window.height(); // 브라우저의 높이값 할당
    $('[data-type="motion"]').each(function () {
      // 모든 대상 엘리먼트에
      $(this).data("offsetTop", $(this).offset().top); // 각자의 위치 값을 할당
    });
  }

  (function init() {
    // 최초 진입시 각 섹션의 위치값을 할당
    // 컨텐츠 중에 이미지 파일이 있거나 비동기로 가져오는 값이 있다면, 대상 요소들이 모두 불러진 후에
    // 각 섹션의 위치값을 다시 할당해 줘어야 합니다.
    insertTargetPosition();
  })();
});

//타이틀 등장 모션
var isMotionView = false; //motion 노출 여부 체크 -> 타이틀 노출효과 재생여부 판단
var tlMotion = "";
function startMotion() {
  isMotionView = true;

  $(".evt-header").addClass("motion");
  $(".content-body").addClass("motion");

  tlMotion = new TimelineMax().add([
    TweenMax.to($(".stamp"), 0.3, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      ease: Power1.easeOut,
      delay: 2.2,
    }),
  ]);
  return tlMotion;
}
