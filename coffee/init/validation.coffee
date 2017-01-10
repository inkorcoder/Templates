$ ->

	$ 'form input:not([type="file"]), form textarea'
		.on 'keyup keydown', ->
			input = this; i = 0
			errors = [off]
			if $(input).val().trim() is ""
				errors[i] = on
				$(input).parents('.form-group').addClass 'error'
				$(input).siblings('.alert').addClass 'active'
				$(input).focus()
				$(input).siblings('.icon').fadeIn(300).addClass 'danger'
			else
				errors[i] = off
				$(input).parents('.form-group').removeClass 'error'
				$(input).siblings('.alert').removeClass 'active'
				$(input).siblings('.icon').fadeIn(300).removeClass 'danger'

	$ 'form'
		.on 'submit', (e)->
			errors = [off,off]
			isFormScrolled = off
			scrollTarget = if $(this).parents('.popup').length isnt 0 then $('.popup') else $ 'html, body'
			$('input:not([type="file"]), textarea', this).each (i, input)->
				if $(input).val().trim() is ""
					errors[i] = on
					if !isFormScrolled
						isFormScrolled = on
						scrollTarget
							.stop on, on
							.animate
								scrollTop: $(input).offset().top-$(window).height()/2
							, 700, 'easeInOutQuint', ->
								isFormScrolled = off
								$(input).focus()
								return
					$(input).parents('.form-group').addClass 'error'
					$(input).siblings('.alert').addClass 'active'
					$(input).siblings('.icon').fadeIn(300).addClass 'danger'
				else
					errors[i] = off
					$(input).parents('.form-group').removeClass 'error'
					$(input).siblings('.alert').removeClass 'active'
					$(input).siblings('.icon').fadeIn(300).removeClass 'danger'
				return
			if errors[0] or errors[1] then e.preventDefault()

	$ '.file-input'
		.each (i, input)->
			$('input', input).on 'change', ()->
				$('label', input).html this.files[0].name
			return

	return