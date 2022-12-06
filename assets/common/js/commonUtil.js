function setPng24(obj) {
  obj.width = obj.height = 1;
  obj.className = obj.className.replace(/\bpng24\b/i, "");
  obj.style.filter =
    "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
    obj.src +
    "',sizingMethod='image');";
  obj.src = "../img/g/n.gif";
  return "";
}

function layer_view(layer_name, layer_display) {
  if (layer_display == "view") {
    document.getElementById(layer_name).style.display = "block";
  } else {
    document.getElementById(layer_name).style.display = "none";
  }
}

function layer_swap(view_name, hide_display) {
  document.getElementById(view_name).style.display = "block";
  document.getElementById(hide_display).style.display = "none";
}

function imageOver(imgs) {
  imgs.src = imgs.src.replace("off.gif", "on.gif");
}
function imageOut(imgs) {
  imgs.src = imgs.src.replace("on.gif", "off.gif");
  //  onmouseover="imageOver(this);" onmouseout="imageOut(this);"
}

function openLayer(IdName, lpos, tpos) {
  var pop = document.getElementById(IdName);
  pop.style.display = "block";
  pop.style.top = tpos + "px";
  pop.style.left = lpos + "px";
}

function closeLayer(IdName) {
  var pop = document.getElementById(IdName);
  pop.style.display = "none";
}

function openPopup(type, URL, width, height) {
  if (type == "window") {
    window.open(
      URL,
      "",
      "width=" + width + ",height=" + height,
      "menubar=no",
      "status=no",
      "resizable=no",
      "toolbar=no",
      "directories=no",
      "location=no"
    );
    return;
  } else {
    window.open(URL);
  }
}

function moveUrl(url) {
  parent.location.href = url;
}

function resizeImage(objImg) {
  var height = objImg.height;
  var width = objImg.width;

  if (height == 0) {
    //		window.setInterval(ResizeImageRetry(objImg,1), 100);
    //		return;
    objImg.width = 400;
    return;
  }

  if (width > 600) {
    height = (objImg.height * 600) / objImg.width;
    width = 600;
  }

  objImg.height = height;
  objImg.width = width;
}

function setCookieOut(name, value) {
  var todayDate = new Date();
  document.cookie = name + "=" + escape(value) + "; path=/;";
}

function setCookieDay(name, value, expiredays) {
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie =
    name +
    "=" +
    escape(value) +
    "; path=/; expires=" +
    todayDate.toGMTString() +
    ";";
}

function setCookieMin(name, value, expiredays) {
  var todayDate = new Date();
  todayDate.setTime(todayDate.getTime() + expiredays * 60000);
  document.cookie =
    name +
    "=" +
    escape(value) +
    "; path=/; expires=" +
    todayDate.toGMTString() +
    ";";
}

function readCookie(cookiename) {
  var numOfCookies = document.cookie.length;
  var nameOfCookie = cookiename + "=";
  var cookieLen = nameOfCookie.length;
  var x = 0;

  if (document.domain.toLowerCase().indexOf("nexon.com") != -1) {
    if ((cookiename = "NPP" && getCookie(cookiename) == "")) {
      return null;
    }
  }

  while (x <= numOfCookies) {
    var y = x + cookieLen;
    if (document.cookie.substring(x, y) == nameOfCookie) return 1;
    x = document.cookie.indexOf(" ", x) + 1;
    if (x == 0) break;
  }
  return null;
}

function autoResize(i) {
  i.style.height = i.contentWindow.document.body.scrollHeight + "px";
}

function flashWrite(url, w, h, vars, bg, win) {
  var id = url.split("/")[url.split("/").length - 1].split(".")[0];
  if (vars == null) vars = "";
  if (bg == null) bg = "#FFFFFF";
  if (win == null) win = "transparent";

  var flashStr =
    "  <object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
  flashStr += "      width='" + w + "'";
  flashStr += "      height='" + h + "'";
  flashStr += "      id='" + id + "'";
  flashStr += "      align='middle'>";

  flashStr += "    <param name='allowScriptAccess' value='always' />";
  flashStr += "    <param name='movie' value='" + url + "' />";
  flashStr += "    <param name='FlashVars' value='" + vars + "' />";
  flashStr += "    <param name='wmode' value='" + win + "' />";
  flashStr += "    <param name='menu' value='false' />";
  flashStr += "    <param name='quality' value='high' />";
  flashStr += "    <param name='bgcolor' value='" + bg + "' />";
  flashStr += "    <param name='base' value='.' />";
  flashStr += "    <!--[if !IE]>-->";
  flashStr +=
    "    <object type='application/x-shockwave-flash' data='" +
    url +
    "' width='" +
    w +
    "' height='" +
    h +
    "'>";
  flashStr += "    <param name='allowScriptAccess' value='always' />";
  flashStr += "    <param name='movie' value='" + url + "' />";
  flashStr += "    <param name='FlashVars' value='" + vars + "' />";
  flashStr += "    <param name='wmode' value='" + win + "' />";
  flashStr += "    <param name='menu' value='false' />";
  flashStr += "    <param name='quality' value='high' />";
  flashStr += "    <param name='bgcolor' value='" + bg + "' />";
  flashStr += "    <param name='base' value='.' />";
  flashStr += "    <!--<![endif]-->";
  flashStr += "        <a href='http://www.adobe.com/go/getflash'>";
  flashStr +=
    "            <img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'/>";
  flashStr += "        </a>";
  flashStr += "    <!--[if !IE]>-->";
  flashStr += "    </object>";
  flashStr += "    <!--<![endif]-->";
  flashStr += " </object>";

  document.write(flashStr);
}

function fnKeyCheck(objBox) {
  var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

  if (event.ctrlKey && (pressedKey == "c" || pressedKey == "v")) {
    event.returnValue = false;
  }
}

function fnGstarCoupon() {
  var winLeft = (screen.width - "470") / 2;
  var winTop = (screen.height - "265") / 2;
  var winProps =
    "width=" +
    "485" +
    ",height=" +
    "370" +
    ",top=" +
    winTop +
    ",left=" +
    winLeft +
    ",scrollbars=no";
  window.open(
    "/event/2014/11/28_G_STAR/f_GstarCoupon.asp",
    "gstarcp",
    winProps
  );
}
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
function getTimeStamp() {
  var d = new Date();

  var s =
    leadingZeros(d.getFullYear(), 4) +
    "-" +
    leadingZeros(d.getMonth() + 1, 2) +
    "-" +
    leadingZeros(d.getDate(), 2);

  return s;
}

function leadingZeros(n, digits) {
  var zero = "";
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) zero += "0";
  }
  return zero + n;
}

//function fnBlockBCoupon(){
//	var winLeft = (screen.width - '470') / 2;
//	var winTop = (screen.height - '265') / 2;
//	var winProps = "width="+'485'+",height="+'370'+",top="+winTop+",left="+winLeft+",scrollbars=no";
//	window.open('/event/2015/01/16_BlockBCoupon/s_coupon.asp','BlockbCp',winProps);
//}
function fnCouponLink(val) {
  var winLeft;
  var winTop;
  var winProps;

  return; //20210707 ��� ���� �ʴ� ������ ���� �Ǹ鼭 ���� sjan

  if (readCookie(COOKIE) == null) {
    fnLogin();
    return;
  }

  if (val == "blockb") {
    winLeft = (screen.width - "470") / 2;
    winTop = (screen.height - "265") / 2;
    winProps =
      "width=" +
      "485" +
      ",height=" +
      "490" +
      ",top=" +
      winTop +
      ",left=" +
      winLeft +
      ",scrollbars=no";

    window.open("/event/Coupon/s_coupon.asp", "BlockbCp", winProps);
  } else if (val == "battlecomics") {
    winLeft = (screen.width - "470") / 2;
    winTop = (screen.height - "680") / 2;
    winProps =
      "width=" +
      "485" +
      ",height=" +
      "680" +
      ",top=" +
      winTop +
      ",left=" +
      winLeft +
      ",scrollbars=no";

    window.open("/event/Coupon/s_coupon.asp", "battlecomics", winProps);
  }
}

function playnetResize(i) {
  autoResize(i);
  window.setTimeout("pnInitIframeSize()", 500);
}
