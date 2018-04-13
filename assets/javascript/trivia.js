/**
 * remaining time counter for each question. The time span for ecah question is 5 sec.
 */
function trivia() {

    var randomQA = function () {
        var index = Math.floor(Math.random()*(this.triviaList.length));
        this.getQA.Question = this.triviaList[index].Q;
        this.getQA.Answer = this.trivialList[index].A;
    };
    this.triviaList = [
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
        A: 3}];
    
    this.getQ = function () {
                        var index = Math.floor(Math.random()*(this.triviaList.length));
                        this.getIndexA = this.triviaList[index].Q;
                        return this.triviaList[index].Q;
                    };
    this.getQA = randomQA();
}

function getTriviaQuestions() {
    var option={
        url: 'https://opentdb.com/api.php?amount=10&category=22&type=multiple', 
        method: 'GET'
    }

    $.ajax(option)
        .then(function(response) {
            console.log(response);
            if (response) {
               trivia.triviaList = [];
               response.forEach(item =>trivia.triviaList.push({
                   Q: item.question,
                   A: item.answer,
                   C: ''
                     }));
            }
     });
}

const numberOfQ = 3;
const qTimer = 5000;
const tTimer = 1000;
const tSpan = qTimer/tTimer;
var qCounter = 0;
var tickerCounter = tSpan;
var askQuestion; 
var askNextQuestion;
var tickerId;

//var tickerId = setInterval(tickerTimer, tTimer);

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

function displayQ() {
    // display question
    $(".card-title").text(trivia.getQ());
    // start ticking
    return setInterval(tickerTimer, tTimer);
}

// respond checking on an answer
// $("input").on("click", function() {
//     answerChecked = $("input:checked").val();
// });

function getAnswer() {
    var answerChecked = null;
    $("input").on("click", function() {
            answerChecked = $("input:checked").val();
         // clear ticking
            clearInterval(tickerId); 
    });
    return answerChecked;
}

function runTrivia() {
    //1. display question. Ticker starts
        var tickerId;
        tickerId = displayQ();
    //2. get answer. Ticker ends. Implement click on radio button function. 
        var answer = getAnswer();
    //3. display result
        if (answer) {
            displayRightOrWrong();
        }
            displayTimesUp();
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

        // var qa = new questionAnswer();
        // qa.displayQuestion($(".question"), qCounter-1);

        runTrivia();

        // document.getElementById("demo2").innerHTML = t;
        if (qCounter < numberOfQ) {
            setTimeout(nextQ, qTimer);
        }
        else {
            clearInterval(tickerId);
        }
    }
    
   
    
    console.log("log k " + tickerCounter);
    var trivia = new trivia();
    getTriviaQuestions();
    setTimeout(nextQ, qTimer);
