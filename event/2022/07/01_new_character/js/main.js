// Popup
console.log('123')
var $popup;
function popup(obj, url) {
  $popup = $(obj);
  var targetY = $(window).scrollTop() + 100,
			h = $popup.outerHeight()/2, 
			w = $popup.outerWidth()/2;
  $popup.addClass('show').css({ top: targetY, opacity: 1 });

  if ( $popup.attr('data-popup-id') == 'youtube') {
		$popup.find('.iframe').empty().append('<iframe src="https://www.youtube.com/embed/'+url+'?autoplay=0&rel=0&amp;controls=1&amp;showinfo=0&amp;color=white" allow="autoplay; encrypted-media" width="100%" height="100%" allowfullscreen></iframe>');
	}
	if ( $popup.attr('data-popup-id') == 'idCard') {
		$popup.css({top:0});
	}
	if ( $popup.attr('data-popup-id') == 'complete') {
		$('.popup:not([data-popup-id=complete])').each(function() {
			$(this).removeAttr("style").removeClass("show");
		});
	}
}