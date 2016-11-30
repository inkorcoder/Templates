Notify =

	_createTitle: (str)->
		$ "<h6 class=\"title\">#{str}</h6>"

	_createText: (str)->
		$ "<div class=\"text\">#{str}</div>"

	_createItem: (title, text)->
		{
			title: @_createTitle title
			text: @_createText text
		}

	send: (title, text, time)->

		stack = $ '.notify-container'
		itemObject = @_createItem title, text
		item = $ '<div class=\"notify\"/>'
		item.append itemObject.title
				.append itemObject.text
				.append $ '<a href="#" class="close">&times;</a>'
		stack.prepend item

		bbox =
			width: item.outerWidth()
			height: item.outerHeight()
			offset: item.offset()

		item[0].delete = ->
			$(this).addClass 'faded'
			setTimeout ->
				item.remove()
			, 310
			return

		item.css 'margin-top', "-#{bbox.height}px"
		setTimeout((-> item.addClass 'active'), 310)
		setTimeout ->
			item[0].delete()
		, time or 5000

		return

$ ->

	$ '.notify-container'
		.on 'click', '.close', (e)->
			e.preventDefault()
			$(this).parents('.notify')[0].delete()
			return

	return