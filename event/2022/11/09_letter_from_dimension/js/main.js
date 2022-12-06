var responseData = {
  Result: "OK_ITEM1",
  Msg: "하랑",
  UseMsg:
    "한얼이가 이상한 유리병을 주워왔다. 그냥 지나칠 순 없어서 적어보는데.. 큰 문제는 없으려나?",
  ItemImgSrc:
    "//tr-image.game.onstove.com/event/202211/09_letter_from_dimension/assets/images/items/9e97i14blv.png",
  ItemName: "혼이 나간 지렁이 2개",
  LetterType: "2",
};
$(function () {
  oddFixed();

  //파도 이미지 롤링
  startMotion();
  //편지 툴팁
  tooltipLatter();

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

    return false;
    e.preventDefault();
  });

  $("html").mousemove(function (e) {
    var wx = $(window).width();
    var wy = $(window).height();

    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    var newx = x - wx / 2;
    var newy = y - wy / 2;

    $(".visual").each(function () {
      var speed = $(this).attr("data-speed")
        ? $(this).attr("data-speed")
        : 0.03;
      if ($(this).attr("data-revert")) speed *= -1;
      // TweenMax.to($(this), 1, {x: (1 - newx*speed)});
      TweenMax.to($(this), 1, { x: 1 - newx * speed, y: 1 - newy * speed });
    });
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

//lnb 클릭 시 제어
$(document).on("click", ".tab-list li:not(.comingsoon)", function (e) {
  console.log(e);
  $(this).siblings("li").removeClass("current");
  $(this).addClass("current");

  var index = $(this).index();
  tabView(index, ".tab-list li", ".tab-wrap .tab-content");
});

//tab
function tabView(index, btn, that) {
  $(".tab-wrap").attr("data-tabNum", index);

  $(btn).removeClass("current").eq(index).addClass("current");
  $(that).removeClass("current").hide().eq(index).addClass("current").show();
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
// function popupItem(itemName, imgName, isOpend) {
// 	$popup = $('[data-popup-id="item"]');
// 	var targetY = $(window).scrollTop()+100;
// 		h = $popup.outerHeight()/2, w = $popup.outerWidth()/2;

// 	$popup.addClass("show").css({top:targetY,opacity:1});
// 	$("body").addClass("dimmed");

// 	imgSrc = imgSrc ? imgSrc : "./assets/images/items/";
// 	$popup.find('.item-name').html(itemName);
// 	$popup.find('.item-img').html('<img src="' + imgSrc + imgName + '.png" alt="item image">');
// 	$popup.attr('data-popup-re','').attr('data-popup-re',isOpend);

// }

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
  } else {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
  }
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
function startMotion(target) {
  var $img = $(".wave").find("div");
  var $total = $img.length;
  var idx = 0;

  setInterval(function () {
    $($img).css({ "z-index": 1 });
    $($img).eq(idx).css({ "z-index": 2 });
    idx++;
    if (idx == $total) {
      idx = 0;
    }
  }, 350);
}

//편지 툴팁
function tooltipLatter() {
  var allBox = $(".collection li");
  $(".collection li.open").mouseenter(function () {
    $(this).find(".arrBox").fadeIn(100);
    // allBox.append('<i class="gblind"></i>');
    // allBox.not($(this)).find('.gblind').fadeIn(100);
  });
  $(".collection li.open").mouseleave(function () {
    $(this).find(".arrBox").hide();
    // $(".gblind").remove();
  });
}

//유리병 띄워보내기 팝업
function popupItem(type) {
  $('[data-popup-id="letter"]').addClass("show");
  if (type) {
    $('[data-popup-id="letter"]').attr("data-popup-type", type);
  }
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

    $('[area-type="motion"]').each(function () {
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
    $('[area-type="motion"]').each(function () {
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

function popupClose_refresh(that) {
  document.location.reload();
}

function fnGetItem(itemType) {
  // 模拟请求
  const jResult = responseData;
  if (jResult != "") {
    var strResult = jResult.Result;
    var strRetMsg = jResult.Msg;
    var strRetUseMsg = jResult.UseMsg;
    if (strResult == "OK_ITEM1") {
      var strItemImgSrc = jResult.ItemImgSrc;
      var strItemName = jResult.ItemName;
      var strLetterType = jResult.LetterType;
      $("#txtFrom").text(strRetMsg);
      $(".txt-desc").html(strRetUseMsg);
      $("#imgLetterItem").attr("src", strItemImgSrc);
      $(".item-name").text(strItemName);
      popupItem(strLetterType);
      return;
    } else if (strResult == "OK_ITEM2") {
      if (strRetMsg == "누적20") {
        popup("[data-popup-id=hidden]");
      } else {
        alert(
          "아이템이 선물함으로 지급되었습니다. (보관 만료 기간 2주)\n게임에 접속하셔서 선물함을 확인해 주세요."
        );
        document.location.reload();
      }
      return;
    }
  }
}
