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
    // for (var i = 1; i < 4; i++) {
    //     document.getElementById('choice' + i).disabled = false;
    //     document.getElementById('choice' + i).checked = false;
    // }


    var choice1Done = 0;
    var api = "https://opentdb.com/api.php?amount=1&category=21&difficulty=medium&type=multiple";
    $.ajax({
        url: api,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (t) {
            // Log the resulting object
            console.log(t)

            var reponse = t.results[0];
            var incorrectAnswer = reponse.incorrect_answers;
            var question = reponse.question;
            var answer = reponse.correct_answer;           
            var choice1 = incorrectAnswer[0];
            var correctchoice = answer;
            var choice2 = incorrectAnswer[1];
            var choice3 = incorrectAnswer[2];
            document.querySelector('#currentQuestion').innerHTML = 'Q' + currentIndex + ': ' + question;
            answerValue = Math.floor((Math.random() * 4) + 1);

            for (var i = 1; i < 4; i++) {
                if (i === answerValue) {
                    document.querySelector('#choice' + i).nextElementSibling.textContent = correctchoice;
                }

                else {
                    if (choice1Done == 0) {
                        choice1Done = 1;
                        document.querySelector('#choice' + i).nextElementSibling.textContent = choice1;
                    }
                    else {
                        if (choice1Done == 1) {
                            choice1Done = 2;
                            document.querySelector('#choice' + i).nextElementSibling.textContent = choice2;
                        }
                        else {
                            if (choice1Done == 2) {
                                choice1Done = 3;
                                document.querySelector('#choice' + i).nextElementSibling.textContent = choice3;
                            }
                            // else {
                            //     if (choice1Done == 3) {
                            //         document.querySelector('#choice' + i).nextElementSibling.textContent = choice4;
                            //     }
                            // }
                        }

                    }
                }
            }
            currentIndex++;
        });
});



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
$("#answers").on("click", function () {
    checkAnswer();
    console.log("Hello")
})


// function getRandomInt() {
//     min = Math.ceil(1);
//     max = Math.floor(3);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }



// document.createElement and use that element 


// for loop creating a list with those questions and placing that into the array