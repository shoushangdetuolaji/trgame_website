var swiperData = {
  1: {
    tit: "셀리아 기본 복장 일러스트",
    url: '<div class="image"><img src="https://tr-image.game.onstove.com/event/202212/21_new_character/assets/images/thumb01.jpg" alt=""><a href="https://tr-image.game.onstove.com/event/202212/21_new_character/assets/images/Celia_basis_illust.zip" class="btn btn-download">이미지 내려받기</a></div>', //20221216 수정
  },
  2: {
    tit: "셀리아 벨라토르 복장 일러스트", //20221220 수정
    url: '<div class="image"><img src="https://tr-image.game.onstove.com/event/202212/21_new_character/assets/images/thumb02.jpg" alt=""><a href="https://tr-image.game.onstove.com/event/202212/21_new_character/assets/images/Celia_special_illust.zip" class="btn btn-download">이미지 내려받기</a></div>',
  },
  3: {
    tit: "셀리아 비하인드 스토리",
    url: '<div class="image"><a href="/news/piero.asp?seq=9113506" target="_blank"><img src="https://tr-image.game.onstove.com/event/202212/21_new_character/assets/images/thumb03.jpg" alt=""></a></div>', //20221216 수정
  },
  4: {
    tit: "셀리아의 '차원 너머의 밤에' - 934화", //20221220 수정
    url: '<div class="youtube"><iframe src="https://www.youtube.com/embed/INh_V-KCJBc?enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe></div>', //20221220_2 수정
  },
  5: {
    tit: "셀리아 소개 영상",
    url: '<div class="youtube"><iframe src="https://www.youtube.com/embed/Rk892hbjE6U?enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe></div>', //20221216 수정
  },
  6: {
    tit: "셀리아 모션 영상",
    url: '<div class="youtube"><iframe src="https://www.youtube.com/embed/LNeVi2v5tb8?enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe></div>', //20221216 수정
  },
};

$(function () {
  oddFixed();
  setSwiper();
  lnbScroll();
  startMotion();

  $("button[data-href]").click(function (e) {
    var href = $(this).data("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top + 1;

    $("html, body").stop().animate(
      {
        scrollTop: offsetTop,
      },
      400,
      "easeInOutExpo"
    );

    e.preventDefault();
    return false;
  });
});

// $(window).on('load', function() {
// 	if (!!notToday) {
// 		startMotion();
// 	}
// });

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

//lnb 스크롤
function lnbScroll() {
  var lastId,
    topMenu = $(".lnb-wrap"),
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });

  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top + 1;
    $("html, body").stop().animate(
      {
        scrollTop: offsetTop,
      },
      400,
      "easeInOutExpo"
    );

    e.preventDefault();
  });

  //스크롤 시
  $(window).scroll(function () {
    var fromTop = $(this).scrollTop();

    var cur = scrollItems.map(function () {
      if ($(this).offset().top <= fromTop) return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    lastId !== id ? (lastId = id) : "";

    //하단 스크롤값 체크
    var scrollBottom =
      $(document).height() - $(window).height() - $(window).scrollTop();
    if (scrollBottom == 0) {
      // id = 'section03';
    }

    menuItems
      .parent()
      .removeClass("active")
      .end()
      .filter("[href='#" + id + "']")
      .parent()
      .addClass("active");
  });
}

//Popup
var $popup;
function popup(obj, url) {
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
          url +
          '?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>'
      );
  }
}
var imgSrc;
function popupItem(itemName, imgName, isOpend) {
  $popup = $('[data-popup-id="item"]');
  var targetY = $(window).scrollTop() + 100;
  (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);

  $popup.addClass("show").css({ top: targetY, opacity: 1 });
  $("body").addClass("dimmed");

  imgSrc = imgSrc ? imgSrc : "./assets/images/items/";
  $popup.find(".item-name").html(itemName);
  $popup
    .find(".item-img")
    .html('<img src="' + imgSrc + imgName + '.jpg" alt="item image">');
  $popup.attr("data-popup-re", "").attr("data-popup-re", isOpend);
}
function popupClose(that) {
  $("body").removeClass("dimmed").unbind("touchmove");
  var type = typeof that; //this == "object"
  if (type == "object") {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
    $(that).parents(".popup").find(".iframe iframe").remove();

    if ($(that).parents(".popup").attr("data-popup-id") == "item") {
      if ($(that).parents(".popup").attr("data-popup-re") != "re") {
        document.location.reload();
      }
    }

    if ($popup.attr("data-popup-id") == "promotion") {
      stopSwiperYoutube();
      $popup.css("display", "none");
      if (!isMotionView) {
        // startMotion();
        isMotionView = true;
      }
    }
  } else {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
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

//타이틀 등장 모션
var isMotionView = false; //motion 노출 여부 체크 -> 타이틀 노출효과 재생여부 판단
var tlMotion = "";
function startMotion(target) {
  isMotionView = true;

  tlMotion = new TimelineMax({ delay: 0 }).add([
    TweenMax.fromTo(
      $(".motion-obj"),
      3,
      { opacity: 0, x: -100, y: -50 },
      { opacity: 1, x: 0, y: 0, ease: Elastic.easeOut.config(1, 0.7) }
    ),
    TweenMax.fromTo(
      $(".motion-title"),
      1,
      { opacity: 0, scale: 1.3, transformOrigin: "center center" },
      { opacity: 1, scale: 1, ease: Sine.easeInOut, delay: 0.8 }
    ),
  ]);

  $(".floating").each(function () {
    TweenMax.to($(this), random(2, 3), {
      y: random(-15, 15) + 20,
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
    TweenMax.to($(this), random(2, 3), {
      rotation: random(-15, 15),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
    });
  });

  return tlMotion;
}

//슬라이드 팝업 swiper
var swiper;
function setSwiper() {
  swiper = new Swiper("#swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 0,
    touchRatio: 0, //드래그 금지
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      // type: "fraction",
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    on: {
      init: function () {
        // console.log( this.realIndex );
      },
      slideChange: function () {
        insertSwiperData(this.realIndex + 1);
        stopSwiperYoutube();
      },
    },
  });
}

//슬라이드 팝업 데이터
function insertSwiperData(index) {
  var title = swiperData[index]["tit"];
  $(".popup-tit").html(title);
  setTimeout(stopSwiperYoutube, 1000);
}
var stopSwiperYoutube = function () {
  $(".swiper-slide").each(function () {
    var youtubePlayer = $(this).find("iframe").get(0);
    if (youtubePlayer) {
      //iframe src must contain "?enablejsapi=1" It will allow to use youtube api to pause video on slide change
      youtubePlayer.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    }
  });
};

var isClick = 0;
var notToday;
function popupSwiper(obj, slideNum) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 100;
  (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);
  $("body").addClass("dimmed");
  $popup.addClass("show").css({ top: targetY, opacity: 1, display: "block" });

  if (!!notToday) {
    $(".btn-anymore").hide();
  }

  var idx = slideNum ? slideNum : 1;
  if (isClick == 0) {
    $("#swiper .swiper-slide").each(function (e) {
      var dataNum = $(this).attr("data-slide-num");
      var data = swiperData[dataNum]["url"];
      $(this).html(data);
    });
    insertSwiperData(idx);
    isClick = 1;
  }

  swiper.slideTo(idx);
}

//랜덤값 구하기
function random(min, max) {
  return min + Math.random() * (max - min);
}
