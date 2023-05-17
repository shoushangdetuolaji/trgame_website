$(function () {
  oddFixed();
  //userTypeChange('$닉네임닉네임$',3);
  section02ItemMapping();
  section03ItemMapping();
  //onButtonDisabled();
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
  var targetY = $(window).scrollTop() + 50;
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

function popupItem01(
  obj,
  name,
  src,
  description,
  map_type,
  difficulty,
  game_type
) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 50;
  (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);
  $("body").addClass("dimmed");
  $popup.addClass("show").css({ top: targetY, opacity: 1 });

  $popup.find(".popup-item").empty().append(`
      <div class="content-top">
        <div class="title">${name}</div>
        <div class="item-img">
        <img src="//tr-image.game.onstove.com/event/202305/03_developerFestival/assets/images/popup-item/${src}.png" alt={name}>
        </div>
        <p class="description">${description}</p>
      </div>

      <div class="content-bottom">
        <ul>
          <li><span class="bubble">맵 타입</span> ${map_type}</li>
          <li><span class="bubble">난이도</span> ${difficulty}</li>
          <li><span class="bubble">경기 유형</span> ${game_type}</li>
        </ul>
      </div>
    </div>
`);
}

function popupItem02(obj, name, src, description, position, ref) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 50;
  (h = $popup.outerHeight() / 2), (w = $popup.outerWidth() / 2);
  $("body").addClass("dimmed");
  $popup.addClass("show").css({ top: targetY, opacity: 1 });

  $popup.find(".popup-item").empty().append(`
      <div class="content-top">
        <div class="title">${name}</div>
        <div class="item-img">
        <img src="//tr-image.game.onstove.com/event/202305/03_developerFestival/assets/images/popup-item/${src}.png" alt={name}>
        </div>
        <p class="description">${description}</p>
      </div>

      <div class="content-bottom">
        <ul>
          <li><span class="bubble">유형</span></li>
          <li>  ${position}</li>
          <li><span class="bubble">참고</span> </li>
          <li> ${ref}</li>

        </ul>
      </div>
    </div>
`);
}

function popupClose(that) {
  $("body").removeClass("dimmed").unbind("touchmove");
  var type = typeof that; //this == "object"
  if (type == "object") {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
    $(that).parents(".popup").find(".iframe iframe").remove();

    // if ($(that).parents('.popup').attr('data-popup-id') == 'item') {
    //   if ($(that).parents('.popup').attr('data-popup-re') != 're') {
    //     document.location.reload();
    //   }
    // }
  } else {
    $(that).parents(".popup").removeAttr("style").removeClass("show");
  }
}

// data-user-type
/**
 * @name userTypeChange
 * @param {string} id -> 닉네임
 * @param {number} typeNUm -> 1 : 로그인 전, 2 : 캐릭터 미생성, 3 : 로그인 후
 * @description
 * 1 : 로그인 전
 * 2 : 캐릭터 미생성
 * 3 : 로그인 후
 * */
function userTypeChange(id, typeNUm) {
  let type = $(".user-state").data("user-type");
  const name = id ? id : "$닉네임닉네임$";

  type = typeNUm ? typeNUm : 1;
  if (type === 1) {
    $(".btn-login").show();
  } else {
    $(".btn-login").hide();
  }
  if (type !== 3) $(".count").text("-");

  switch (type) {
    case 1:
      return $(".user-state .state-id .user-set").text(
        "로그인 후 참여하실 수 있습니다."
      );
    case 2:
      return $(".user-state .state-id .user-set").text(
        "캐릭터를 생성해주세요."
      );
    case 3:
      return $(".user-state .state-id .user-set").text(`${name}님`);
  }
}

/**
 * @name section02ItemMapping
 * @description 맵 리스트 매핑
 * */
function section02ItemMapping() {
  const mapList = [
    {
      id: "01",
      name: "라푼젤 찾기",
      src: "item-more-01",
      description: "여덟 개의 탑! 진짜 라푼젤은 어디에??!",
      map_type: "트레이닝",
      difficulty: "★★★",
      game_type: "노템전/8인",
    },
    {
      id: "02",
      name: "너굴 너굴",
      src: "item-more-02",
      description: "횡 모드에서 진행하는 아케이드 게임",
      map_type: "트레이닝",
      difficulty: "★★★",
      game_type: "노템전/8인/30인",
    },
    {
      id: "03",
      name: "(HC) 거미 거미",
      src: "item-more-03",
      description: "횡으로 진행되는 로프 액션을 즐겨봐!",
      map_type: "하드코어",
      difficulty: "★★★★",
      game_type: "노템전/8인/30인",
    },
    {
      id: "04",
      name: "차사 훈련소",
      src: "item-more-04",
      description: "소형 차사가 되어 모험을 떠나자!",
      map_type: "트레이닝",
      difficulty: "★★★",
      game_type: "아이템전/8인",
    },
    {
      id: "05",
      name: "초 스피드 앗! 비좁아",
      src: "item-more-05",
      description: "비좁아 비좁아 맵이 비좁아",
      map_type: "트레이닝",
      difficulty: "★★★",
      game_type: "노템전/아이템전/8인/30인",
    },
    {
      id: "06",
      name: "앙리성 지하 대탐험",
      src: "item-more-06",
      description: "앙리성 지하 공간에서 펼쳐지는 아슬아슬한 레이싱!!",
      map_type: "트레이닝",
      difficulty: "★★★",
      game_type: "노템전/8인/30인",
    },
    {
      id: "07",
      name: "회오리 감자",
      src: "item-more-07",
      description: "회오리 감자 모양의 길을 따라 위로 빨리 올라가야 하는 맵",
      map_type: "트레이닝",
      difficulty: "★★★★",
      game_type: "아이템전/8인/30인",
    },
    {
      id: "08",
      name: "마실",
      src: "item-more-08",
      description: "공원을 산책한다는 느낌의 힐링 맵",
      map_type: "트레이닝",
      difficulty: "★",
      game_type: "노템전/8인",
    },
    {
      id: "09",
      name: "(HC) 나타나욧",
      src: "item-more-09",
      description:
        "바닥이 사라졌다 생겼다~ 떨어지지 않고 레브 요원을 피해 달려보세욧!",
      map_type: "하드코어",
      difficulty: "★★★",
      game_type: "노템전/아이템전/8인/30인",
    },
    {
      id: "10",
      name: "(HC) 점프하면 죽는 병에 걸림",
      src: "item-more-10",
      description: "뇌절 달리기 2탄으로 점프를 하면 죽는 맵",
      map_type: "하드코어",
      difficulty: "★★★★",
      game_type: "노템전/8인",
    },
    {
      id: "11",
      name: "무한열차",
      src: "item-more-11",
      description: "열차를 타고 황무지의 감옥을 탈출하자!",
      map_type: "트레이닝",
      difficulty: "★★★★★",
      game_type: "노템전/8인/30인",
    },
  ];

  const contentItems = document.querySelector(".section02-content-items");

  mapList
    .sort(() => Math.random() - 0.5)
    .forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item-box-wrap");
      newItem.innerHTML = `
    <label class="item-box">
      <input type="checkbox" name="mapnum"  value='${item.name}'  onclick="checkOnlyOne(this, 'mapnum')">
      <span class="item-img">
    <img  src="//tr-image.game.onstove.com/event/202305/03_developerFestival/assets/images/section02-item/item-${item.id}.png" alt="${item.name}">  </span>
      <span class="text">${item.name}</span>
      <button type="button" class="btn btn-caution movie-btn" onclick="popupItem01('[data-popup-id=item]','${item.name}','${item.src}','${item.description}','${item.map_type}','${item.difficulty}','${item.game_type}')">
        <span class="hide">자세히보기</span>
      </button>
    </label>
  </div>
`;
      contentItems.appendChild(newItem);
    });
}

/**
 * @name section03ItemMapping
 * @description 아이템 리스트 매핑
 * */
function section03ItemMapping() {
  const itemList = [
    {
      id: "01",
      name: "인비저블맨",
      src: "section03-item-more-01",
      description: `누구도 나를 쉽게 찾을 수 없다<br/> 눈을 크게 떠야지만 나를 찾을 수 있을걸?`,
      position: "변신 캐릭터",
      ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    },
    {
      id: "02",
      name: "퓨전파워 크라운 / 윙",
      src: "section03-item-more-02",
      description: `기계의 도움으로 차원 에너지를 융합하여<br/> 힘을 얻을 수 있는 아이템`,
      position: "복장(머리/등)",
      ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    },
    {
      id: "03",
      name: "빙글빙글",
      src: "section03-item-more-03",
      description: "미니 스카이다이빙~",
      position: "모션 아이템",
      ref: `스토리 캐릭터 포함<br/> 모든 캐릭터 모션 적용`,
    },
    {
      id: "04",
      name: "에어로마스터",
      src: "section03-item-more-04",
      description: `이제 비행기를 타고 있는 <br/>너의 모습을 상상해~!! `,
      position: "모션 아이템",
      ref: `스토리 캐릭터 포함<br/> 모든 캐릭터 모션 적용`,
    },
    {
      id: "05",
      name: "귀농일기 & 내츄럴 썸머 룩",
      src: "section03-item-more-05",
      description: `엘림스, 카인, 로로아의 귀농일기<br/> 고생했어. 여기, 선물!!`,
      position: `복장(머리/머리·헤어/상·하의/신발/손/얼굴/등)`,
      ref: "엘림스·카인·로로아 전용 복장",
    },
    {
      id: "06",
      name: "테일즈북 스킨",
      src: "section03-item-more-06",
      description: `다양한 테일즈북 스킨들을 준비해 보았습니다.<br/> 나만의 개성 있는 테일즈북을 꾸며보세요!`,
      position: "테일즈북 스킨",
      ref: "-",
    },
    {
      id: "07",
      name: "귀염 동물 10종",
      src: "section03-item-more-07",
      description: `10마리의 동물로 변신하여<br/> 테일즈런너를 즐겨봅시다!`,
      position: "변신 캐릭터",
      ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    },
    {
      id: "08",
      name: "낭만 포엣 셔츠 복장",
      src: "section03-item-more-08",
      description: "낭만의 포엣 셔츠 복장",
      position: "복장(상·하의/신발)",
      ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    },
    {
      id: "09",
      name: "우주냥 & 별똥묘 복장",
      src: "section03-item-more-09",
      description: `운명의 짝을 찾아 우주를<br/> 떠돌아다니는 우리들 `,
      position: "복장",
      ref: "고양이/토끼 슈 전용 복장",
    },
    {
      id: "10",
      name: "뉴앙스 티셔츠",
      src: "section03-item-more-10",
      description: `MZ 세대라면 무조건 구매 필수! <br/> 유행에 민감한 런너님들에게 자신 있게 권합니다!!`,
      position: "복장(상의)",
      ref: `공통 복장 <br/> (빅보/DnD/나르시스/스토리 캐릭터 제외)`,
    },
    {
      id: "11",
      name: "뺙뺙",
      src: "section03-item-more-11",
      description:
        "노곤노곤한 날 따뜻한 햇볕 아래 나무 휴식공간.<br/> 귀여운 뺙뺙이와 함께라면 잠시나마 피로함이 날아갈지도?",
      position: "모션 아이템",
      ref: `스토리 캐릭터 포함 <br/> 모든 캐릭터 모션 적용`,
    },
    {
      id: "12",
      name: "인형 뽑기",
      src: "section03-item-more-12",
      description:
        "인형 뽑기 기계 속에 갇혔어요!<br/> 기다리고 있을 테니<br/> 언릉 달려와 뽑아 주세요~",
      position: "모션 아이템",
      ref: `스토리 캐릭터 포함 <br/> 모든 캐릭터 모션 적용`,
    },
  ];

  const contentItems = document.querySelector(".section03-content-items");

  itemList
    .sort(() => Math.random() - 0.5)
    .forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.classList.add("item-box-wrap");
      newItem.innerHTML = `
<label class="item-box">
  <input type="checkbox" name="itemnum" value='${item.name}' onclick="checkOnlyOne(this, 'itemnum')">
  <span class="item-img">
  <img  src="//tr-image.game.onstove.com/event/202305/03_developerFestival/assets/images/section03-item/item-${item.id}.png" alt="${item.name}">  </span>
  <span class="text">${item.name}</span>
  <button type="button" class="btn btn-caution movie-btn" onclick="popupItem02('[data-popup-id=item02]','${item.name}','${item.src}','${item.description}','${item.position}','${item.ref}')">
    <span class="hide">자세히보기</span>
  </button>
</label>
</div>
`;
      contentItems.appendChild(newItem);
    });
}
function onButtonDisabled() {
  const button = document.querySelectorAll(".section04-item-btn li .active");
  button.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      const target = e.target;
      button.forEach((item, index) => {
        target.setAttribute("disabled", false);
        target.classList.remove("complete");
      });
      target.setAttribute("disabled", true);
      target.classList.add("complete");
    });
  });
}

function checkOnlyOne(element, ptype) {
  const checkboxes = document.getElementsByName(ptype);

  checkboxes.forEach((cb) => {
    cb.checked = false;
  });

  element.checked = true;
}

// btn response
var isClickChk = false;
var isClickChkSet = function () {
  isClickChk = false;
};

function fnGetItem(itemtype, votenum) {
  if (itemtype == "mapnum") {
    if ($("input:checkbox[name=mapnum]:checked").length == 0) {
      alert("请选择要投票的地图。");
      isClickChkSet();
      return;
    }
    $("input:checkbox[name=mapnum]").each(function (index) {
      if ($(this).is(":checked") == true) {
        votenum = $("input:checkbox[name=mapnum]")[index].value;
      }
    });
    // do ajax
    alert("投票成功");
    document.location.reload();
  } else if (itemtype == "itemnum") {
    if ($("input:checkbox[name=itemnum]:checked").length == 0) {
      alert("请选择想要投票的单品。");
      isClickChkSet();
      return;
    }
    $("input:checkbox[name=itemnum]").each(function (index) {
      if ($(this).is(":checked") == true) {
        votenum = $("input:checkbox[name=itemnum]")[index].value;
      }
    });
    // do ajax
    alert("投票成功");
    document.location.reload();
  }
}
