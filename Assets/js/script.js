$(document).ready(function () {
    initialize();
});
//member variables
var counterOfCorrectAnswer = 0;
var counterOfNotCorrectAnswer = 0;
var answerValue;
var answerInformation;
var currentIndex = 0;
var resultPerc = 0;
var arrayOfScoresObj = [];
var countOFPlayers = 1;

//start screen
var startScn = document.querySelector("#startScn");
var pName = document.querySelector("#playerInitials");
var startBtn = document.querySelector("#startBtn");
var highScoresBtn = document.querySelector("#highScoresBtn");

//question screen
var currentQuestion = document.querySelector("#currentQuestion");
var answers = document.querySelector("#answers");
var results = document.querySelector('#results')
var resultsWikiInfo = document.querySelector('#resultsWiki')
var casualScn = document.querySelector("#casualScn");
var nextBtn = document.querySelector("#nextBtn");
var wikiSite = document.querySelector("#wikiSite");


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
var HighScoreLabel = document.querySelector("#highScoreValues")
var highScores = [];

var correctchoice;

function initialize() {
    //loadScores();
    currentIndex = 1;
    startScn.style.display = "block";
    casualScn.style.display = "none";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
    counterOfCorrectAnswer = 0;
    counterOfNotCorrectAnswer = 0;
    answerValue;
    answerInformation;
    currentIndex = 0;
    resultPerc;
}

function getNextQuestion() {
    resultsWikiInfo.innerHTML = '';
    nextBtn.disabled = true;
    var api = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";
    $.ajax({
        url: api,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (t) {
            // Log the resulting object
            var reponse = t.results[0];
            var incorrectAnswer = reponse.incorrect_answers;
            var question = reponse.question;
            var answer = reponse.correct_answer;
            correctchoice = JSON.stringify(answer);
            var choice1 = JSON.stringify(incorrectAnswer[0]);
            var choice2 = JSON.stringify(incorrectAnswer[1]);
            var choice3 = JSON.stringify(incorrectAnswer[2]);
            document.querySelector('#currentQuestion').innerHTML = 'Q' + currentIndex + ': ' + question;
            answerValue = Math.floor((Math.random() * 4) + 1);
            var choice1Done = 0;
            for (var i = 1; i < 5; i++) {
                if (i === answerValue) {
                    document.querySelector('#choice' + i).nextElementSibling.textContent = correctchoice;
                } else {
                    if (choice1Done === 0) {
                        choice1Done = 1;
                        document.querySelector('#choice' + i).nextElementSibling.textContent = choice1;
                    } else {
                        if (choice1Done === 1) {
                            choice1Done = 2;
                            document.querySelector('#choice' + i).nextElementSibling.textContent = choice2;
                        } else {
                            if (choice1Done === 2) {
                                choice1Done = 3;
                                document.querySelector('#choice' + i).nextElementSibling.textContent = choice3;
                            }
                        }
                    }
                }
            }
            for (var i = 1; i < 5; i++) {
                document.getElementById('choice' + i).disabled = false;
                document.getElementById('choice' + i).checked = false;
            }
        });
}

function startAction() {
    wikiSite.innerHTML = '';
    results.innerHTML = '';
    resultsWikiInfo.innerHTML = '';
    startScn.style.display = "none";
    casualScn.style.display = "block";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
    getNextQuestion();
    currentIndex = 1;
}

$("#submitPlayerInitials").on("click", function () {
    if (pName.value === '')
        alert('Please enter your name !')
    else {
        countOFPlayers++;
        var nameOfPlayer = pName.value;
        var scoreObj = {
            name: nameOfPlayer,
            score: resultPerc
        };
        localStorage.setItem("player" + countOFPlayers, JSON.stringify(scoreObj));
        startScn.style.display = "none";
        casualScn.style.display = "none";
        victoryScn.style.display = "none";
        defeatScn.style.display = "none";
        highScoreScn.style.display = "block";
        HighScoreLabel.innerHTML = getScores();
    }
});

$("#highScoresBtn").on("click", function () {
    previewHighScore();
});

$("#highScoresVSBtn").on("click", function () {
    previewHighScore();
});

$("#highScoresDSBtn").on("click", function () {
    previewHighScore();
});

function getScores() {
    var array = getScoresArray();
    var text = '';
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            text = text.concat('Player : ' + array[i].name + ' Score ' + array[i].score + ' |');
        }
    } else {
        text = "No Scores yet  , Lets be the first One";
    }
    return text;
}

function getScoresArray() {
    var array = [];
    for (var c = 1; c <= countOFPlayers; c++) {
        var obj = JSON.parse(localStorage.getItem("player" + c));
        array.push(obj);
    }
    return array;
}

function previewHighScore() {
    var array = getScoresArray();
    var text = '';
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            text = text.concat('Player: ' + array[i].name + ' Score: ' + array[i].score);
        }
    } else {
        text = "No Scores yet, Let's be the first one";
    }
    startScn.style.display = "none";
    casualScn.style.display = "none";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "block";
}

$("#startBtn").on("click", function () {
    startAction();
});

$("#playAgainVSBtn").on("click", function () {
    initialize();
});

$("#playAgainDSBtn").on("click", function () {
    initialize();
});
$("#backBtn").on("click", function () {
    initialize();
});

$("#nextBtn").on("click", function () {
    if (currentIndex < 10) {
        wikiSite.innerHTML = '';
        results.innerHTML = '';
        getNextQuestion();
        currentIndex++;
    }
    else {
        resultPerc = 100 - (counterOfNotCorrectAnswer * 10);
        score.innerHTML = 'The test is finished and you scored a ' + resultPerc + '%. You got ' + counterOfCorrectAnswer + ' correct and ' + counterOfNotCorrectAnswer + ' incorrect.';
        score.style.color = "black";
        if (resultPerc == 0) {
            casualScn.style.display = "none";
            victoryScn.style.display = "none";
            highScoreScn.style.display = "none";
            defeatScn.style.display = "block";
        } else {
            var playerOldScore = getScoresArray();
            var lastHighScore = 0;
            for (var i = 0; i < playerOldScore.length; i++) {
                if (playerOldScore[i].score > lastHighScore) {
                    lastHighScore = playerOldScore[i].score;
                }
            }
            if (resultPerc >= lastHighScore) {
                casualScn.style.display = "none";
                victoryScn.style.display = "block";
                highScoreScn.style.display = "none";
                defeatScn.style.display = "none";
            } else {

                casualScn.style.display = "none";
                victoryScn.style.display = "none";
                highScoreScn.style.display = "none";
                defeatScn.style.display = "block";
            }
        }
    }
    resultsWikiInfo.innerHTML = '';
});

// select choice event
$("#choice1").on("click", function () {
    checkAnswer(1);
});
$("#choice2").on("click", function () {
    checkAnswer(2);
});
$("#choice3").on("click", function () {
    checkAnswer(3);
});
$("#choice4").on("click", function () {
    checkAnswer(4);
});

function checkAnswer(selectedAnswer) {
    for (var i = 1; i < 5; i++) {
        document.getElementById('choice' + i).disabled = true;
    }
    answerStatus = '';
    answerInformation = '';
    var color = '';
    if (answerValue === selectedAnswer) {
        answerStatus = "Correct  answer";
        counterOfCorrectAnswer++;
        color = 'green';
    }
    else {
        answerStatus = "Wrong Answer ! ";
        counterOfNotCorrectAnswer++;
        color = 'red';
    }
    getwikiInfo(JSON.parse(correctchoice));
    results.innerHTML = answerStatus;
    results.style.color = color;
    nextBtn.disabled = false;
}

function getwikiInfo(correctAnswer) {
    var queryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exsentences=3&explaintext&redirects=1&titles=" + correctAnswer;
    var encodedUrl = encodeURIComponent(queryUrl);
    console.log(queryUrl);
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: 'https://corsbridge2.herokuapp.com/' + encodedUrl,
        success: function (data) {
            console.log(data);
            var returnedLink = data.query.pages;
            console.log(returnedLink);
            var returnedKeys = Object.keys(returnedLink)[0];
            console.log(returnedLink[returnedKeys].extract);
            var extractedText = returnedLink[returnedKeys].extract;
            resultsWikiInfo.innerHTML = 'correct Answer Is  :  ' + correctAnswer + '>>> ' + extractedText;
        }
    });
        var siteLink = "https://en.wikipedia.org/wiki/" + correctAnswer;
       console.log(siteLink);
        wikiSite.setAttribute("href", siteLink);
        wikiSite.innerHTML = siteLink

}
