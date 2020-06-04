const LONG = 1000
const NORM = 850

var normal_delay = NORM
var long_delay = LONG
var delay = normal_delay
var percent_done = 0
var progress_width = 0
var timeouts = []

jQuery(document).ready(function($) {

$("#content-form").on('submit', run_reader)

function run_reader(e) {
	e.preventDefault()
	// Get user input
	// var content = $("#content-textarea").val()
	var speed_input = $("#speed_range").val()
	var bgpage = chrome.extension.getBackgroundPage()
	var content = bgpage.content.trim()

	// console.log(content)

	// Set delay based on input speed
	var speed = (speed_input - 10) / 100
	var max_width = $(".progress-bar").width()

	// Disable form submission
	$("#content-form-submit-btn").prop("disabled", true)
	
	var words = content.split(/\s/)
	var i = 0	
	set_speed(speed_input)

	// Allow the user to update the speed on the fly
	function update_speed() {
		var new_speed = $("#speed_range").val()
		if (new_speed != speed_input) {
			set_speed(new_speed)
		}
	}

	function set_speed(new_speed) {
		// Set delay based on input speed
		speed = (new_speed - 10) / 100
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
	        timeouts.push( setTimeout(next_word, delay) )
	    }
	}
	next_word()
}

function stop_timeouts() {
	for (var i = 0; i < timeouts.length; i++) {
	    clearTimeout(timeouts[i])
	}
	timeouts = []
}

$('#speed_range').on('change', function(event) {
	event.preventDefault()
	/* Act on the event */
	var speed_val = $("#speed_range").val()
	$("#speed_val").text(speed_val)
})


$('#stop-btn').on('click', function(event) {
	event.preventDefault()
	stop_timeouts()
	// window.close()
})

$('#again-btn').on('click', function(event) {
	event.preventDefault()
	stop_timeouts()
	percent_done = 0
	progress_width = 0
	// $("#content-form-submit-btn").prop("disabled", true)
	run_reader()
})




})