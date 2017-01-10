$(function() {
  var hidePopups;
  $('[data-call]').click(function(e) {
    var called;
    e.preventDefault();
    called = $($(this).data('call'));
    if (!called.hasClass('active')) {
      $('body').css('width', $('body').width() + 'px').addClass('overlayed');
      called.show();
      setTimeout(function() {
        return called.addClass('active');
      }, 100);
    }
  });
  $('[data-dismiss]').click(function(e) {
    e.preventDefault();
    $('body').addClass('overlayed');
    return hidePopups();
  });
  hidePopups = function() {
    $('.popup').each(function(i, popup) {
      var called;
      called = $(popup);
      $('body').css('width', '').removeClass('overlayed');
      called.removeClass('active');
      setTimeout(function() {
        return called.hide();
      }, 300);
    });
  };
  $('.close-popup').click(function(e) {
    e.preventDefault();
    hidePopups();
  });
  $('.popup').click(function(e) {
    if ($(e.target).closest('.inner').length === 0) {
      e.preventDefault();
      hidePopups();
    }
  });
});
