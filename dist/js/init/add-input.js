var setId;

setId = function() {
  $('#inputsList .form-group:gt(0)').each(function(i, group) {
    $(group).find('label').html('Дополнительный адрес ' + (i + 2)).attr('for', 'inp_' + (i + 2));
    $(group).find('input').attr('id', 'inp_' + (i + 2));
  });
};

$('#addInput').click(function(e) {
  var cache, list;
  e.preventDefault();
  if ($('#inputsList .form-group').length >= 5) {
    return;
  }
  list = $('#inputsList');
  cache = list.find('.form-group').eq(0).clone();
  cache.insertAfter(list.find('.form-group').eq(-1));
  cache.find('.input').val('');
  cache.find('a').removeClass('none');
  return setId();
});

$('#inputsList').on('click', '.remove-input', function(e) {
  e.preventDefault();
  $(this).parents('.form-group').remove();
  setId();
});
