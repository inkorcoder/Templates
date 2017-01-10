$(function() {
  $('.slide-menu').each(function(i, select) {
    var anchor, list;
    anchor = $('.anchor', select);
    list = $('.dropdown', select);
    return anchor.click(function(e) {
      e.preventDefault();
      $(select).toggleClass('active');
      if ($(select).hasClass('active')) {
        list.slideDown(400);
      } else {
        list.slideUp(100);
      }
    });
  });
});
