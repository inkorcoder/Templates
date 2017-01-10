$(document).ready(function() {
  $('.range-slider').each(function(i, range) {
    var data, max, min, slider;
    if (!$(range).data('options')) {
      return;
    }
    data = JSON.parse($(range).data('options').toString().replace(/\'/gim, '"'));
    min = $(range).siblings('.inputs').find('.input').eq(0);
    max = $(range).siblings('.inputs').find('.input').eq(1);
    min.val(data.start[0]);
    max.val(data.start[1]);
    slider = noUiSlider.create(range, {
      start: [data.start[0], data.start[1]],
      connect: true,
      step: data.step || 1,
      behaviour: 'drag',
      margin: data.margin || 100,
      range: {
        'min': data.min,
        'max': data.max
      }
    });
    slider.on('slide', function(values, handle) {
      min.val(parseInt(values[0]));
      return max.val(parseInt(values[1]));
    });
    min.on('keyup', function(e) {
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode === 65 && e.ctrlKey === true) || (e.keyCode === 67 && e.ctrlKey === true) || (e.keyCode === 88 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
      return slider.set([this.value, null]);
    });
    max.on('keyup', function() {
      return slider.set([null, this.value]);
    });
  });
});
