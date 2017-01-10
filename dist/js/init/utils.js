var isNumberKey, windowHeight, windowWidth;

windowWidth = function() {
  var w;
  w = 0;
  if (window.innerWidth > window.outerWidth) {
    w = window.outerWidth;
  } else {
    w = window.innerWidth;
  }
  return Math.max(w, $(window).width());
};

windowHeight = function() {
  var w;
  w = 0;
  if (window.innerHeight > window.outerHeight) {
    w = window.outerHeight;
  } else {
    w = window.innerHeight;
  }
  return Math.max(w, $(window).height());
};

isNumberKey = function(evt) {
  var charCode;
  charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
};
