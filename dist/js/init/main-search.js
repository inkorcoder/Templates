$(function() {
  $('.main-header input').on('touchstart focus', function() {
    $(this).siblings('.search-results').addClass('active');
  });
  $('body').click(function(e) {
    if ($(e.target).closest('.main-header input, .main-header .search-results').length < 1) {
      $('.main-header .search-results').removeClass('active');
    }
  });
  $('.main-header .fake').click(function(e) {
    e.preventDefault();
    $('.main-header .search-results').removeClass('active');
  });
});
