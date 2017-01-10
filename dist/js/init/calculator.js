$(function() {

  /*
  		calculator
   */
  $('.calculator').each(function(i, calc) {
    var dropDisabledClass, input, max, min, minus, plus;
    input = $('input', calc);
    plus = $('.plus', calc);
    minus = $('.minus', calc);
    max = $(calc).data('max' || 99);
    min = $(calc).data('min' || 1);
    dropDisabledClass = function() {
      minus.removeClass('disabled');
      return plus.removeClass('disabled');
    };
    plus.click(function(e) {
      var count;
      count = parseInt(input.val().trim());
      dropDisabledClass();
      if (count < max) {
        count++;
      }
      if (count === max) {
        plus.addClass('disabled');
      }
      return input.val(count);
    });
    minus.click(function(e) {
      var count;
      count = parseInt(input.val().trim());
      dropDisabledClass();
      if (count > min) {
        count--;
      }
      if (count === min) {
        minus.addClass('disabled');
      }
      return input.val(count);
    });
  });
});
