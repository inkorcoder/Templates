$(function() {

  /*
  		tabs
   */
  var setActiveTab;
  setActiveTab = function(list, index) {
    var current;
    list.find('[data-tab]').removeClass('active');
    current = list.find('[data-tab]').eq(index);
    current.addClass('active');
  };
  $('.tabs li').click(function(e) {
    if (!$(this).parent().hasClass('active')) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      setActiveTab($($(this).parents('.tabs').data('for')), $(this).index());
      $(this).parents('.tabs-outer').removeClass('active');
      $(this).parents('.tabs-outer').find('.anchor span').html($(this).text());
    }
    if ((e.target.nodeName.toLowerCase() !== 'label') || (e.target.nodeName.toLowerCase() !== 'input')) {
      e.preventDefault();
    }
  });
  $('.tabs-outer .anchor').click(function(e) {
    var outer;
    e.preventDefault();
    outer = $(this).parents('.tabs-outer');
    outer.toggleClass('active');
  });
  $('body').click(function(e) {
    if ($(e.target).closest('.tabs-outer').length === 0) {
      return $('.tabs-outer').removeClass('active');
    }
  });
});
