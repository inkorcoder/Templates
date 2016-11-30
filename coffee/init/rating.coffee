$ ->

	$ '.rating.edited'
		.each (i, list)->
			$('li', list).click (e)->
				$(this).siblings().removeClass 'active animated'
				$(this).addClass 'active animated'
				setTimeout((-> $('li', list).removeClass 'animated'), 810);
				return
			return

	return