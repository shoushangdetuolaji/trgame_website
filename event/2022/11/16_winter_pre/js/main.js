// 유튜브 링크
var popupYoutubeId = "tMrlZonLqt0";
var profileImage = "./images/test.png";
$(document).ready(function () {
  var clipboard = new ClipboardJS(".btn-copy");
  clipboard.on("success", function (e) {
    alert("해시태그가 복사되었습니다.");
  });

  $("#imageId").attr("src", profileImage);
  $("#imagebox").attr("src", profileImage);

  if (readCookie("EndView") == null) {
    popup("[data-popup-id=youtube]");
    notToday = false;
  } else {
    notToday = true;
  }

  if (!!notToday) {
    motion();
  }
});
function fnTodayEndVideoView() {
  notToday = true;
  setCookieDay("EndView", "on", 1);
}

$(function () {
  oddFixed();
  addStar();
});

var notToday;

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

function btnPlayShow() {
  $(".btn-play").addClass("show");
}

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

    if (!!notToday) {
      $(".btn-today").hide();
    }
  }

  if ($popup.attr("data-popup-id") == "idCard") {
    $popup.addClass("show").css({ top: 100, opacity: 1 });
  }
}

//youtube 鞁滌箔 鞐秬 觳错伂 -> 韮€鞚错媭 雲胳稖須臣 鞛儩鞐秬 韺愲嫧
var isYoutubeView = false;

function popupClose(that) {
  $("body").removeClass("dimmed").unbind("touchmove");
  var type = typeof that; //this == "object"
  if (type == "object") {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
    $(that).parents(".popup").find(".iframe iframe").remove();

    if (
      $(that).parents(".popup").attr("data-popup-id") == "youtube" &&
      !isYoutubeView
    ) {
      motion();
      isYoutubeView = true;
    }
  } else {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
  }
}

function addStar() {
  for (i = 1; i <= 8; i++) {
    $(".star-box").append('<i class="star0' + i + '"></i>');
  }
}

function random(min, max) {
  return min + Math.random() * (max - min);
}

function motion() {
  const ani = new TimelineMax();

  ani
    .add("spaceCreation")
    .to(
      $(".planet"),
      2,
      { opacity: 1, scale: 1, ease: Elastic.easeOut.config(1.1, 1) },
      0.1
    )
    .to(
      $(".piece-box i"),
      2,
      { rotation: 0, ease: Elastic.easeOut.config(1, 1000) },
      0.1
    )
    .to(
      $(".piece-box"),
      2,
      { scale: 1, y: 0, ease: Elastic.easeOut.config(1.2, 1) },
      0.2
    )
    .to(
      $(".btn-play"),
      0.7,
      { opacity: 1, scale: 1, ease: Power0, onStart: btnPlayShow },
      1
    )
    .to($(".motion-obg"), 1, { opacity: 1, scale: 1, ease: Power4.easeOut });

  $(".piece-box i").each(function () {
    TweenMax.from($(this), random(2, 4), {
      x: random(-20, 20),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
    TweenMax.to($(this), random(3, 4), {
      y: random(-40, 40),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
    TweenMax.to($(this), random(8, 12), {
      rotation: random(-35, 35),
      repeat: -1,
      yoyo: true,
      delay: 2.3,
      ease: Linear.easeNone,
    });
  });

  $(".star-box i").each(function () {
    TweenMax.to($(this), random(0.5, 1), {
      opacity: 0.5,
      scale: 0.7,
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
  });

  $(".motion-obg").each(function () {
    TweenMax.to($(this), 1.5, {
      x: random(-20, 20),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
    TweenMax.to($(this), 1.5, {
      y: random(-30, 20),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
  });
}
