$(function() {
  $('.select-menu').each(function(i, select) {
    var anchor, list, search;
    anchor = $('.anchor', select);
    list = $('.dropdown', select);
    search = $('.search input', select);
    anchor.click(function(e) {
      e.preventDefault();
      if (!$(select).hasClass('active')) {
        $('.select-menu').removeClass('active');
      }
      $(select).toggleClass('active');
    });
    return search.on('keyup', function() {
      var val;
      val = $(this).val().trim().toLowerCase().replace(/[^\w\s!?]/g, '');
      list.find('li').each(function(i, li) {
        var re;
        re = new RegExp(val, 'gim');
        if ((val !== '') && (!$(li).text().trim().toLowerCase().match(re))) {
          $(li).addClass('hidden');
        } else {
          $(li).removeClass('hidden');
        }
      });
    });
  });
  $('body').click(function(e) {
    if ($(e.target).closest('.select-menu').length === 0) {
      $('.select-menu').removeClass('active');
    }
  });
  $('.select-menu .dropdown li').click(function(e) {
    var val;
    e.preventDefault();
    val = $(this).data('option');
    $(this).parents('.select-menu').find('input').val(val || $(this).text()).change();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(this).parents('.select-menu').find('.anchor .text').html($(this).text());
    $('.select-menu').removeClass('active');
  });
});
