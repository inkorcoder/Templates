

$ document
	.ready ->

		$ '.range-slider'
			.each (i, range)->

				if !$(range).data('options') then return
				data = JSON.parse $(range).data('options').toString().replace /\'/gim, '"'

				min = $(range).siblings('.inputs').find('.input').eq(0)
				max = $(range).siblings('.inputs').find('.input').eq(1)

				min.val data.start[0]
				max.val data.start[1]

				slider = noUiSlider.create range, {
					start: [data.start[0], data.start[1]],
					connect: true,
					step: data.step || 1
					behaviour: 'drag'
					margin: data.margin || 100
					range: {
						'min': data.min,
						'max': data.max
					}
				}

				slider.on 'slide', ( values, handle )->
					min.val parseInt values[0]
					max.val parseInt values[1]

				min.on 'keyup', (e)->
					if (
							$.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) isnt -1 or
							(e.keyCode is 65 && e.ctrlKey is true) or
							(e.keyCode is 67 && e.ctrlKey is true) or
							(e.keyCode is 88 && e.ctrlKey is true) or
							(e.keyCode >= 35 && e.keyCode <= 39)
							)
							return
					if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
						e.preventDefault()
					slider.set [this.value, null]
				max.on 'keyup', -> slider.set [null, this.value]

				return

		return