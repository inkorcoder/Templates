$ ->

	###
		tabs
	###
	setActiveTab = (list, index)->
		list.find '[data-tab]'
			.removeClass 'active'
		current = list
			.find '[data-tab]'
			.eq index
		current.addClass 'active'

		return

	$ '.tabs li'
		.click (e)->
			if !$(this).parent().hasClass 'active'
				$(this).siblings().removeClass 'active'
				$(this).addClass 'active'
				setActiveTab $($(this).parents('.tabs').data('for')), $(this).index()
				$(this).parents('.tabs-outer').removeClass 'active'
				$(this).parents('.tabs-outer').find('.anchor span').html $(this).text()
			if (e.target.nodeName.toLowerCase() isnt 'label') || (e.target.nodeName.toLowerCase() isnt 'input')
				e.preventDefault()
			return

	$ '.tabs-outer .anchor'
		.click (e)->
			e.preventDefault()
			outer = $(this).parents('.tabs-outer')
			outer.toggleClass 'active'
			return

	$ 'body'
		.click (e)->
			if $(e.target).closest('.tabs-outer').length is 0
				$('.tabs-outer').removeClass 'active'

	return