/**
 * ImgSwitch
 */

// IMG
(function($) {
  var ImgSwitch = {
    init: function() {
      $('.js-img_switch').each(function() {
        var img = $(this),
          imgSrc1 = img.attr('src').split('.')[0],
          imgSrc2 = img.attr('src').split('.')[1],
          imgPC = imgSrc1 + '.' + imgSrc2,
          imgSP = imgSrc1 + '_sp.' + imgSrc2;
        $(window).on('load resize', function(e) {
          if ($('body').width() < 769) {
            img.attr('src', imgSP);
          } else {
            img.attr('src', imgPC);
          }
        });
      });
    }
  }
  var Rollover = {
    init: function() {
      $('.js-rollover').each(function() {
        var imgContainer = $(this),
          img = imgContainer.find('img'),
          imgSrc1 = img.attr('src').split('.')[0],
          imgSrc2 = img.attr('src').split('.')[1],
          imgPC = imgSrc1 + '.' + imgSrc2,
          imgHover = imgSrc1 + '_o.' + imgSrc2;
        if ($('body').width() >= 769) {
          $(window).on('load resize', function(e) {
            imgContainer.on({
              mouseover: function() {
                img.attr('src', imgHover);
              },
              mouseleave: function() {
                img.attr('src', imgPC);
              }
            })
          });
        }
      });
    }
  }
  $(function() {
    if ($('.js-img_switch')[0]) {
      ImgSwitch.init();
    }
    if ($('.js-rollover')[0]) {
      Rollover.init();
    }
  });
}(jQuery));

/**
 * smooth
 */
(function($) {
  var smoothScroll = {
    init: function() {
      var me = this,
        $btnPagetop = $('.l-pagetop_btn');
      $(window).on('load scroll resize', function() {
        me.btnShow();
      });
      $('a[href^=#]').on('click', function(e) {
        e.preventDefault();
        me.targetScroll($(this));
      })
      $btnPagetop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 300);
      });
    },
    btnShow: function() {
      $btnPagetop = $('.l-pagetop_btn');

      // $btnPagetop.hide();
      if ($(window).scrollTop() > 200) {
        $btnPagetop.stop().fadeIn('slow');
      } else {
        $btnPagetop.stop().fadeOut('slow');
      }
    },
    targetScroll: function($target) {
      var $hash = $($target.attr('href'));
      if ($hash.length) {
        if ($('body').width() < 769) {
          $('html, body').animate({
            scrollTop: $hash.offset().top - 0
          }, 500);
        } else {
          $('html, body').animate({
            scrollTop: $hash.offset().top - 92
          }, 500);
        }
      }
    }
  };
  // smoothScrollParam
  var smoothScrollParam = {
    location: location.pathname,
    init: function() {
      var me = this;

      if (!this.location.match('/admin/')) {
        if (location.search.match('anc=')) {
          me.anchor = location.search.split('anc=')[1];
        } else {
          me.anchor = location.search.split(/\?/)[1];
        }
        var hashP = '#' + this.anchor;

        if ($('body').width() < 769) {
          $('html, body').animate({
            scrollTop: $(hashP).offset().top - 0
          }, 1000, 'easeOutQuint');
        } else {
          $('html, body').animate({
            scrollTop: $(hashP).offset().top - 92
          }, 1000, 'easeOutQuint');
        }
      }
    }
  }

  $(function() {
    smoothScroll.init();
    if (location.href.match(/\?/)) {
      setTimeout(function() {
        smoothScrollParam.init();
      }, 100)

    }
  });
}(jQuery));

// svg
$(function() {
  jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});

// $(function($) {
//   var siteHeader = $('.l-header');
//   var fixedHeader = siteHeader.offset().top;
//   $(window).scroll(function() {
//     var scroll = getCurrentScroll();
//     if ($('body').width() >= 769) {
//       if (scroll > fixedHeader) {
//         $('body').addClass('menu-fixed');
//         siteHeader.addClass('is-fixed');
//       } else {
//         if (siteHeader.hasClass('is-fixed')) {
//           siteHeader.removeClass('is-fixed');
//         }
//         if ($('body').hasClass('menu-fixed')) {
//           $('body').removeClass('menu-fixed');
//         }
//       }
//     }
//   });

//   function getCurrentScroll() {
//     return window.pageYOffset || document.documentElement.scrollTop;
//   }

//   $(window).on('resize', function() {
//     $(window).scroll(function() {
//       var scroll = getCurrentScroll();
//       if ($('body').width() >= 769) {
//         if (scroll > fixedHeader) {
//           $('body').addClass('menu-fixed');
//           siteHeader.addClass('is-fixed');
//         } else {
//           if (siteHeader.hasClass('is-fixed')) {
//             siteHeader.removeClass('is-fixed');
//           }
//           if ($('body').hasClass('menu-fixed')) {
//             $('body').removeClass('menu-fixed');
//           }
//         }
//       }
//     });
//   });
// }(jQuery));


(function($) {
  ww = $('body').width();
  $('.l-gnav_button').click(function(event) {
    if(ww < 769) {
      $(this).toggleClass('is-close');
      $('.l-gnav').toggleClass('is-show');
      $('body').toggleClass('js-menu-show');
      event.preventDefault();
    }
  });
  $('.l-gnav_link, .l-wrapper_overlay').click(function() {
    if(ww < 769) {
      if($('.l-gnav_button').hasClass('is-close')) {
        $('.l-gnav_button').removeClass('is-close');
      }
      if($('.l-gnav').hasClass('is-show')) {
        $('.l-gnav').removeClass('is-show');
      }
      if($('body').hasClass('js-menu-show')) {
        $('body').removeClass('js-menu-show');
      }
    }
  });


  $(window).on('load, resize', function() {
    $('.l-gnav_button').click(function(event) {
      if(ww < 769) {
        $(this).toggleClass('is-close');
        $('.l-gnav').toggleClass('is-show');
        $('body').toggleClass('js-menu-show');
        event.preventDefault();
      }
    });
    $('.l-gnav_link, .l-wrapper_overlay').click(function() {
      if(ww < 769) {
        if($('.l-gnav_button').hasClass('is-close')) {
          $('.l-gnav_button').removeClass('is-close');
        }
        if($('.l-gnav').hasClass('is-show')) {
          $('.l-gnav').removeClass('is-show');
        }
        if($('body').hasClass('js-menu-show')) {
          $('body').removeClass('js-menu-show');
        }
      }
    });
    if (ww >= 769) {
      if($('.l-gnav_button').hasClass('is-close')) {
        $('.l-gnav_button').removeClass('is-close');
      }
      if($('.l-gnav').hasClass('is-show')) {
        $('.l-gnav').removeClass('is-show');
      }
      if($('body').hasClass('js-menu-show')) {
        $('body').removeClass('js-menu-show');
      }
    }
  });
}(jQuery));

