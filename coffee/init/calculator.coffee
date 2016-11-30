$ ->

	###
		calculator
	###
	$ '.calculator'
		.each (i, calc)->
			input = $('input', calc)
			plus = $('.plus', calc)
			minus = $('.minus', calc)
			max = $(calc).data 'max' || 99
			min = $(calc).data 'min' || 1
			dropDisabledClass = ->
				minus.removeClass 'disabled'
				plus.removeClass 'disabled'
			plus.click (e)->
				count = parseInt input.val().trim()
				do dropDisabledClass
				count++ if count < max
				if count is max then plus.addClass 'disabled'
				input.val count
			minus.click (e)->
				count = parseInt input.val().trim()
				do dropDisabledClass
				count-- if count > min
				if count is min then minus.addClass 'disabled'
				input.val count

			return

	return