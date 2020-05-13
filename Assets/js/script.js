$(document).ready(function() {
    initialize();
});
//member variables

var counterOfCorrectAnswer =0;
var counterOfNotCorrectAnswer =0;
 var answerValue;
var answerInformation;
var currentIndex=0;
var resultPerc;
var arrayOfScoresObj=new Array();









//start screen
var startScn = document.querySelector("#startScn");
var pName =document.querySelector("#playerInitials");
var submitBtn =document.querySelector("#submitPlayerInitials");

var HighScoreSec =document.querySelector("#HighScoreSec");
var HighScoreLabel =document.querySelector("#highScoreValues");
var highScoresDSBtn =document.querySelector("#highScoresDSBtn");

var startBtn = document.querySelector("#startBtn");
var highScoresBtn = document.querySelector("#highScoresBtn");

//question screen
var currentQuestion = document.querySelector("#currentQuestion");
var answers = document.querySelector("#answers");

var results =document.querySelector('#results')
var resultsWekiInfo =document.querySelector('#resultsWiki')
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
var countOFPlayers=0;





var correctchoice

function initialize() {
    //loadScores();
    currentIndex = 1;
 // startScn.style.display = "block";
     casualScn.style.display = "none";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
      counterOfCorrectAnswer =0;
      counterOfNotCorrectAnswer =0;
      answerValue;
      answerInformation;
      currentIndex=0;
      resultPerc;
    HighScoreSec.style.display = "none";
    HighScoreLabel.style.display = "none";

}



function getNextQuestion(){
    resultsWekiInfo.innerHTML='';
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

function startAction(){
    resultsWekiInfo.innerHTML='';
    casualScn.style.display = "block";
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    highScoreScn.style.display = "none";
    $("#nextBtn").show();
    $("#currentQuestion").show();
    $("#answers").show();
    getNextQuestion();
    currentIndex=1;
    HighScoreSec.style.display = "none";
    HighScoreLabel.style.display = "none";
}

/*function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    console.log(keys);
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}*/



$("#submitPlayerInitials").on("click", function () {
    if( pName.value==='')
        alert('Please enter your name !')
    else {
        countOFPlayers++;
        var nameOfPlayer = pName.value;
        var scoreObj = {
            name: nameOfPlayer,
            score: resultPerc
        };

        // updated
        localStorage.setItem("player" + countOFPlayers, JSON.stringify(scoreObj));
        // alert('Successfully adding your score')
        HighScoreSec.style.display = "";
        HighScoreLabel.style.display = "";
        highScoresDSBtn.style.display = "none";
        defeatScn.style.display = "none";
        victoryScn.style.display = "none";
        HighScoreLabel.innerHTML = getScores();

    }

});


$("#highScoresVSBtn").on("click", function () {
    perviewHighScore();
});


$("#highScoresBtn").on("click", function () {
    perviewHighScore();
});



$("#highScoresDSBtn").on("click", function () {
    perviewHighScore();
});

function getScores(){
    var array=getScoresArray();
    var text='';
    if(array.length>0) {
        for(var i=0; i< array.length; i++){
            text=text.concat( 'Player : '+array[i].name  +' Score '+  array[i].score +' |') ;
        }
    }

    else text = "No Scores yet  , Lets be the first One";

 return text;

}

//  get  all  scores  from local  storage
function getScoresArray(){
    var array=[];
    for(var c=1; c<=countOFPlayers;c++){
        var obj=JSON.parse(localStorage.getItem("player"+c));
        array.push(obj);
    }
    return array;

}

// updated
function perviewHighScore(){
    var array=getScoresArray();
    var text='';
       if(array.length>0) {
        for(var i=0; i< array.length; i++){
            text=text.concat( 'Player : '+array[i].name  +' Score '+  array[i].score +' |') ;
        }

    }

    else text = "No Scores yet  , Lets be the first One";

    // alert(text);
    victoryScn.style.display = "none";
    defeatScn.style.display = "none";
    HighScoreSec.style.display = "";
    HighScoreLabel.style.display = "";

}






$("#startBtn").on("click", function () {
    startScn.style.display = "none";
    resultsWekiInfo.innerHTML='';
    startAction();
    HighScoreSec.style.display = "none";
    HighScoreLabel.style.display = "none";
});

$("#playAgainVSBtn").on("click", function () {
    initialize()
    results.innerHTML ="";
    startScn.style.display = "";
    $("#currentQuestion").show();
    $("#answers").show();
  //  startAction();
});

$("#playAgainDSBtn").on("click", function () {
    results.innerHTML ="";
    startScn.style.display = "";
    initialize()
    $("#currentQuestion").show();
    $("#answers").show();
   // startAction();
});


$("#playAgainFromHighScore").on("click", function () {
    results.innerHTML ="";
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
        $("#currentQuestion").hide();
        $("#answers").hide();
        $("#nextBtn").hide();
        $("#startBtn").show();



            resultPerc= 100 -(counterOfNotCorrectAnswer*20);
           results.innerHTML = 'Test is finished  your  result is  ' + resultPerc + ' %  >>>  '+counterOfCorrectAnswer  +' correct answers  and '+counterOfNotCorrectAnswer+' no correct answer' ;
           results.style.color = "black";
           // update
           if (resultPerc === 0) {
               defeatScn.style.display = "contents";
           }
           else {
               var playerOldScore = getScoresArray();
               var lastHighScore = 0;
               for(var i=0; i< playerOldScore.length ; i++ ){
                   if(playerOldScore[i].score>lastHighScore){
                       lastHighScore=playerOldScore[i].score;
                   }
               }

               if (resultPerc >= lastHighScore) {

                   victoryScn.style.display = "contents";
               }
               else {

                   defeatScn.style.display = "contents";
               }

           }
    }


    resultsWekiInfo.innerHTML='';
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




function checkAnswer(selectedAnswer){

    for (var i = 1; i < 5; i++) {
        document.getElementById('choice' + i).disabled =true;
    }
    answerStatus='';
    answerInformation='';
    var color='';
    if(answerValue===selectedAnswer) {
        answerStatus = "Correct  answer";
        counterOfCorrectAnswer++;
        color='green'
    }
    else {
        answerStatus = "Wrong Answer ! ";
        counterOfNotCorrectAnswer++;
        color='red'

    }
      getWekiInfo(correctchoice);
    results.innerHTML =answerStatus;
    results.style.color = color;
    nextBtn.disabled = false;
}


function getWekiInfo(correctAnswer){
    var wekiInfo='';
    var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + correctAnswer;

    $.ajax( {
        url: api,
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
            action: "query",
            list: "search",
            srsearch: "javascript",
            format: "json"
        },
        xhrFields: { withCredentials: true },
        success: function(response) {
            var jsonResponseArr=response.query.pages;
            var jsonResponseStr=JSON.stringify(jsonResponseArr)
            var res = jsonResponseStr.split(",");
            if(res!=null) {
                //  var wekiInfoRsp = res[3] == undefined ? '' : res[3] + ',' + res[4] == undefined ? '' : res[4] + ',' + res[5] == undefined ? '' : res[5] + ',' + res[6] == undefined ? '' : res[6];
                var wekiResp =  res[3] + ',' + res[4] + ',' + res[5]+ ',' + res[6];
                console.log(wekiResp);
                wekiInfo = wekiResp.replace('"extract"',' ');
            }
            else {
                wekiInfo='No Data Found from weki';
            }

            resultsWekiInfo.innerHTML='correct Answer Is  :  '+correctAnswer + '>>> '+wekiInfo

        },

        error: function(response) {
            wekiInfo='No Data Found from weki';
            resultsWekiInfo.innerHTML=wekiInfo

        }

    });

}





