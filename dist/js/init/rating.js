$(function() {
  $('.rating.edited').each(function(i, list) {
    $('li', list).click(function(e) {
      $(this).siblings().removeClass('active animated');
      $(this).addClass('active animated');
      setTimeout((function() {
        return $('li', list).removeClass('animated');
      }), 810);
    });
  });
});
