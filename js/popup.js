const LONG = 2000
const NORM = 1000

var normal_delay = NORM
var long_delay = LONG
var delay = normal_delay
var percent_done = 0
var progress_width = 0
var timeouts = []
var i = 0

jQuery(document).ready(function($) {

$('#resume-btn').hide()

$("#content-form").on('submit', run_reader)

function run_reader(e, _i=0) {
	e.preventDefault()
	// Get user input
	// var content = $("#content-textarea").val()
	var speed_input = $("#speed_range").val()
	var bgpage = chrome.extension.getBackgroundPage()
	var content = bgpage.content.trim()
	// Set i back to 0 or to pause position
	i = _i

	// console.log(content)

	// Set delay based on input speed
	var speed = (speed_input - 10) / 100
	var max_width = $(".progress-bar").width()

	// Disable form submission
	$("#content-form-submit-btn").prop("disabled", true)
	
	var words = content.split(/\s/)
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
		// e.g. if speed = 9, the above delays will be 90% shorter
		normal_delay = NORM - (NORM * speed)
		long_delay = LONG - (LONG * speed)
		// Set initial delay
		delay = normal_delay
	}
	
	function next_word() {
	    $(".word").text(words[i])
	    update_speed()
	    // Words ending with "." may indicate a pause, so use the longer delay instead
	    if (words[i].endsWith(".") || words[i].endsWith('."')) {
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


$('#pause-btn').on('click', function(event) {
	event.preventDefault()
	stop_timeouts()
	$(this).hide()
	$('#resume-btn').show()
})

$('#resume-btn').on('click', function(event) {
	event.preventDefault()
	stop_timeouts()
	$(this).hide()
	$('#pause-btn').show()
	run_reader(event, i)
})

$('#again-btn').on('click', function(event) {
	event.preventDefault()
	stop_timeouts()
	percent_done = 0
	progress_width = 0
	run_reader(event)
})




})