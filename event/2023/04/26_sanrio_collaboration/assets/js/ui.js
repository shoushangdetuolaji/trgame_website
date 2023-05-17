var headerHeight;
var notToday = false;

//window odd fixed
function oddFixed() {
  if ($(window).width() % 2 != 0) {
    var width = $(window).width() - 1;
    $("html").width(width);
  } else {
    $("html").width("100%");
  }
}

$(window).on("load", function () {
  // 中的回调函数将在页面的所有资源（如图片、样式表和脚本）都加载完成后执行。这意味着在回调函数内部，您可以执行需要在页面加载完成后才能执行的操作。
  headerHeight = $("#evt_wrap").offset().top;

  Scrollbar.initAll({
    alwaysShowTracks: true,
  });

  lnbListControl();

  setTimeout(function () {
    console.log("初始化lnbcontrol绑定事件完成");
    lnbControl();
  }, 100);
  //[D] 1초 후 lnb 닫기
  // 原先11s延迟 搞的6s吧
  setTimeout(function () {
    console.log("如果evt-lnb打开状态后，再次执行绑定事件，6s后执行");
    if ($(".evt-lnb").hasClass("open")) lnbControl();
  }, 6000);

  $(".btn-control").on("click", function () {
    lnbControl();
  });

  characterEvent();
  if (!!notToday) startMotion();

  $(".btn-anymore").on("click", function () {
    $(this).toggleClass("active");
  });
});

$(window).resize(function () {
  oddFixed();
});

function initHeight(hSize) {
  // 스토브 : c1 = 48
  // 넥슨 : c18 = 63
  // 다음 : c7 = 0
  // 한게임 : c2 = 51
  // 카툰네트웍스 : c17 = 156
  // 네이버게임 : c13 = 0

  switch (hSize) {
    case "c1":
      heightSpace = 49;
      break;
    case "c18":
      heightSpace = 63;
      break;
    case "c7":
      heightSpace = 0;
      break;
    case "c2":
      heightSpace = 51;
      break;
    case "c17":
      heightSpace = 156;
      break;
    case "c13":
      heightSpace = 0;
      break;
  }

  $("#evt_wrap").height("calc(100% - " + heightSpace + "px)");
  $(".evt-lnb").css("top", heightSpace + "px");

  $(window).scroll(function () {
    var topVal = $(window).scrollTop();
    if (topVal > 0) {
      $(".evt-lnb").animate(
        {
          top: "0",
        },
        0
      );
    } else if (topVal <= headerHeight) {
      $(".evt-lnb").animate(
        {
          top: headerHeight,
        },
        0
      );
    }
  });
}

var $popup;
function popup(obj, url) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 190;
  (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);
  $(".evt-content").addClass("dimmed");
  $popup.addClass("show").css({ top: targetY, opacity: 1 });

  if (!!notToday) {
    $(".btn-anymore").hide();
  }

  if (
    $popup.attr("data-popup-id") == "youtube" ||
    $popup.attr("data-popup-id") == "youtube2"
  ) {
    $popup
      .find(".iframe")
      .empty()
      .append(
        '<iframe src="https://www.youtube.com/embed/' +
          url +
          '?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>'
      );
  }
}

function popupClose(that, isSelf) {
  var $isSelf = isSelf;
  var $popup = $isSelf ? $(that) : $(that).parents(".popup");
  var $type = $popup.attr("data-popup-id");

  $(".evt-content").removeClass("dimmed").unbind("touchmove");
  $popup.removeAttr("style").removeClass("show");

  if ($type == "youtube") {
    $popup.find(".iframe iframe").remove();
    if (!isMotionView) {
      startMotion();
      isMotionView = true;
    }
  }

  if ($type == "goods" && !isSelf) {
    $(".lnb-list li").removeClass("active");
    $(".lnb-list li[data-state=open]").addClass("active");
  }
}

function lnbControl() {
  var $lnb = $(".evt-lnb");
  $lnb.toggleClass("open");

  var isOpen = $lnb.hasClass("open");
  $lnb.css("left", isOpen ? "0" : "-306px");
}

function lnbListControl() {
  $(".lnb-list a.lnb-item").on("click", function () {
    $(".lnb-list li").removeClass("active");

    var $li = $(this).parents("li");
    $li.addClass("active");

    $(".evt-content").removeClass("dimmed");
    $('.popup.show[data-popup-id="youtube"]').find(".iframe iframe").remove();
    $(".popup.show").removeAttr("style").removeClass("show");

    if ($li.attr("data-state") == "open" && !isMotionView) {
      startMotion();
      isMotionView = true;
    }
  });
}

//타이틀 등장 모션
var tlMotion = "";
var isMotionView = false;
function startMotion(target) {
  let delay = 1.5;
  isMotionView = true;
  tlMotion = new TimelineMax().add([
    TweenMax.fromTo(
      $(".motion-bg"),
      1.5,
      { scale: 1.3, transformOrigin: "center center" },
      { scale: 1, ease: Sine.easeInOut }
    ),
    TweenMax.fromTo(
      $(".motion01"),
      1.3,
      { opacity: 0, scale: 1.3, x: -20, transformOrigin: "center center" },
      { opacity: 1, scale: 1, x: 0, ease: Sine.easeInOut, delay: 0.2 }
    ),
    TweenMax.fromTo(
      $(".motion02"),
      1,
      { opacity: 0, scale: 1.2, transformOrigin: "center center" },
      { opacity: 1, scale: 1, ease: Sine.easeInOut, delay: 0.5 }
    ),
    TweenMax.fromTo(
      $(".motion03"),
      0.7,
      { opacity: 0, scale: 1.2, y: -20, transformOrigin: "center center" },
      { opacity: 1, scale: 1, y: 0, ease: Sine.easeInOut, delay: 0.8 }
    ),
    TweenMax.fromTo(
      $(".title .tr"),
      0.35,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, delay: delay }
    ),
    TweenMax.fromTo(
      $(".title .sanrio"),
      0.35,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, delay: delay }
    ),
    TweenMax.fromTo(
      $(".title .collaboration"),
      0.8,
      { opacity: 0, scale: 1.3 },
      { opacity: 1, rotation: 720, scale: 1, delay: delay + 0.1 }
    ),
    TweenMax.fromTo(
      $(".sub-title"),
      0.3,
      { opacity: 0, scale: 1.5 },
      { opacity: 1, scale: 1, ease: Power1.easeIn, delay: delay + 0.3 }
    ),
    TweenMax.fromTo(
      $(".character-tr01"),
      0.3,
      { opacity: 0 },
      { opacity: 1, ease: Power1.easeInOut, delay: delay + 0.7 }
    ),
    TweenMax.fromTo(
      $(".character[data-index=bubble01]"),
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Power1.easeInOut,
        delay: delay + 0.8,
        onComplete: function () {
          this.target.addClass("active");
        },
      }
    ),
    TweenMax.fromTo(
      $(".character[data-index=bubble06]"),
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Power1.easeInOut,
        delay: delay + 0.85,
        onComplete: function () {
          this.target.addClass("active");
        },
      }
    ),
    TweenMax.fromTo(
      $(".character[data-index=bubble03]"),
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Power1.easeInOut,
        delay: delay + 1.1,
        onComplete: function () {
          this.target.addClass("active");
        },
      }
    ),
    TweenMax.fromTo(
      $(".character[data-index=bubble02]"),
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Power1.easeInOut,
        delay: delay + 1.1,
        onComplete: function () {
          this.target.addClass("active");
        },
      }
    ),
    TweenMax.fromTo(
      $(".character-tr02"),
      0.3,
      { opacity: 0 },
      { opacity: 1, ease: Power1.easeInOut, delay: delay + 1.1 }
    ),
    TweenMax.fromTo(
      $(".character[data-index=bubble05]"),
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Power1.easeInOut,
        delay: delay + 1.35,
        onComplete: function () {
          this.target.addClass("active");
        },
      }
    ),
    TweenMax.fromTo(
      $(".character-tr03"),
      0.3,
      { opacity: 0 },
      { opacity: 1, ease: Power1.easeInOut, delay: delay + 1.35 }
    ),
    TweenMax.fromTo(
      $(".character[data-index=bubble04]"),
      0.3,
      { opacity: 0 },
      {
        opacity: 1,
        ease: Power1.easeInOut,
        delay: delay + 1.45,
        onComplete: function () {
          this.target.addClass("active");
        },
      }
    ),
  ]);
  return tlMotion;
}

function characterEvent() {
  $(".character-box .character").mouseover(function () {
    var characterIndex;
    if ($(this).hasClass("active")) {
      characterIndex = $(this).attr("data-index");
      $(this).addClass("hover");
    }
    $(`.bubble-box [data-index=${characterIndex}]`).addClass("active");
  });

  $(".character-box .character").mouseout(function () {
    var characterIndex = $(this).attr("data-index");
    $(this).removeClass("hover");
    $(`.bubble-box [data-index=${characterIndex}]`).removeClass("active");
  });
}
