windowWidth = ->
	w = 0
	if window.innerWidth > window.outerWidth
		w = window.outerWidth
	else
		w = window.innerWidth
	return Math.max w, $(window).width()

windowHeight = ->
	w = 0
	if window.innerHeight > window.outerHeight
		w = window.outerHeight
	else
		w = window.innerHeight
	return Math.max w, $(window).height()

isNumberKey = (evt)->
	charCode = if (evt.which) then evt.which else event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false
	return true