$ ->

	$ '.slide-menu'
		.each (i, select)->
			anchor = $('.anchor', select)
			list = $('.dropdown', select)
			anchor.click (e)->
				e.preventDefault()
				$(select).toggleClass 'active'
				if $(select).hasClass 'active'
					list.slideDown(400)
				else list.slideUp(100)
				return

	return