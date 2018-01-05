var fnCovertText = function() {
  $('.type01,.type04,.typesp').each(function() {
    var txt = $(this).text();
    var new_txt ='';
    for(var i =0;i<txt.length;i++) {
       new_txt = new_txt+'<i>'+txt[i]+'</i>';
    }
    $(this).empty().html(new_txt);
  });
  $('.type03').each(function() {
    var nt='';
    var nt1 ='';
    var nt2 = '';
    var txtmd =  $(this).children('.txt-md').text();
    var lgtxtmd = txtmd.length
    var txt = $(this).text().substring(lgtxtmd);
    for(var i =0;i<txtmd.length;i++) {
      if(i==6) {
       nt1 = nt1+'<i>'+txtmd[i]+'</i><br class="sp">';
      }
      else {
         nt1 = nt1+'<i>'+txtmd[i]+'</i>';
      }
    }
    for(var i =0;i<txt.length;i++) {
       nt2 = nt2+'<i>'+txt[i]+'</i>';
    }
    nt = '<span class="txt-md">'+nt1+'</span>'+nt2
    $(this).empty().html(nt);
  });
}
var bgPoint = function() {
  var pointHeight,pointWidth,scale;
  var width= 1400;
  var fnResize = function() {
    pointHeight = $('.point-block').innerHeight();
    pointWidth = 1400*pointHeight/1113;
    $('.point-block').css('width',pointWidth);
  }
  $(window).on('load resize',function() {
    fnResize();
  })
}
var LoadAnimation = function() {
  var revealOnScroll = function() {
    $('.mrb:not(.animated)').each(function () {
      var $this = $(this);
      var aniName =  $this.data('animation')
      $(this).on('inview', function(event, isInView) {
        if (isInView) {
          $(this).addClass('animated '+aniName); 
        }
      });
    });
    if($(window).width() >768) {
      $('.about-rs.left').each(function () {
        $(this).on('inview', function(event, isInView) {
           if (isInView) {
            $(this).find('.image-thumb').addClass('animated imgthumbLeft');
            $(this).find('.mask02').addClass('animated mask2Left');
            $(this).find('.mask01').addClass('animated mask1Left');
            $(this).find('.rs-tl01').addClass('animated fadeIn');
            $(this).find('.st-voice').addClass('animated anivoice');
            $(this).find('.lb').addClass('animated fadeInLeft');
          }
        });
      });
      $('.about-rs.right').each(function () {
        $(this).on('inview', function(event, isInView) {
          if (isInView) {
            $(this).find('.image-thumb').addClass('animated imgthumbRight');
            $(this).find('.mask02').addClass('animated mask2Right');
            $(this).find('.mask01').addClass('animated mask1Right');
            $(this).find('.rs-tl01').addClass('animated fadeIn');
            $(this).find('.st-voice').addClass('animated anivoice');
            $(this).find('.lb').addClass('animated fadeInLeft');
          }
        });
      });
    }
  };

  $(window).on('load scroll resize', revealOnScroll);
};

var aniTyping = function() {
  var mvoffset, winScroll,delay;

  var revealOnScroll = function() {
    var isOnScreen = function(elem) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemH = $(elem).height()/1.5;
      var elemTop = $(elem).offset().top;
      return ((elemTop <= docViewBottom - elemH) && (elemTop >= docViewTop));
    };
  mvoffset = $('#mv-block').offset().top + $('#mv-block').height()/2;
  winScroll = $(window).scrollTop()
  if($(window).width() > 768) {
    if(winScroll < mvoffset) {
      delay = 3800;
    }
    else {
      delay = 0;
    }
  }
  else {
    delay = 0;
  }
  $('.type').each(function() {
    var count = $(this).find('i').length;
    if(isOnScreen($(this))) {
      $(this).delay(120*count).queue(function() {
          $(this).css('borderRight', 'transparent');
      });

      $(this).find('i').each(function(index) {
        $(this).delay(120*index).queue(function() {
          $(this).show().dequeue();
        });
      });
    }
  });

  $('.type01').each(function() {
    var count = $(this).children('i').length;
    if(isOnScreen($(this))) {
      $(this).delay(120*count).queue(function() {
        $(this).css('borderRight', 'transparent');
      });

      $(this).find('i').each(function(index) {
        $(this).delay(120*index).queue(function() {
          $(this).show().dequeue();
        });
      });
    }
  });

  $('.type03').each(function() {
    var count = $(this).find('i').length;
    if(isOnScreen($(this))) {
      $(this).delay(delay + 120*count).queue(function() {
        $(this).css('borderRight', 'transparent');
        $('.type04').css('borderRight', '2px solid rgba(255,255,255,.75)');
      });

      $(this).find('i').each(function(index) {
        $(this).delay(delay+120*index).queue(function() {
          $(this).show().dequeue();
        });
      });
    }
    });
    $('.type04').each(function() {
      var count =  $(this).find('i').length;
      var wait = $('.type03').find('i').length*150;
      if(isOnScreen($(this))) {
        $(this).delay(delay+wait+(150*count)).queue(function() {
          $(this).css('borderRight', 'transparent');
          $('.typesp').each(function() {
            var count1 = $(this).children('i').length;
            $('.typesp').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
              if (isInView) {
                $('.typesp').delay(120*count1).queue(function() {
                 $('.typesp').css('borderRight', 'transparent');
                });

                $('.typesp').find('i').each(function(index) {
                  $(this).delay(120*index).queue(function() {
                    $(this).show().dequeue();
                  });
                });
              }
            });
          });
        });

        $(this).find('i').each(function(index) {
          $(this).delay(delay+wait+(150*index)).queue(function() {
            $(this).show().dequeue();
          });
        });
      }
      else {
        $('.typesp').each(function() {
          var count1 = $(this).children('i').length;
           if(isOnScreen($(this))) {
            $('.typesp').delay(120*count1).queue(function() {
             $('.typesp').css('borderRight', 'transparent');
            });

            $('.typesp').find('i').each(function(index) {
              $(this).delay(120*index).queue(function() {
                $(this).show().dequeue();
              });
            });
          }
        });
      }
    });
  };
  $(window).on('load scroll resize', revealOnScroll);
}
var animationMV = function() {
  var revealOnScroll = function() {
    $('#mv-block').on('inview', function(event, isInView, visiblePartX, visiblePartY) {
      if (isInView) {
        $(".mrb-mv:not(.animated)").each(function () {
          var $this = $(this);
          var aniName =  $this.data('animation');
          $(this).addClass('animated '+aniName); 
        });
      }
    });
  }
  $(window).on('load scroll', revealOnScroll);
}
var addClassforIE = function() {
 if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0) {
   if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1 || window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) {
    $('.container, .fie').addClass('ie11w10');
   } else if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1){
    $('.container').addClass('ie11w7');
   }
 }
}
$(function() {
  $('.list-support li, .list-point dl, .list-field li, .list-course .txt-box').matchHeight({
     byRow: true,
  });
  animationMV();
  LoadAnimation();
  aniTyping();
  fnCovertText();
  addClassforIE();

  //bgPoint();
});