###
	filter
###
$ '.filter-anchor'
	.click (e)->
		e.preventDefault()
		$('body').addClass 'overlayed'
		$('.aside-filter').addClass 'active'
		$('.fader').show()
		setTimeout((-> $('.fader').addClass 'active'), 10);
		return

$ 'body'
	.click (e)->
		if $(e.target).closest('.aside-filter, .filter-anchor').length is 0
			$('.aside-filter').removeClass 'active'
			$('body').removeClass 'overlayed'
		return

