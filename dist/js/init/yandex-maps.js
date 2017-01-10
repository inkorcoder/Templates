var points, radios;

if (typeof ymaps !== 'undefined') {
  points = [
    {
      point: [55.745328, 37.646822],
      title: "м. Старая Деревня, Приморский пр., 72",
      text: "Время работы: пн-сб - 10:00-20:00 <br> Оплата: наличные"
    }
  ];
  radios = $('[data-point]');
  ymaps.ready(function() {
    var i, len, map, placemark, point;
    map = new ymaps.Map("map", {
      center: points[0].point,
      zoom: 13
    });
    for (i = 0, len = points.length; i < len; i++) {
      point = points[i];
      placemark = new ymaps.Placemark(point.point, {
        hintContent: point.title || '',
        balloonContent: point.text || ''
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map.png',
        iconImageSize: [64, 64],
        iconImageOffset: [-32, -32]
      });
      point.placemark = placemark;
      map.geoObjects.add(placemark);
      map.behaviors.disable('drag');
    }
    radios.click(function(e) {
      var index;
      if ($(this).hasClass('active')) {
        return;
      }
      $('[data-point]').removeClass('active');
      $(this).addClass('active');
      index = parseInt($(this).data('point'));
      point = points[index];
      $('.map-content-list > li').removeClass('active');
      return map.panTo(point.point, {
        flying: 1,
        duration: 500,
        safe: true,
        autoPan: true,
        checkZoomRange: false,
        autoPanMargin: 49
      }).then(function() {
        return setTimeout(function() {
          $('.map-content-list > li').eq(index).addClass('active');
        }, 300);
      });
    });
  });
}
