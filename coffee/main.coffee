$ document
	.ready ->

		waitForFinalEvent = do ->
			timers = {}
			(callback, ms, uniqueId) ->
				if !uniqueId
					uniqueId = 'Don\'t call this twice without a uniqueId'
				if timers[uniqueId]
					clearTimeout timers[uniqueId]
				timers[uniqueId] = setTimeout(callback, ms)
				return

		$ window
			.resize ->
				waitForFinalEvent (->
					return
				), 200, ''
				return

		return