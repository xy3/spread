const LONG = 1000
const NORM = 850

jQuery(document).ready(function($) {
	$("#content-form").on('submit', function(event) {
		event.preventDefault()
		
		// Get user input
		var content = $("#content-textarea").val()
		var speed_input = $("#speed_range").val()

		// Disable form submission
		$("#content-form-submit-btn").prop("disabled", true)
		
		var words = content.split(/\s/)
		var i = 0
		
		// Set delay based on input speed
		var speed = (speed_input - 1) / 10
		
		var normal_delay = NORM
		var long_delay = LONG
		var delay = normal_delay
		set_speed(speed_input)
		
		var percent_done = 0
		var progress_width = 0
		var max_width = $(".progress-bar").width()

		// Allow the user to update the speed on the fly
		function update_speed() {
			var new_speed = $("#speed_range").val()
			if (new_speed != speed_input) {
				set_speed(new_speed)
			}
		}

		function set_speed(new_speed) {
			// Set delay based on input speed
			speed = (new_speed - 1) / 10
			normal_delay = NORM
			long_delay = LONG // Slowest possible speed
			// e.g. if speed = 9, the above delays will be 90% shorter
			normal_delay -= (normal_delay * speed)
			long_delay -= (long_delay * speed)
			// Set initial delay
			delay = normal_delay
		}
		
		function next_word() {
		    $(".word").text(words[i])
		    update_speed()
		    // Words ending with "." may indicate a pause, so use the longer delay instead
		    if (words[i].endsWith(".")) {
		    	delay = long_delay
		    } else {
		    	delay = normal_delay
		    }
		    i++
		    percent_done = i / words.length
		    progress_width = max_width * percent_done
		    $(".progress").width(progress_width)
		    
		    if (i < words.length){
		        setTimeout(next_word, delay)
		    }
		}
		next_word()
	})

	$('#speed_range').on('change', function(event) {
		event.preventDefault();
		/* Act on the event */
		var speed_val = $("#speed_range").val()
		$("#speed_val").text(speed_val)
	});
})


