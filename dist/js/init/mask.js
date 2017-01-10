$('[data-mask]').each(function(i, input) {
  var mask;
  mask = $(input).attr('data-mask');
  $(input).mask(mask, {
    placeholder: mask
  });
});
