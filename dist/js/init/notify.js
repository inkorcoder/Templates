var Notify;

Notify = {
  _createTitle: function(str) {
    return $("<h6 class=\"title\">" + str + "</h6>");
  },
  _createText: function(str) {
    return $("<div class=\"text\">" + str + "</div>");
  },
  _createItem: function(title, text) {
    return {
      title: this._createTitle(title),
      text: this._createText(text)
    };
  },
  send: function(title, text, time) {
    var bbox, item, itemObject, stack;
    stack = $('.notify-container');
    itemObject = this._createItem(title, text);
    item = $('<div class=\"notify\"/>');
    item.append(itemObject.title).append(itemObject.text).append($('<a href="#" class="close">&times;</a>'));
    stack.prepend(item);
    bbox = {
      width: item.outerWidth(),
      height: item.outerHeight(),
      offset: item.offset()
    };
    item[0]["delete"] = function() {
      $(this).addClass('faded');
      setTimeout(function() {
        return item.remove();
      }, 310);
    };
    item.css('margin-top', "-" + bbox.height + "px");
    setTimeout((function() {
      return item.addClass('active');
    }), 310);
    setTimeout(function() {
      return item[0]["delete"]();
    }, time || 5000);
  }
};

$(function() {
  $('.notify-container').on('click', '.close', function(e) {
    e.preventDefault();
    $(this).parents('.notify')[0]["delete"]();
  });
});
