/**
 * remaining time counter for each question. The time span for ecah question is 5 sec.
 */
const qaList = [
    {Q: 'Q1',
     A: 'A1'}, 
    {Q: 'Q2', 
     A: 'A2'}, 
    {Q: 'Q3',
     A: 'A3'}
]

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
