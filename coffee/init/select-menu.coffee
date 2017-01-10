$ ->

	$ '.select-menu'
		.each (i, select)->
			anchor = $('.anchor', select)
			list = $('.dropdown', select)
			search = $('.search input', select)
			anchor.click (e)->
				e.preventDefault()
				if !$(select).hasClass 'active'
					$('.select-menu').removeClass 'active'
				$(select).toggleClass 'active'
				return
			search.on 'keyup', ->
				val = $(this).val().trim().toLowerCase().replace(/[^\w\s!?]/g,'');
				list.find('li').each (i, li)->
					re = new RegExp val, 'gim'
					if (val isnt '') and (!$(li).text().trim().toLowerCase().match(re))
						$(li).addClass 'hidden'
					else $(li).removeClass 'hidden'
					return
				return


	$ 'body'
		.click (e)->
			if $(e.target).closest('.select-menu').length is 0
				$('.select-menu').removeClass 'active'
			return

	$ '.select-menu .dropdown li'
		.click (e)->
			e.preventDefault()
			val = $(this).data 'option'
			$(this).parents('.select-menu').find 'input'
				.val val || $(this).text()
				.change()
			$(this).siblings().removeClass 'active'
			$(this).addClass 'active'
			$(this).parents('.select-menu').find '.anchor .text'
				.html $(this).text()
			$('.select-menu').removeClass 'active'
			return

	return