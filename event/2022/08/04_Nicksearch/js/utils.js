var isClickChk = false;
var isClickChkSet = function () {
  isClickChk = false;
};
var checkCnt = 0;
var checkItems = "";
var checkItem1, checkItem2, checkItem3;
var icount;

//받기버튼 클릭
function fnSearch() {
  if (isClickChk === true) return;
  isClickChk = true;

  var stext = jQuery.trim($("#stext").val());

  if (stext == "") {
    alert("검색어를 입력하세요!");
    isClickChkSet();
    return false;
  }

  stext = regExp(stext);
  if (!stext) {
    isClickChkSet();
    return false;
  }
  var txtbyte;
  txtbyte = fnChkByte(document.getElementById("stext"), 12, 4);

  if (txtbyte > 12) {
    isClickChkSet();
    return false;
  }
  if (txtbyte < 4) {
    isClickChkSet();
    return false;
  }
  var strParams = { stext: encodeURIComponent(stext) };

  $.post(
    "J_Search_Nick.asp",
    strParams,
    function (jResult) {
      if (jResult != "") {
        var strResult = jResult.Result;
        var strRetMsg = jResult.Msg;
        var strRetUseMsg = jResult.UseMsg;
        if (strResult == "OK_NICK") {
          alert(stext + strRetMsg);
          gtag("event", "검색", {
            event_category: "2022_닉변",
            event_label: stext,
          });
          isClickChkSet();
          return;
        } else {
          alert(strRetMsg);
          isClickChkSet();
          return;
        }
      } else {
        alert(
          "네트워크 상태가 원할 하지 않습니다.\n잠시 후 다시 이용 해주세요![1]"
        );
        isClickChkSet();
        return;
      }
    },
    "json"
  ).error(function () {
    alert(
      "네트워크 상태가 원할 하지 않습니다.\n잠시 후 다시 이용 해주세요![0]"
    );
    isClickChkSet();
    return;
  });
}

function fnNumberChk(cp) {
  return /^[0-9|\*]+$/.test(cp) ? true : false;
}

function regExp(str) {
  //특수문자 검증 start
  var regExp = /[ \{\}\[\]\/;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  if (regExp.test(str)) {
    //특수문자 제거
    var t = str.replace(regExp, "");
    alert("특수문자는 입력하실 수 없습니다.");
    jQuery.trim($("#stext").val(t));
    return false;
  } else {
    return str;
  }
  //특수문자 검증 end
}

function fnChkByte(obj, maxByte, minByte) {
  var str = obj.value;
  var str_len = str.length;
  var rbyte = 0;
  var rlen = 0;
  var one_char = "";
  var str2 = "";

  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글2Byte
    } else {
      rbyte++; //영문 등 나머지 1Byte
    }

    if (rbyte <= maxByte) {
      rlen = i + 1; //return할 문자열 갯수
    }
  }

  if (rbyte > maxByte) {
    alert("최대 " + maxByte + "byte를 초과할 수 없습니다.");
    str2 = str.substr(0, rlen); //문자열 자르기
    obj.value = str2;
  }
  if (rbyte < minByte) {
    alert("닉네임 검색은 한글 2자, 영문 4자 이상 가능합니다.");
  }
  return rbyte;
}
