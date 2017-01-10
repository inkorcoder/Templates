$ ->

	$ '.main-header input'
		.on 'touchstart focus', ->
			$(this).siblings('.search-results').addClass 'active'
			return

	$ 'body'
		.click (e)->
			if $(e.target).closest('.main-header input, .main-header .search-results').length < 1
				$('.main-header .search-results').removeClass 'active'
			return

	$ '.main-header .fake'
		.click (e)->
			e.preventDefault()
			$('.main-header .search-results').removeClass 'active'
			return

	# 	.blur ->
	# 		$(this).siblings('.search-results').removeClass 'active'

	return