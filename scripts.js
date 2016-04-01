"use strict";

var swimApp = {};

//function to get the user input from a form

swimApp.getInfo = function () {
	$('#go-swim').on('submit', function (e) {
		e.preventDefault();
		swimApp.diff = $('input[name="difficulty"]:checked').val();
		swimApp.bigtime = $('input[name="time"]:checked').val();
		swimApp.time = parseInt(swimApp.bigtime) - 4;
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
	swimApp.matchedWarmup = warmUp[Math.floor(Math.random() * warmUp.length)];
	swimApp.newMatchedSet = [];
	for (var d = 0; d < matchedSet.length; d++) {
		var timeTotal = timeList.reduce(function (a, b) {
			return a + b;
		}, 0);
		if (timeTotal < swimApp.time) {
			var matchedItem = matchedSet[Math.floor(Math.random() * matchedSet.length)];
			swimApp.newMatchedSet.push(matchedItem);
			timeList.push(parseInt(matchedItem.swim_time));
		};
	}
	console.log(timeTotal);
	console.log(swimApp.matchedWarmup);
	console.log(swimApp.newMatchedSet);
	swimApp.displayData();
};

swimApp.displayData = function () {
	// var swimTemplate = $('#swimTemplate').html();
	// var template = Handlebars.compile(swimTemplate);
	// var workoutTemplate = template(swimApp.newMatchedSet);
	// $('.workout').append(workoutTemplate);
	$('.warmup').append('<h3>' + swimApp.matchedWarmup.workout_name + '</h3>\n<p class="description">' + swimApp.matchedWarmup.workout_description + '</p>\n<p class="total-time">This should take you approximately ' + swimApp.matchedWarmup.swim_time + '</p>');
	$('.workout-intro').text('This is a ' + swimApp.diff + ' ' + swimApp.bigtime + '-minute workout for you. Time to get to work!');
	$('.workout').css('display', 'block');
	for (var x = 0; x <= swimApp.newMatchedSet.length; x++) {
		$('.workouts').append('<h3>' + swimApp.newMatchedSet[x].workout_name + '</h3>\n<p class="description">' + swimApp.newMatchedSet[x].workout_description + '</p>\n<p class="total-time">This should take you approximately ' + swimApp.newMatchedSet[x].swim_time + '</p>');
	}
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