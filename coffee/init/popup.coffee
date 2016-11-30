$ ->

	$ '[data-call]'
		.click (e)->
			e.preventDefault()
			called = $ $(this).data 'call'
			if !called.hasClass 'active'
				$('body')
					.css 'width', $('body').width()+'px'
					.addClass 'overlayed'
				called.show()
				setTimeout ->
					called.addClass 'active'
				, 100
			return

	$ '[data-dismiss]'
		.click (e)->
			e.preventDefault()
			$('body').addClass 'overlayed'
			do hidePopups


	hidePopups = ->
		$ '.popup'
			.each (i, popup)->
				called = $ popup
				$('body')
					.css 'width', ''
					.removeClass 'overlayed'
				called.removeClass 'active'
				setTimeout ->
					called.hide()
				, 300
				return
		return

	$ '.close-popup'
		.click (e)->
			e.preventDefault()
			do hidePopups
			return

	$ '.popup'
		.click (e)->
			if $(e.target).closest('.inner').length is 0
				e.preventDefault()
				do hidePopups
			return

	return