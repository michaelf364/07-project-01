$(document).ready(function () {
    initialize();
});
//member variables
var counterOfCorrectAnswer = 0;
var counterOfNotCorrectAnswer = 0;
var answerValue;
var answerInformation;
var currentIndex = 0;
var resultPerc;
var arrayOfScoresObj = [];

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
    resultsWikiInfo.innerHTML = '';
    casualScn.style.display = "block";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
    $("#nextBtn").show();
    $("#currentQuestion").show();
    $("#answers").show();
    getNextQuestion();
    currentIndex = 1;
}
$("#submitPlayerInitials").on("click", function () {
  
    if( pName.value==='')
        alert('Please enter your name !')
    else {
        ;
        var nameOfPlayer = pName.value;
        var scoreObj = {
            name: nameOfPlayer,
            score: resultPerc
        };
        localStorage.setItem("player", JSON.stringify(scoreObj));
        alert('Successfully adding your score');
    }
})

$("#highScoresVSBtn").on("click", function () {
    previewHighScore();
});
$("#highScoresBtn").on("click", function () {
    previewHighScore();
});
$("#highScoresDSBtn").on("click", function () {
    previewHighScore();
});

function previewHighScore(){
    var tempScores = JSON.parse(localStorage.getItem("player"));
    if (tempScores !== null) {
        highScores = tempScores;
        alert(JSON.stringify(highScores));
    }
}

$("#startBtn").on("click", function () {
    startScn.style.display = "none";
    resultsWikiInfo.innerHTML = '';
    startAction();
});

$("#playAgainVSBtn").on("click", function () {
    initialize()
    results.innerHTML = "";
    startScn.style.display = "";
    $("#currentQuestion").show();
    $("#answers").show();
    //  startAction();
});

$("#playAgainDSBtn").on("click", function () {
    results.innerHTML = "";
    startScn.style.display = "";
    initialize()
    $("#currentQuestion").show();
    $("#answers").show();
    // startAction();
});

$("#nextBtn").on("click", function () {
    if (currentIndex < 5) {
        $("#answers").show();
        results.innerHTML = '';
        getNextQuestion();
        currentIndex++;
    }
    else {
        casualScn.style.display = "none";
        victoryScn.style.display = "block";
        highScoreScn.style.display = "none";
        defeatScn.style.display = "none";
        $("#currentQuestion").hide();
        $("#answers").hide();
        $("#nextBtn").hide();
        $("#startBtn").show();
        resultPerc = 100 - (counterOfNotCorrectAnswer * 20);
        score.innerHTML = 'The test is finished and you scored a ' + resultPerc + '%. You got '+counterOfCorrectAnswer  +' correct and '+counterOfNotCorrectAnswer+' incorrect.' ;
        score.style.color = "black";
          if(resultPerc>=50)
          victoryScn.style.display ="contents";
            else
            victoryScn.style.display ="contents";
        // defeatScn
 }
 resultsWikiInfo.innerHTML='';
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
    getwikiInfo(correctchoice);
    results.innerHTML = answerStatus;
    results.style.color = color;
    nextBtn.disabled = false;
}
function getwikiInfo(correctAnswer) {
    var queryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + correctAnswer;
    var encodedUrl = encodeURIComponent(queryUrl);
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: 'https://corsbridge2.herokuapp.com/' + encodedUrl,
        success: function (data) {
            console.log(data);
            var returnedLink = data.query.pages;
            var returnedKeys = Object.keys(returnedLink)[0];
            console.log(returnedLink[returnedKeys].extract);
            var extractedText = returnedLink[returnedKeys].extract;
            resultsWikiInfo.innerHTML = 'correct Answer Is  :  ' + correctAnswer + '>>> ' + extractedText;
        }
    });
}
