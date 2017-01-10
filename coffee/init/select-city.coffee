$ ->

	$ '.cities-list li a'
		.click (e)->
			e.preventDefault()
			$('[data-call="#cityPopup"] span').html $(this).html()
			$('.popup').click()
			return

	return