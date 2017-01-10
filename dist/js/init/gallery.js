$(document).ready(function() {
  $('.popup-gallery').each(function(i, gallery) {
    return $(gallery).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      tLoading: 'Загрузка #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
        preload: [0, 1]
      },
      image: {
        tError: '<a href="%url%">Изображение #%curr%</a> недоступно.',
        titleSrc: function(item) {
          var title;
          title = "";
          if (item.el.attr('title')) {
            title += item.el.attr('title');
          }
          if (item.el.find('img').attr('alt')) {
            title += "<small>" + (item.el.find('img').attr('alt')) + "</small>";
          }
          return title;
        }
      }
    });
  });
});
