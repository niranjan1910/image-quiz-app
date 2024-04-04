var images = {
    "dog"  : "dog.jpg",
    "cow" : "cow.jpg",
    "cat" : "cat.jpg",
    "goat"   : "goat.jpg",
    "deer"   : "deer.jpg",
    "hen"   : "hen.jpg",
    "lion"   : "lion.jpg",
    "parrot"   : "parrot.jpg",
    "tiger"   : "tiger.jpg",
    "candies"  : "candies.jpg",
    "india" : "indiaflag.png",
    "usa" : "usa.png",
    "tokyo"   : "tokyo.jpg",
    "peru"   : "peru.png",
    "paris"   : "paris.jpg",
    "tajmahal"   : "tajmahal.jpg",
    "healthymeal"   : "healthymeal.jpg",
    "junkmeal"   : "junkmeal.jpg",
    "chips" : "chips.jpg",
    "nepal" : "nepal.png",
    "sydney"   : "sydney.jpg"
    
    }  
    function populate() {
    if (quiz.isEnded()) {
    showScores();
    } else {
   
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;
    
   
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
    var element = document.getElementById("choice" + i);
    element.innerHTML = images[choices[i]]? '<img src="'+images[choices[i]]+'"/>':choices[i];
    guess("btn" + i, choices[i]);
    }
    
    showProgress();
    }
    };
    
    function guess(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            if (quiz.getQuestionIndex().isCorrectAnswer(guess)) {
                quiz.score++;
                document.getElementById("hint").innerHTML = "Correct";
                setTimeout(function() {
                    quiz.questionIndex++;
                    populate();
                }, 1000);
            } else {
                var choices = quiz.getQuestionIndex().choices.slice(); 
                choices.sort(() => Math.random() - 0.5); 
                quiz.getQuestionIndex().choices = choices; 
                document.getElementById("hint").innerHTML = "Incorrect";
                populate(); 
            }
            
        }
    }
    
    
    function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
    };
    
    function showScores() {
        var gameOverHTML = "<h1>Result</h1>";
        gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;
    
        
    
        var hintDiv = document.getElementById("hint");
        hintDiv.innerHTML = "";
        questions.forEach((question, index) => {
            var hint = document.createElement("div");
            hint.innerHTML = "Answer for Question " + (index + 1) + ": " + question.answer;
            hintDiv.appendChild(hint);
        });
    }
    
    
    
    var questions = [
    new Question("Which one is dog?", ["cow", "goat", "cat", "dog"], "dog"),
    new Question("select tajmahal below", ["paris", "tokyo", "tajmahal", "sydney"], "tajmahal"),
    new Question("choose healthy meal pls?", ["chips", "healthymeal", "candies",  "junkmeal"], "healthymeal"),
    new Question("Find the india flag below?", ["peru", "usa", "nepal", "india"], "india"),
    new Question("choose lion pls?", ["lion", "goat", "tiger", "dog"], "lion")
    ];
    
    function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    }
    
    Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
    }
    
    
    function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    }
    
    Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
    }
    
    Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
    }
    
    this.questionIndex++;
    }
    
    Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
    }
    
    var quiz = new Quiz(questions);
    
    populate();