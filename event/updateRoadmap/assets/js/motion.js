const wrapId = document.getElementById("evt_wrap");
const dummySlide = document.querySelector(".dummy-slide ");
const contentBody = document.querySelector(".content-body ");
const mouseWheel = document.querySelector(".mouse-wheel ");

const innerWidth = 1240;
const refreshAnimate = gsap.timeline();
const mouseWheelAnimate = gsap.timeline();

/*鞗€歆侅澊電� 鞖旍唽*/
const section02 = document.querySelector(".section02 .character");
const section04_new_character = document.querySelector(
  ".section04 .new-character .character"
);
const section04_system = document.querySelector(
  ".section04 .system .character"
);
const section04_baunabi_island = document.querySelector(
  ".section04 .baunabi-island .character"
);
const section05 = document.querySelector(".section05 .character");
const section06 = document.querySelector(".section06 .character");
const section07_map_craft = document.querySelector(
  ".section07 .map-craft .character"
);
const section07_upgrade = document.querySelector(
  ".section07 .upgrade-64bt .character"
);

/**
 * @description: gnb 膦呺鞐� 霐半ジ 鞀ろ伂搿� 雴掛澊 臁办爤
 */
swiper.disable();

$(window).on("load", function () {
  setTimeout(() => {
    swiper.enable();
  }, 800);

  //load 鞚错泟 鞁ろ枆頃� 頃垬
  const nexon = $(".gnbWrapper")[0]; // 雱レ姩 gnb
  const hangame = document.getElementById("gnbWrapDiv"); // 頃滉矊鞛� gnb
  const stove = document.getElementById("stoveGnb"); // 鞀ろ啝敫� gnb
  dummySlide.style.cssText = `flex-basis: ${
    (window.innerWidth - innerWidth) / 2 + 50
  }px;`;

  if (nexon !== null && nexon !== undefined) {
    return (wrapId.style.cssText =
      ";height:calc(100% - 63px);min-height:calc(1000px - 63px)");
  } else if (hangame !== null && hangame !== undefined) {
    return (wrapId.style.cssText =
      "height: calc(100% - 50px);min-height:calc(1000px - 50px)");
  } else if (stove !== null && stove !== undefined) {
    return (wrapId.style.cssText =
      "height: calc(100% - 49px);min-height:calc(1000px - 49px)");
  } else {
    return (wrapId.style.cssText = "height: 100%;min-height:1000px");
  }
});

window.onresize = function () {
  // 鞙堧弰鞖� 靷澊歃� 臁办爼鞁� 鞁ろ枆頃� 頃垬
  // 鞙堧弰鞖� 毽偓鞚挫 鞁� 鞀澕鞚措摐 臧€鞖措嵃搿� 鞙勳箻 臁办爼
  const dummySlide = document.querySelector(".dummy-slide ");
  dummySlide.style.cssText = `flex-basis: ${
    (window.innerWidth - innerWidth) / 2 + 50
  }px;`;
  swiper.update();

  if (swiper.activeIndex >= 7) {
    return $("#wrap_bg").css(
      "transform",
      `translateX(-${10000 - window.innerWidth}px)`
    );
  }
};

window.addEventListener("mousewheel", onMouseWheel, false);
window.addEventListener("DOMMouseScroll", onMouseWheel, false);

swiper.on("slideChangeTransitionEnd", function (e) {
  const direction = swiper.swipeDirection; // 鞀澕鞚措摐 氚╉枼
  characterMotion(direction);
});

/**
 * @description: 鞀澕鞚措摐 鞚措彊鞁� 氚瓣步鞚措彊
 * */
swiper.on("slideChange", function (e) {
  // Get the new active slide index
  const currentIndex = swiper.activeIndex; // 順勳灛 鞀澕鞚措摐 鞚鸽嵄鞀�

  console.log(currentIndex);
  if (currentIndex !== 1) {
    mouseWheelAnimate.to(".mouse-wheel", { opacity: 0 });
  }
  switch (
    currentIndex // 鞀澕鞚措摐 鞚鸽嵄鞀れ棎 霐半ジ 鞚措菠韸�
  ) {
    // $('#wrap_bg').css('transform', `translateX(0px)`); // 鞀澕鞚措摐 鞚措彊鞁� 氚瓣步鞚措彊
    case 0:
      $("#wrap_bg").css("transform", `translateX(0px)`);
      character02Motion("prev");
      break;
    case 1:
      // $('#wrap_bg').css('transform', `translateX(-${e.slidesGrid[currentIndex]}px)`);
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);

      break;
    case 2:
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);
      character04Motion("prev");
      // from鞚€
      break;
    case 3:
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);

      character04Motion("prev");
      break;
    case 4:
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);

      character02Motion("next");
      character05Motion("prev");
      character06Motion("prev");
      character07Motion("prev");
      break;
    case 5:
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);

      character02Motion("next");
      character06Motion("prev");
      character07Motion("prev");

      break;
    case 6:
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);

      character07Motion("prev");
      character04Motion("next");

      break;
    case 7:
      $("#wrap_bg").css("transform", $(".swiper-wrapper")[0].style.transform);

      character04Motion("next");
    case 8:
      $("#wrap_bg").css(
        "transform",
        `translateX(-${10000 - window.innerWidth}px)`
      );

      break;

    default:
      break;
  }
});

/*
 * @name resizeObserver  : resizeObserver
 * @description : 毽偓鞚挫鞁� swiper update
 * */
const observer = new ResizeObserver((e) => {
  swiper.update();
});

// Observe a dummySlide element
observer.observe(dummySlide);

/*gsap timeline*/
/*
 * @name refreshAnimate  : refreshAnimate
 * @description : 搿滊摐 鞁� 觳� 頇旊┐ 鞎犽媹氅旍澊靺�
 * */
refreshAnimate
  .fromTo(
    ".section01",
    { opacity: 0, x: -10 },
    { delay: 0.2, opacity: 1, x: 0 }
  )
  .fromTo(
    ".section02",
    { opacity: 0, x: -10 },
    { delay: 0.2, opacity: 1, x: 0 },
    "-=0.5"
  )
  .fromTo(
    ".section03",
    { opacity: 0, x: -30 },
    { delay: 0.4, opacity: 1, x: 0 },
    "-=0.5"
  );
//               .fromTo('.footer',{opacity:0, y: 30},{opacity:1,y:0},">")
mouseWheelAnimate.fromTo(
  ".mouse-wheel",
  { delay: 0.8, opacity: 0, y: "-40%" },
  { delay: 0.8, opacity: 1, y: "-50%" },
  ">"
);

/*
 * @name: onMouseWheel
 * @description: 毵堨毎鞀� 頊� 鞚措菠韸�
 * */
function onMouseWheel(e) {
  const isSafari =
    navigator.userAgent.indexOf("Safari") !== -1 &&
    navigator.userAgent.indexOf("Chrome") === -1;
  const direction = e.deltaY > 0 ? "next" : "perv";
  const stove = document.getElementById("stoveGnb");

  setTimeout(() => {
    characterMotion(direction);
  }, 500);

  if (isSafari) {
    $(".swiper-wrapper").removeClass("mousewheelSmoothing");
  }

  // if (!isSafari) {
  //   clearTimeout($.data(this, 'timer')); // 鞚挫爠 setTimeout 鞚� clear
  //
  //   $(".swiper-wrapper").addClass('mousewheelSmoothing');
  //   if (!stove) {
  //     $.data(this, 'timer', setTimeout(function () {
  //       $(".swiper-wrapper").removeClass('mousewheelSmoothing')
  //     }, 250));
  //   }
  // }
}
// 毵堨毎鞀� 頊� 鞚措菠韸鸽ゼ 毵夓姷雼堧嫟.
contentBody.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

mouseWheel.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);
/*
 * @name directionMap  : direction鞐� 霐半ジ translateX 臧� 氤€瓴�
 * @param direction : next, prev
 * @param width : translateX width 鞙勳箻
 * @param deviation : +- width鞚� 鞗€歆侅瀯 氤€瓴� 臧�
 * */
const directionMap = (direction, width, deviation) => {
  // console.log(direction, width, deviation)
  switch (direction) {
    case "next":
      return width + deviation + "px";
    case "prev":
      return width - deviation + "px";
    default:
      return width + "px";
  }
};

/*
 * @name characterMotion  : characterMotion
 * @description : 旌愲Ν韯� 鞚措彊
 * */
const characterMotion = (direction) => {
  character02Motion(direction);
  character04Motion(direction);
  character05Motion(direction);
  character06Motion(direction);
  character07Motion(direction);
};

const character02Motion = (direction) => {
  section02.style.transform =
    "translateX(" + directionMap(direction, 340, 20) + ")";
};
const character04Motion = (direction) => {
  section04_new_character.style.transform =
    "translateX(" + directionMap(direction, 360, 20) + ")";
  section04_baunabi_island.style.transform =
    "translateX(" + directionMap(direction, 430, 10) + ")";
  section04_system.style.transform =
    "translateX(" + directionMap(direction, 395, 10) + ")";
};
const character05Motion = (direction) => {
  section05.style.transform =
    "translateX(" + directionMap(direction, 152, 20) + ")";
};
const character06Motion = (direction) => {
  section06.style.transform =
    "translateX(" + directionMap(direction, 100, 10) + ")";
};
const character07Motion = (direction) => {
  section07_map_craft.style.transform =
    "translateX(" + directionMap(direction, 580, 10) + ")";
  section07_upgrade.style.transform =
    "translateX(" + directionMap(direction, 480, 10) + ")";
};
