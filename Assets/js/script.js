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
var nameInput = document.querySelector("#nameInput").value;
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

initialize();
function initialize(){
    loadScores();
    currentIndex = 0;
    timeLeft = 60;
    // startScn.style.display = "block";
    // questionScn.style.display = "none";
    // victoryScn.style.display = "none";
    // defeatScn.style.display = "none";
    // highScoreScn.style.display = "none";
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

$("#startBtn").on("click", function(){
    startTimer();
})