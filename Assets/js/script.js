//start screen
var startScn = document.querySelector("#startScn");
var startBtn = document.querySelector("#startBtn");
var highScoresBtn = document.querySelector("#highScoresBtn");
//question screen
var casualScn = document.querySelector("#casualScn");
var currentQuestion = document.querySelector("#currentQuestion");
var answers = document.querySelector("#answers");
var results = document.querySelector("#results");
var nextBtn = document.querySelector("#nextBtn");

//victory screen
var victoryScn = document.querySelector("#victoryScn");
var nameInput = document.querySelector("#nameInput");
var submitBtn = document.querySelector("#submitBtn");
var score = document.querySelector("#score");
var playAgainVSBtn = document.querySelector("#playAgainVSBtn");
var highScoresVSBtn = document.querySelector("#highScoresVSBtn");

//defeat screen
var defeatScn = document.querySelector("#defeatScn");
var playAgainDSBtn = document.querySelector("#playAgainDSBtn");
var highScoresDSBtn = document.querySelector("#highScoresDSBtn");

//high score screen
var highScoreScn = document.querySelector("#highScoreScn");
var highScoresList = document.querySelector("#highScoresList");
var backButton = document.querySelector("#backButton");
var currentIndex;
var timeLeft;
var timer;
var timeAttackScores = [
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    }
];
var casualScores = [
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    },
    {
        name: "None",
        score: 0
    }
];
var question = "";
var correctAnswer = "";
var incorrectAnswers = [];
var allAnswers = [];
var shuffledAnswers = [];
initialize();

function initialize() {
    //loadScores();
    currentIndex = 0;
    timeLeft = 60;
    startScn.style.display = "block";
    casualScn.style.display = "none";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
    var queryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow";


    var encodedUrl = encodeURIComponent(queryUrl);
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: 'https://corsbridge2.herokuapp.com/' + encodedUrl,
        success: function (data) {
            console.log(data);
        }
    });

}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
$("#startBtn").on("click", function () {
    currentIndex = 0;
    displayCasualScn(currentIndex);
})

// Here we are building the URL we need to query the database
// We then created an AJAX call

function displayCasualScn(index) {
    var quizURL = "https://opentdb.com/api.php?amount=20&type=multiple";
    answers.innerHTML = "";
    $.ajax({
        url: quizURL,
        method: "GET"
    }).then(function (response) {
        currentQuestion.textContent = response.results[index].question;
        for (let i = 0; i < 20; i++) {
            // question = response.results[i].question;
            correctAnswer = response.results[i].correct_answer;
            incorrectAnswers = response.results[i].incorrect_answers;
            allAnswers = incorrectAnswers.push(correctAnswer);
            shuffledAnswers = shuffle(allAnswers);
            var choices = document.createElement("li");
            var choice = document.createElement("button");
            choice.setAttribute("type", "button");
            choice.setAttribute("id", i);
            choice.textContent = shuffledAnswers[i];
            choice.setAttribute("class", "button");
            choices.appendChild(choice);
            answers.appendChild(choices);
            console.log(question);
            console.log(shuffledAnswers);
        }
    });

    // currentQuestion.textContent = questions[index].question;
    // for (var i = 0; i < questions[index].choices.length; i++) {
    //     var question = document.createElement("li");
    //     var questionBtn = document.createElement("button");
    //     questionBtn.setAttribute("type", "button");
    //     questionBtn.setAttribute("id", i);
    //     questionBtn.textContent = questions[index].choices[i];
    //     questionBtn.setAttribute("class", "btn btn-primary");
    //     question.appendChild(questionBtn);
    //     answers.appendChild(question);
    // }
}

answers.addEventListener("click", function (playerAnswer) {
    if (playerAnswer.target.matches("button")) {
        var answer = playerAnswer.target.getAttribute("id");
        var isCorrect = checkAnswer(currentIndex, answer);
        if (isCorrect === true) {
            results.textContent = "Correct";
        }
        else {
            results.textContent = "Incorrect";
            timeLeft -= 10;
            timeLeftSpan.textContent = timeLeft;
        }
        setTimeout(clearResults, 1500)
        currentIndex++;
        if (currentIndex === questions.length) {
            clearInterval(timer);
            displayVictoryScreen();
            checkScore();
            return;
        }
        displayQuestionScn(currentIndex);
    }
});