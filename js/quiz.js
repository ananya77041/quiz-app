$(document).ready(function() {
	/* GLOBAL VARS */
	var pulseProperties = {
		backgroundColor: "grey"
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
			$('#answer' + i + " p").text(QUESTIONS[qNum-1].answers[i-1]);
		};
	};

	// Correct answer
	var markCorrect = function() {
		$('#question span').text("Correct!");
		$('#question').textfill();
		$('#answer' + QUESTIONS[currentQuestion].correct).addClass('correct');
		$('#node' + currentQuestion).pulse('destroy')
		setTimeout(function() {
			$('#node' + currentQuestion).css('background-color', 'green');
			currentQuestion++;
			$('#node' + currentQuestion).removeClass('unanswered')
			.pulse(pulseProperties, {
				pulses : -1,
				duration: 2000
			});
			$('#answer' + QUESTIONS[currentQuestion].correct).removeClass('correct');
			displayQuestion(currentQuestion);
		}, 3000);
	};

	// Incorrect answer
	var markIncorrect = function(choice) {
		$('#question span').text("Incorrect...");
		$('#question').textfill();
		$('#answer' + QUESTIONS[currentQuestion].correct).addClass('correct');
		$('#answer' + choice).addClass('incorrect');
		$('#node' + currentQuestion).pulse('destroy')
		setTimeout(function() {
			$('#node' + currentQuestion).css('background-color', 'red');
			currentQuestion++;
			$('#node' + currentQuestion).removeClass('unanswered')
			.pulse(pulseProperties, {
				pulses : -1,
				duration: 2000
			});
			$('.answer').removeClass('correct').removeClass('incorrect');
			displayQuestion(currentQuestion);
		}, 3000);
	};

	/* BEGIN MAIN SCRIPT */

	// Create questions
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
	$('#start').on('click', function() {
		$('#start-state').fadeOut(500);
		$('#quiz').fadeIn(500);
		$('#node1').removeClass('unanswered').pulse(pulseProperties, {
			pulses : -1,
			duration: 2000
		});
		displayQuestion(1);
	})

	// Answer a question
	$('.answer').on('click', function() {
		var choice = String(this.id).charAt(6);
		if (choice == QUESTIONS[currentQuestion].correct) {
			markCorrect();
		}
		else {
			markIncorrect(choice);
		};
	});

	// Google it
	$('#google').on('click', function() {
		window.open("http://www.google.com/?#q=" + $('#question span').text());
	});

	// 50:50
	$('#5050').on('click', function() {
	});
})