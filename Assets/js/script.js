//start screen
var startScn = document.querySelector("#startScn");
var startBtn = document.querySelector("#startBtn");
var highScoresBtn = document.querySelector("#highScoresBtn");

//question screen
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



initialize();
function initialize() {
    //loadScores();
    currentIndex = 0;
    startScn.style.display = "block";
    casualScn.style.display = "none";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
}

$("#startBtn").on("click", function () {
    startScn.style.display = "none";
    casualScn.style.display = "block";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";

    if (currentIndex > 0) {
        $("#nextBt").show();
    }
    if (currentIndex < 6) {
        $("#answers").show();
        document.getElementById('results').innerHTML = '';
    }
})
    for (var i = 1; i < 4; i++) {
        document.getElementById('choice' + i).disabled = false;
        document.getElementById('choice' + i).checked = false;
    }
    // var queryUrl = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow";
    // var encodedUrl = encodeURIComponent(queryUrl);
    // $.ajax({
    //     type: 'GET',
    //     contentType: 'application/json',
    //     url: 'https://corsbridge2.herokuapp.com/' + encodedUrl,
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });






    $("#answers").on("click", function () {
        checkAnswer();
        console.log("Hello")
    })

    function getNextQuestion() {
        resultsWekiInfo.innerHTML = '';
        nextBtn.disabled = true;
        var api = "https://opentdb.com/api.php?amount=1&category=21&difficulty=medium&type=multiple";
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
                correctchoice = answer;
                var choice1 = incorrectAnswer[0];
                var choice2 = incorrectAnswer[1];
                var choice3 = incorrectAnswer[2];
                document.querySelector('#currentQuestion').innerHTML = 'Q' + currentIndex + ': ' + question;
                answerValue = Math.floor((Math.random() * 4) + 1);
                var choice1Done = 0;
                for (var i = 1; i < 5; i++) {
                    if (i === answerValue) {
                        document.querySelector('#choice' + i).nextElementSibling.textContent = correctchoice;
                    }
                    else {
                        if (choice1Done === 0) {
                            choice1Done = 1;
                            document.querySelector('#choice' + i).nextElementSibling.textContent = choice1;
                        }
                        else {
                            if (choice1Done === 1) {
                                choice1Done = 2;
                                document.querySelector('#choice' + i).nextElementSibling.textContent = choice2;
                            }
                            else {
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

    function checkAnswer(selectedAnswer) {

        var counterOfCorrectAnswer = 0;
        var answerValue;
        var answerInformation;


        results = '';
        answerInformation = '';
        if (answerValue === selectedAnswer) {
            results = "correct  answer";
            answerInformation = "correct answer congrats ";
            counterOfCorrectAnswer++;
        }
        else {
            answerStatus = "not correct answer";
            answerInformation = "not correct answer sorry ";
            // getWekiInfo(answerStr);
        }
        document.querySelector("#choice1")
        document.querySelector("#choice2")
        document.querySelector("#choice3")
        document.querySelector("#choice4")

    }

    
    

// document.createElement and use that element 


// for loop creating a list with those questions and placing that into the array