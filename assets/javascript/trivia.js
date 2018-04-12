/**
 * remaining time counter for each question. The time span for ecah question is 5 sec.
 */
const qaList = [
    {Q: 'What is the official language of Greenland?',
     C: ['English','Hindi', 'Greenlandic', 'Portuguese' ],
     A: 2}, 
    {Q: 'If you were in the city of Turin, what country would you be in?', 
     C: ['USA', 'Russia', 'Scotland', 'Italy'], 
     A: 3}, 
    {Q: "What is the capital city of Canada's Yukon territory?",
     C: ['Winnepeg', 'Whitehorse','District of British Columbia', 'Edmonton' ], 
     A: 1},
     {Q: 'Macau is an autonomous territory belonging to which country?',
      C: ['China', 'USA', 'Japan', 'Cambodia'],
     A: 0},
     {Q: 'What are the colors that appear on the flag of France?',
      C: ['Blue, white & red', 'Black, blue & white', 'Green, blue & whilte', 'Red, blue and white'],
     A: 0 }, 
     {Q: 'Which sea separates the East African coast and the Saudi Arabian peninsula?',
     C: ['Yellow sea', 'Black sea', 'Blue sea', 'Red sea'],
     A: 3}
]

function GetTriviaQuestions() {
    var option={
        url: 'https://opentdb.com/api.php?amount=10&category=22&type=multiple', 
        method: 'GET'
    }

    $.ajax(option)
        .then(function(response) {
            console.log(response);
        })
}

const numberOfQ = 3;
const qTimer = 5000;
const tTimer = 1000;
const tSpan = qTimer/tTimer;
var qCounter = 0;
var tickerCounter = tSpan;
var askQuestion; 
var askNextQuestion;

var tickerId = setInterval(tickerTimer, tTimer);

function questionAnswer() {
    this.displayQuestion = function($place, index) {
        var question = qaList[index].Q;
        $place.text(question);
    };
    this.timerCounter = qTimer/1000;
    this.nextQuestion = function() {
        displayQuestion();
        displayAnswerChoices();
        askQuestion = setTimeout(this.nextQuestion, qTimer);
    }
    this.startQ = function() {
        
        askQuestion = setTimeout(this.nextQuestion, qTimer);
    };
    this.stopQ = function() {
        clearTimeout(askQuestion);
    };
    this.startTimer = function() {
        return setInterval(this.decrement, 1000);
    }
    this.stopTimer = function() {
        clearInterval(this.startTimer);
    }
    this.decrement = function() {
        return this.timerCounter--;
    }
    this.displayTimeCounter = function($counterPlacce, counter) {
        $counterPlacce.text(counter);
    }
}

    function tickerTimer() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        //document.getElementById(".remaining-time").innerHTML = t;
        tickerCounter--;
        $(".time-left").text(tickerCounter);
        console.log("log k inside tickerTimer() " + tickerCounter);
    }
    
    function nextQ() {
        qCounter++;
        tickerCounter = tSpan;
        console.log("log i inside next() " + qCounter);
        console.log("log k inside next() " + tickerCounter);

        var qa = new questionAnswer();
        qa.displayQuestion($(".question"), qCounter-1);
        // document.getElementById("demo2").innerHTML = t;
        if (qCounter < numberOfQ) {
            setTimeout(nextQ, qTimer);
        }
        else {
            clearInterval(tickerId);
        }
    }
    
   
    
    console.log("log k " + tickerCounter);
    setTimeout(nextQ, qTimer);
