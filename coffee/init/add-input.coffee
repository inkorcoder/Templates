setId = ->
	$ '#inputsList .form-group:gt(0)'
		.each (i, group)->
			$(group).find('label')
				.html 'Дополнительный адрес ' + (i+2)
				.attr 'for', 'inp_' + (i+2)
			$(group).find('input')
				.attr 'id', 'inp_' + (i+2)
			return
	return

$ '#addInput'
	.click (e)->
		e.preventDefault()
		if $('#inputsList .form-group').length >= 5 then return
		list = $ '#inputsList'
		cache = list.find('.form-group').eq(0).clone()
		cache.insertAfter list.find('.form-group').eq -1
		cache.find('.input').val ''
		cache.find('a').removeClass 'none'
		do setId

$ '#inputsList'
	.on 'click', '.remove-input', (e)->
		e.preventDefault()
		$(this).parents('.form-group').remove()
		do setId
		return