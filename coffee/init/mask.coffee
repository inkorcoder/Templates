$ '[data-mask]'
	.each (i, input)->
		mask = $(input).attr 'data-mask'
		$(input).mask mask, {
			placeholder: mask
		}
		return