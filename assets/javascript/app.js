var panel = $("#quiz-area");
var countStartNumber = 30;

// all questions and answers
var questions = [
	
	{question: "The scientific study of plant life is called what?",
	answers: ["Forestry", "Botany", "Dendrology", "Arbory"],
	correctAnswer: "Botany",
	image: "assets/images/answer1.jpg"},

	{question: "What is an heirloom seed?",
	answers: ["A seed that is worth a lot of money.", "A seed from a variety that has been around for years.", "A seed your grandmother gave you.", "A tomato seed."],
	correctAnswer: "A seed from a variety that has been around for years.",
	image: "assets/images/answer3.jpg"},
	
	{question: "How many plant species on earth are used for medicine?",
	answers: ["70,000", "10,000", "20,000", "30,000"],
	correctAnswer: "70,000",
	image: "assets/images/answer4.jpg"},

	{question: "Which member of the nightshade family is deadly?",
	answers: ["Tobacco", "Belladonna", "Tabasco", "Eggplant"],
	correctAnswer: "Belladonna",
	image: "assets/images/answer5.jpg"},
	
	{question: "The Japanese word 'sakura' means the blossoming of what kind of tree?",
	answers: ["Cherry Tree", "Japanese Pine", "Hydrangea", "Bonsai Tree"],
	correctAnswer: "Cherry Tree",
	image: "assets/images/answer7.jpg"},
	
	{question: "How fast does bamboo grow?",
	answers: ["Up to 2 meters a day.", "Up to .5 meters a day.", "Up to 3 meters a day.", "Up to 1 meter a day."],
	correctAnswer: "Up to 1 meter a day.",
	image: "assets/images/answer8.png"},
	
	{question: "How many species of edible plants are there on earth?",
	answers: ["100,000", "20,000", "80,000", "50,000"],
	correctAnswer: "20,000",
	image: "assets/images/answer9.jpg"},

];

// variable to hold setInterval
var timer;
var game = {

	questions: questions,
	currentQuestion: 0,
	counter: countStartNumber,
	correct: 0,
	incorrect: 0,

	countdown: function() {
		game.counter--;
		$("#counter-number").html(game.counter);
		if (game.counter === 0) {
			console.log("Time's up");
			game.timeUp();
		}
	}, 

	loadQuestion: function() {
		timer = setInterval(game.countdown, 1000);
		panel.html("<h2>" + questions[this.currentQuestion].question + "</h2><br>");

		for (var i=0; i < questions[this.currentQuestion].answers.length; i++) {
			panel.append("<button class='btn btn-default btn-lg btn-block' id='answer-button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button><br><br>");
		}
	},

	nextQuestion: function() {
		game.counter = countStartNumber;
		$("#counter-number").html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();
	},

	timeUp: function() {
		clearInterval(timer);
		$("#counter-number").html(game.counter);

		panel.html("<h2>Out of Time!</h2>");
		panel.append("<p>The correct answer was: " + questions[this.currentQuestion].correctAnswer + "</p>");
		panel.append("<br><img src='" + questions[this.currentQuestion].image + "'/>");

		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		}
		else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},

	results: function() {
		clearInterval(timer);
		panel.html("<h2>All done! Here's how you did:</h2>");

		panel.append("<h5>Correct Answers: " + game.correct + "</h5>");
    	panel.append("<h5>Incorrect Answers: " + game.incorrect + "</h5>");
    	panel.append("<h5>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h5>");
    	panel.append("<br><button id='start-over' class='btn btn-default btn-lg btn-block'>Start Over?</button>");
  	},

  	clicked: function(e) {
  		clearInterval(timer);
  		if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
  			this.answeredCorrectly();
  		}
  		else {
  			this.answeredIncorrectly();
  		}
  	},

  	answeredIncorrectly: function() {
  		game.incorrect++;
  		clearInterval(timer);

  		panel.html("<h2>Sorry!</h2>");
    	panel.append("<p>The Correct Answer is: " + questions[game.currentQuestion].correctAnswer + "</p>");
    	panel.append("<br><img src='" + questions[game.currentQuestion].image + "' />");

    	if (game.currentQuestion === questions.length - 1) {
    		setTimeout(game.results, 3 * 1000);
    	}
    	else {
    		setTimeout(game.nextQuestion, 3 * 1000);
    	}
  	},

  	answeredCorrectly: function() {

	    clearInterval(timer);

	    game.correct++;

	    panel.html("<h2>Great job!</h2>");
	    panel.append("<p>The answer is " + questions[game.currentQuestion].correctAnswer + "</p>")
	    panel.append("<br><img src='" + questions[game.currentQuestion].image + "' />");

	    if (game.currentQuestion === questions.length - 1) {
	      setTimeout(game.results, 3 * 1000);
	    }
	    else {
	      setTimeout(game.nextQuestion, 3 * 1000);
	    }
  	},

  	reset: function() {
  		this.currentQuestion = 0;
  		this.counter = countStartNumber;
  		this.correct = 0;
  		this.incorrect = 0;
  		this.loadQuestion();
  	}
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", "#answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h5>Time Remaining: <span id='counter-number'>30</span> Seconds</h5>");
  game.loadQuestion();
});
