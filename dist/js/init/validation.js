$(function() {
  $('form input:not([type="file"]), form textarea').on('keyup keydown', function() {
    var errors, i, input;
    input = this;
    i = 0;
    errors = [false];
    if ($(input).val().trim() === "") {
      errors[i] = true;
      $(input).parents('.form-group').addClass('error');
      $(input).siblings('.alert').addClass('active');
      $(input).focus();
      return $(input).siblings('.icon').fadeIn(300).addClass('danger');
    } else {
      errors[i] = false;
      $(input).parents('.form-group').removeClass('error');
      $(input).siblings('.alert').removeClass('active');
      return $(input).siblings('.icon').fadeIn(300).removeClass('danger');
    }
  });
  $('form').on('submit', function(e) {
    var errors, isFormScrolled, scrollTarget;
    errors = [false, false];
    isFormScrolled = false;
    scrollTarget = $(this).parents('.popup').length !== 0 ? $('.popup') : $('html, body');
    $('input:not([type="file"]), textarea', this).each(function(i, input) {
      if ($(input).val().trim() === "") {
        errors[i] = true;
        if (!isFormScrolled) {
          isFormScrolled = true;
          scrollTarget.stop(true, true).animate({
            scrollTop: $(input).offset().top - $(window).height() / 2
          }, 700, 'easeInOutQuint', function() {
            isFormScrolled = false;
            $(input).focus();
          });
        }
        $(input).parents('.form-group').addClass('error');
        $(input).siblings('.alert').addClass('active');
        $(input).siblings('.icon').fadeIn(300).addClass('danger');
      } else {
        errors[i] = false;
        $(input).parents('.form-group').removeClass('error');
        $(input).siblings('.alert').removeClass('active');
        $(input).siblings('.icon').fadeIn(300).removeClass('danger');
      }
    });
    if (errors[0] || errors[1]) {
      return e.preventDefault();
    }
  });
  $('.file-input').each(function(i, input) {
    $('input', input).on('change', function() {
      return $('label', input).html(this.files[0].name);
    });
  });
});
