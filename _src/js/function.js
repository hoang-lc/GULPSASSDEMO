/*ページ内リンク*/
$(function() {
  // PageTopヘッダの分をずらす
  var headH = 330;

  // PageTop
  $('.scroll a[href^=#]').not('a[href=#]').each(function() {
    // jquery.easing
    jQuery.easing.quart = function(x, t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
      var $targetId = $(this.hash),
        $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
      if ($target) {
        var targetOffset = $target.offset().top - headH;
        $(this).click(function() {
          $('html, body').animate({
            scrollTop: targetOffset
          }, 1500, 'easeInOutExpo');
          return false;
        });
      }
    }
  });
  if (location.hash) {
    var hash = location.hash;
    window.scroll(0, headH)
    $('a[href=' + hash + ']').click();
  }
});


/*ページトップへ*/
$(function() {
  $('#gnav .logo a, #footer .logo a').click(function() {
    $('html, body').animate({
      'scrollTop': 0
    }, 1500, 'easeInOutExpo');
    return false;
  });
});


/*ロールオーバー*/
$(document).ready(
  function() {
    $("a img").hover(function() {
      $(this).fadeTo(250, 0.5);
    }, function() {
      $(this).fadeTo(500, 1.0);
    });
  });


/*ナビゲーション固定*/
$(function() {
  var nav = $('#gnav');
  var navTop = nav.offset().top;
  $(window).scroll(function() {
    var winTop = $(this).scrollTop();
    if (winTop >= navTop) {
      nav.addClass('fixed')
    } else if (winTop <= navTop) {
      nav.removeClass('fixed')
    }
  });
});
