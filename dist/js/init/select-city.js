$(function() {
  $('.cities-list li a').click(function(e) {
    e.preventDefault();
    $('[data-call="#cityPopup"] span').html($(this).html());
    $('.popup').click();
  });
});
