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
var returnedResults = [];

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
var incorrectAnswers = [""];
var allAnswers = [""];
var shuffledAnswers = [""];
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
$("#startBtn").on("click", function (event) {
    event.preventDefault();
    displayCasualScn();
    $("#nextBtn").hide();
});

// Here we are building the URL we need to query the database
// We then created an AJAX call

function displayCasualScn() {
    startScn.style.display = "none";
    casualScn.style.display = "block";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
    var quizURL = "https://opentdb.com/api.php?amount=20&type=multiple";

    $.ajax({
        url: quizURL,
        method: "GET"
    }).then(function (response) {

        returnedResults = response;
        console.log(returnedResults);
        populateQuestionScreen(currentIndex);
    });

    answers.innerHTML = "";
}

function populateQuestionScreen(currentIndex) {
    currentQuestion.textContent = returnedResults.results[currentIndex].question;
    correctAnswer = returnedResults.results[currentIndex].correct_answer;
    incorrectAnswers = returnedResults.results[currentIndex].incorrect_answers;
    incorrectAnswers.push(correctAnswer);
    allAnswers = incorrectAnswers;
    shuffledAnswers = shuffle(allAnswers);
    for (var i = 0; i < 4; i++) {
        var choices = document.createElement("li");
        var choice = document.createElement("button");
        choice.setAttribute("type", "button");
        choice.setAttribute("id", i);
        choice.textContent = shuffledAnswers[i];
        choice.setAttribute("class", "button");
        choices.appendChild(choice);
        answers.appendChild(choices);
    }
    console.log(question);
    console.log(shuffledAnswers);
}

$("#answers").on("click", function(event) {
    event.preventDefault();
    if (playerAnswer.target.matches("button")) {
        var answer = playerAnswer.target.getAttribute("id");
        var isCorrect = checkAnswer(currentIndex, answer);
        if (isCorrect === true) {
            results.textContent = "Correct";
        }
        else {
            results.textContent = "Incorrect";
            timeLeftSpan.textContent = timeLeft;
        }



    }
})

$("#nextBtn").on("click", function (event) {
    event.preventDefault();
    currentIndex++;
    populateQuestionScreen(currentIndex);
    $("#nextBtn").hide();
    if (currentIndex === returnedResults.results.length) {
        displayVictoryScreen();
        checkScore();
        return;
    }
})


function checkAnswer(currentIndex, answer) {
    var userAnswer = parseInt(answer);
    var correctAnswer = parseInt(returnedResults.results[currentIndex].correct_answer);
    var isCorrect = false;
    if (userAnswer === correctAnswer) {
        isCorrect = true;
    }
    return isCorrect;
}

function clearResults() {
    results.textContent = "";
}

function checkScore() {
    var highScore = {
        name: "",
        score: timeLeft
    };

    for (var i = 0; i < highScores.length; i++) {
        if (timeLeft > parseInt(highScores[i].score)) {
            submitBtn.addEventListener("click", function () {
                highScores.name = nameInput;
                console.log(highScores.name);
            })
            highScores.splice(i, 0, highScore);
            highScores.splice(5, 1);
            saveScores();
            i = highScores.length;
        }
    }
}

function renderHighScores() {
    highScoresList.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
        var score = document.createElement("li");
        score.textContent = (" " + highScores[i].name + ":  " + highScores[i].score);
        highScoresList.appendChild(score);
    }
}

function saveScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function loadScores() {
    var tempScores = JSON.parse(localStorage.getItem("highScores"));
    if (tempScores !== null) {
        highScores = tempScores;
    }
}