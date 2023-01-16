$(function () {
  oddFixed();
  layercharacters();
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

function layercharacters() {
  $(".calendar li.open").mouseenter(function () {
    $(this).find(".layercharacters").fadeIn(100);
  });
  $(".calendar li.open").mouseleave(function () {
    $(this).find(".layercharacters").hide();
  });
}

function fnGetItem() {
  var fakestr =
    "https://tr-image.game.onstove.com/event/202212/01_christmas_calendar/assets/images/items/gihhtpfgdv.png";
  // $("#imgItem").attr(
  //   "src",
  //   "https://tr-image.game.onstove.com/event/202212/01_christmas_calendar/assets/images/items/" +
  //     param2 +
  //     ".png"
  // );
  $("#imgItem").attr("src", fakestr);
  popup("[data-popup-id=itemlayer]");
  return;
}
