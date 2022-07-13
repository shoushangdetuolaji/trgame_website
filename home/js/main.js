initLnb();

function initLnb() {
  console.log('执行initLnb函数');
  var $lnbWrap = $('.lnb_wrap'),
  $lnb = $('.lnb'),
  $lnbH = $lnb.outerHeight(),
  $lineLine = $('.lnb_line');
  $(document).on('mouseenter focusin', '.lnb .depth01', function (e) {
    var posLeft = $(e.target).position().left,
    posWidth = $(e.target).width(),
    posWidth2 = posWidth / 10;

    $("#header").addClass("lnb_open");
    $lnbWrap.css("height", $lnbH);
    $lineLine.stop().animate({ "opacity": "1", "left": posLeft + (posWidth2 / 2), "width": posWidth - posWidth2 });
  });

  $(document).on('mouseleave', '.lnb', function () {
      out();
  });
  
  $(document).on('focusout', '.lnb .depth01:last-child .depth02 li:last-child', function () {
      out();
  });

  function out() {
      $("#header").removeClass("lnb_open");
      $lnbWrap.css("height", '');
      $lineLine.stop().animate({ "opacity": "", "left": "", "width": "" });
  }
}