$(document).ready(function() {
	/* GLOBAL VARS */
	var pulseProperties = {
		backgroundColor: "#252E40"
	};

	// Tracks current question number
	var currentQuestion = 1;

	/* FUNCTION LIBRARY */
	// Question constructor
	function Question(question, a1, a2, a3, a4, correct) {
		this.question = question;
		this.answers = [a1, a2, a3, a4];
		this.correct = correct;
	}

	// Displays the requested question
	var displayQuestion = function(qNum) {
		$('#question span').text(QUESTIONS[qNum-1].question);
		$('#question').textfill({
		});
		for (i=1; i <= 4; i++) {
			if ($('#answer' + i).hasClass('hidden')) {
				$('#answer' + i).removeClass('hidden');
			};
			$('#answer' + i + " p").text(QUESTIONS[qNum-1].answers[i-1]);
		};
	};

	// Correct answer
	var markCorrect = function() {
		$('#question span').text("Correct!");
		$('#question').textfill();
		$('#answer' + QUESTIONS[currentQuestion-1].correct).addClass('correct');
		$('#node' + currentQuestion).pulse('destroy');
	};

	// Incorrect answer
	var markIncorrect = function(choice) {
		$('#question span').text("Incorrect...");
		$('#question').textfill();
		$('#answer' + QUESTIONS[currentQuestion-1].correct).addClass('correct');
		$('#answer' + choice).addClass('incorrect');
		$('#node' + currentQuestion).pulse('destroy');
	};

	// Prepare for next question
	var nextQuestion = function(prevResult) {
		if (prevResult === "correct") {
			$('#node' + currentQuestion).removeAttr('style').addClass('correct');
		}
		else {
			$('#node' + currentQuestion).removeAttr('style').addClass('incorrect');
		};
		if (currentQuestion == QUESTIONS.length) {
			$('#quiz').fadeOut(500);
			$('#score').fadeIn(500, function() {
				displayScore();
			});
		}
		else {
			currentQuestion++;
			$('#node' + currentQuestion).removeClass('unanswered')
			.pulse(pulseProperties, {
				pulses : -1,
				duration: 1000
			});
			displayQuestion(currentQuestion);
		};
		$('.answer').removeClass('correct').removeClass('incorrect');
	};

	// Display the score
	var displayScore = function() {
		var score = $('.node.correct').length;
		if (score > 5) {
			var msg = "Wow! You got " + score + " out of " + QUESTIONS.length + "! Nice Job!";
		}
		else {
			var msg = "You only got " + score + " out of " + QUESTIONS.length;
			$('#restart').fadeIn(500);
		}
		$('#score h1').text(msg);
	};

	/* BEGIN MAIN SCRIPT */

	// Create mock questions
	var QUESTIONS = []
	for (i=0;i<10;i++) {
		QUESTIONS[i] = new Question(
			"This is question number " + (i+1),
			"answer1 q" + (i+1),
			"answer2 q" + (i+1),
			"answer3 q" + (i+1),
			"answer4 q" + (i+1),
			2
			);
	};

	// Start quiz
	$('#start, #restart').on('click', function() {
		$('.node').removeClass('correct').removeClass('incorrect');
		$('button').removeClass('disabled');
		$('.overlay').fadeOut(500, function() {
			$('#quiz').fadeIn(500);
		});
		$('#node1').removeClass('unanswered').pulse(pulseProperties, {
			pulses : -1,
			duration: 1000
		});
		displayQuestion(1);
	})

	// Answer a question
	$('.answer').on('click', function() {
		var choice = String(this.id).charAt(6);
		if (choice == QUESTIONS[currentQuestion-1].correct) {
			markCorrect();
			setTimeout(function() {
				nextQuestion("correct");
			}, 3000);
		}
		else {
			markIncorrect(choice);
			setTimeout(function() {
				nextQuestion("incorrect");
			}, 3000);
		};
	});

	// Google it
	$('#google').one('click', function() {
		$('#google').addClass('disabled');
		window.open("http://www.google.com/?#q=" + $('#question span').text());
	});

	// 50:50
	$('#5050').one('click', function() {
		$('#5050').addClass('disabled');
		var incorrect = [];
		for (i=1;i<=4;i++) {
			if (i != QUESTIONS[currentQuestion-1].correct) {
				incorrect.push(i);
			};
		};
		while ($('.answer.hidden').length < 2) {
			var random = incorrect[Math.floor(Math.random()*3)];
			$('#answer' + random).addClass('hidden').fadeOut(500);
		};
	});
})