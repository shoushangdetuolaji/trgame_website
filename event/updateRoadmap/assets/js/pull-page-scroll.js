const boxItems = document.querySelectorAll(".content-body .box-item");
const isSafari =
  navigator.userAgent.indexOf("Safari") !== -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;
const commonSwiperOption = {
  slidesPerView: "auto", // �� �붾㈃�� 蹂댁뿬以� �щ씪�대뱶 媛쒖닔
  spaceBetween: 0, // �щ씪�대뱶 �ъ씠 �щ갚
  // centeredSlides: true, // �щ씪�대뱶 媛��대뜲 �뺣젹
  freeMode: {
    enabled: true, // �щ씪�대뱶 �먯쑀 �대룞
    sticky: false, // �щ씪�대뱶 �먯쑀 �대룞 �� �ㅽ겕濡� �꾩튂 怨좎젙
    momentumBounce: false, // �щ씪�대뱶 �앹뿉�� �뺢린�� �꾩긽 諛⑹�
  },
  speed: 2000, // �щ씪�대뱶 �띾룄
};

/*full page scroll*/
let swiper = new Swiper(
  ".evt-swiper",
  isSafari
    ? {
        ...commonSwiperOption,
        mousewheel: {
          enabled: true, // 留덉슦�� �� �대깽��
          sensitivity: 7.0, // 留덉슦�� �� 媛먮룄
        },
      }
    : {
        ...commonSwiperOption,
        mousewheel: {
          enabled: true, // 留덉슦�� �� �대깽��
          sensitivity: 7.0, // 留덉슦�� �� 媛먮룄
        },
      }
);

/*hover �대�吏� �꾨━濡쒕뱶*/

let images = [];
let imagePaths = [
  "assets/images/section01/section01-item01-title-hover.png",
  "assets/images/section01/section01-item02-title-hover.png",
  "assets/images/section02/section02-item02-title-hover.png",
  "assets/images/section04/section04-item01-title-hover.png",
  "assets/images/section04/section04-item02-title-hover.png",
  "assets/images/section04/section04-item03-title-hover.png",
  "assets/images/section04/section04-item04-title-hover.png",
  "assets/images/section04/section04-item05-title-hover.png",
  "assets/images/section04/section04-item06-title-hover.png",
  "assets/images/section05/section05-item01-title-hover.png",
  "assets/images/section05/section05-item02-title-hover.png",
  "assets/images/section05/section05-item03-title-hover.png",
  "assets/images/section06/section06-item01-title-hover.png",
  "assets/images/section06/section06-item02-title-hover.png",
  "assets/images/section06/section06-item03-title-hover.png",
  "assets/images/section07/section07-item01-title-hover.png",
  "assets/images/section07/section07-item02-title-hover.png",
];

for (let i = 0; i < imagePaths.length; i++) {
  images[i] = new Image();
  images[i].src = imagePaths[i];
}
