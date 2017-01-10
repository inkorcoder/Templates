
/*
	filter
 */
$('.filter-anchor').click(function(e) {
  e.preventDefault();
  $('body').addClass('overlayed');
  $('.aside-filter').addClass('active');
  $('.fader').show();
  setTimeout((function() {
    return $('.fader').addClass('active');
  }), 10);
});

$('body').click(function(e) {
  if ($(e.target).closest('.aside-filter, .filter-anchor').length === 0) {
    $('.aside-filter').removeClass('active');
    $('body').removeClass('overlayed');
  }
});
