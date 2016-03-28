"use strict";

var swimApp = {};

//function to get the user input from a form

swimApp.getInfo = function () {
	$('#go-swim').on('submit', function (e) {
		e.preventDefault();
		swimApp.diff = $('input[name="difficulty"]:checked').val();
		var bigtime = $('input[name="time"]:checked').val();
		swimApp.time = parseInt(bigtime) - 4;
		//always include a warmup which takes 4 minutes, so this value with be the user input minus 4 minutes
		swimApp.speed = $('input[name="speed"]:checked').val();
		console.log(swimApp.diff, swimApp.time, swimApp.speed);
		swimApp.makeCall(swimApp.diff);
	});
};

swimApp.makeCall = function (difficulty) {
	$.ajax({
		url: "https://sheetsu.com/apis/f8bb5843",
		type: 'GET',
		dataType: 'json'
	}).then(function (answer) {
		var workouts = answer.result;
		// console.log(workouts);
		swimApp.getDiff(workouts);
	});
};

//for each answer loop through and see if the difficulty is hard

swimApp.getDiff = function (workouts) {

	var timeList = [];
	var matchedSet = [];
	var warmUp = [];
	for (var i = 0; i < workouts.length; i++) {
		if (workouts[i].difficulty === 'warmup') {
			warmUp.push(workouts[i]);
		};
		if (workouts[i].difficulty === swimApp.diff) {
			// matchedSet.push(workouts[i]);
			var theWorkout = workouts[i];
			matchedSet.push(theWorkout);
			// timeList.push(parseInt(theWorkout.swim_time));
			console.log(theWorkout);

			// append and get everything on the page here
		};
	};
	var matchedWarmup = warmUp[Math.floor(Math.random() * warmUp.length)];
	var newMatchedSet = [];
	for (var d = 0; d < matchedSet.length; d++) {
		var timeTotal = timeList.reduce(function (a, b) {
			return a + b;
		}, 0);
		if (timeTotal < swimApp.time) {
			var matchedItem = matchedSet[Math.floor(Math.random() * matchedSet.length)];
			newMatchedSet.push(matchedItem);
			timeList.push(parseInt(matchedItem.swim_time));
		};
	}
	console.log(timeTotal);
	console.log(matchedWarmup);
	console.log(newMatchedSet);
	swimApp.displayData(newMatchedSet);
};

swimApp.displayData = function (data) {

	// var times = parseInt(theWorkout.swim_time);
	// console.log(times);
	// var workoutTime = theWorkout.
};

//ajax call to sheetsu, get workouts in the users level of difficulty only AND a warmup

//randomly select workouts from the found set

// //give the user enough workouts to fill up their total time

swimApp.init = function () {
	swimApp.getInfo();
	// swimApp.makeCall();
};

$(document).ready(function () {
	swimApp.init();
});