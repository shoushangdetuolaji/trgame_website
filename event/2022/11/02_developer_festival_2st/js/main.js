var mainYoutubeId = "IzxCMpsmrsU";
var popupYoutubeId = "IzxCMpsmrsU";

$(function () {
  oddFixed();
  insertYoutube($(".section01"), mainYoutubeId);
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

//scroll
$(document).ready(function () {
  $(".evt-header").addClass("active");

  $(window).scroll(function () {
      $('div[data-area-type="motion"]').each(function (i) {
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
function popup(obj) {
  $obj = $(obj);
  $obj.addClass("show");

  $("body").addClass("dimmed");
  if ($(obj).attr("data-popup-id") == "vod") {
      $(obj)
          .find(".iframe")
          .append(
              '<iframe src="https://www.youtube.com/embed/' +
                  popupYoutubeId +
                  '?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>'
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
}

function popupClose(that) {
  var obj = $(that).parents(".popup");
  if (obj.attr("data-popup-id") == "vod") {
      obj.find("iframe").remove();
  }
  $("body").removeClass();
  $(that).parents(".popup").removeClass("show");
}

//youtube 삽입 함수
function insertYoutube(obj, url) {
  $(obj)
      .find(".iframe")
      .empty()
      .append(
          '<iframe src="https://www.youtube.com/embed/' +
              url +
              '?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>'
      );
}
