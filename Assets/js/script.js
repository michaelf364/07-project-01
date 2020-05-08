//start screen
var startScn = document.querySelector("#startScn");
var startBtn = document.querySelector("#startBtn");
var highScoresBtn = document.querySelector("#highScoresBtn");
//question screen
var timeAttackScn = document.querySelector("#timeAttackScn");
var timeLeft = document.querySelector("#timeLeft");
var currentQuestion = document.querySelector("#currentQuestion");
var answers = document.querySelector("#answers");
var results = document.querySelector("#results");
var casualScn = document.querySelector("#casualScn");
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

var quizURL = "https://opentdb.com/api.php?amount=10&type=multiple";
var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow";
initialize();
function initialize() {
    //loadScores();
    currentIndex = 0;
    timeLeft = 60;
    //  startScn.style.display = "block";
    // timeAttackScn.style.display = "none";
    // victoryScn.style.display = "none";
    // defeatScn.style.display = "none";
    // highScoreScn.style.display = "none";
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

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft < 0) {
            DisplayDefeatScreen();
            clearInterval(timer);
        }
        timeLeftSpan.textContent = timeLeft;
    }, 1000)
}

$("#timeAttackBtn").on("click", function () {
    startTimer();
    displayTimeAttack();
});

$("#casualBtn").on("click", function () {
    displayCasual();
})
// Here we are building the URL we need to query the database
var quizURL = "https://opentdb.com/api.php?amount=10&type=multiple";
var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow";
// We then created an AJAX call
$.ajax({
    url: quizURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});

function displayTimeAttack() {

}

function displayCasual() {

}

function displayQuestionScn(index) {
    answers.innerHTML = "";
    currentQuestion.textContent = questions[index].question;
    for (var i = 0; i < questions[index].choices.length; i++) {
        var question = document.createElement("li");
        var questionBtn = document.createElement("button");
        questionBtn.setAttribute("type", "button");
        questionBtn.setAttribute("id", i);
        questionBtn.textContent = questions[index].choices[i];
        questionBtn.setAttribute("class", "btn btn-primary");
        question.appendChild(questionBtn);
        answers.appendChild(question);
    }
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