$(function () {
  oddFixed();
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

//셀렉트박스
jQuery(document).ready(function () {
  var select1 = $("select#choice1");
  select1.change(function () {
      var select_name1 = $(this).children("option:selected").text();
      $(this).siblings("label").text(select_name1);
  });
  var select2 = $("select#choice2");
  select2.change(function () {
      var select_name2 = $(this).children("option:selected").text();
      $(this).siblings("label").text(select_name2);
  });
  var select3 = $("select#choice3");
  select3.change(function () {
      var select_name3 = $(this).children("option:selected").text();
      $(this).siblings("label").text(select_name3);
  });
});

//scroll
$(document).ready(function () {
  $(".evt-header").addClass("active");

  $(window).scroll(function () {
      $('div[area-type="motion"]').each(function (i) {
          var bottom_of_element =
              $(this).offset().top + $(this).outerHeight();
          var bottom_of_window =
              $(window).scrollTop() + $(window).height() + 200;

          if ($(this).hasClass("section01")) {
              bottom_of_window = bottom_of_window - 300;
          }

          if (bottom_of_window >= bottom_of_element) {
              $(this).addClass("active");
          } else {
              $(this).removeClass("active");
          }
      });
  });
});

//Popup
var $obj;
var imgSrc = "//tr-image.game.onstove.com/event/202210/19_developer_festival_1st/pc/assets/images/"
var moreItemMsg = [
  {
      title: "코로나 멈춰",
      type: "복장 아이템",
      imgName: "pop_item01",
      content: "코로나 멈춰!!",
  },
  {
      title: "골든 플레이트",
      type: "복장 아이템",
      imgName: "pop_item02",
      content: "미솔로지는 가라 ~ <br>이제 황금의 시대 !",
  },
  {
      title: "내가 제일 잘 보여",
      type: "동작 아이템",
      imgName: "pop_item03",
      content: "커집니다. 많이 커집니다.",
  },
  {
      title: "벨리우스 던",
      type: "변신 캐릭터, 전용 포즈",
      imgName: "pop_item04",
      content: "내 실력을 보여 달라고? 겁도 없이?",
  },
  {
      title: "저승 팜",
      type: "팜 지형, 팜 아이템",
      imgName: "pop_item05",
      content: "저승에서만 만날 수 있는 망자들의 팜에 놀러 오세요 ~!!",
  },
  {
      title: "뒹구르르",
      type: "복장 아이템",
      imgName: "pop_item06",
      content: "뒹굴뒹굴 뒹구르르~",
  },
  {
      title: "산호 조개 쉼터",
      type: "포즈 아이템",
      imgName: "pop_item07",
      content: "흔한 바다st..? <br>어디서든 바다 느낌 물씬 가넝!",
  },
  {
      title: "파자마 잠옷 & 댄스 모션 3종",
      type: "복장 아이템, 모션 아이템",
      imgName: "pop_item08",
      content:
          "사랑하는 가족, 친구, 또 다른 나와 함께! <br>두근두근 파자마★파티!",
  },
  {
      title: "얼굴 표정 2종",
      type: "표정 아이템",
      imgName: "pop_item09",
      content: "움냥움냥 울망울망 새로운 표정 필터 2종!",
  },
];
function popup(obj, moreNo) {
  $obj = $(obj);
  $obj.addClass("show");

  $("body").addClass("dimmed");
  if ($(obj).attr("data-popup-id") == "vod") {
      $(obj)
          .find(".iframe")
          .append(
              '<iframe src="https://www.youtube.com/embed/mZy1eAfbqo4?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>'
          );
  }

  $(document).on("click", function (e) {
      var $tgPoint = $(e.target);
      if ($tgPoint.hasClass("dimmed")) {
          $obj.removeClass("show");
          $("body").removeClass("dimmed");
          if ($obj.attr("data-popup-id") == "vod") {
              $obj.find("iframe").remove();
          }
      }
  });

  if ($(obj).attr("data-popup-id") == "more") {
      imgSrc = imgSrc ? imgSrc : "./assets/images/";

      $obj.find(".more-title").html(moreItemMsg[moreNo].title);
      $obj.find(".more-type dd").html(moreItemMsg[moreNo].type);
      $obj.find(".more-image").html(
          '<img src="' +
              imgSrc +
              moreItemMsg[moreNo].imgName +
              '.jpg?ver=20221019" alt="item image">'
      );
      $obj.find(".more-content").html(moreItemMsg[moreNo].content);
  }
}

function popupClose(that) {
  var obj = $(that).parents(".popup");
  if (obj.attr("data-popup-id") == "vod") {
      obj.find("iframe").remove();
  }
  $("body").removeClass();
  $(that).parents(".popup").removeClass("show");
}
