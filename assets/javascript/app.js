/**
 * remaining time counter for each question. The time span for ecah question is 5 sec.
 */
const qaList = [
    {Q1: 'Q1',
     A1: 'A1'}, 
    {Q2: 'Q2', 
     A2: 'A2'}, 
    {Q3: 'Q3',
     A3: 'A3'}
]

const timeSpanForEachQuestion = 5000;
const tickerInterval = 1000;
var ticker = timeSpanForEachQuestion;
var questionNumber = 0;
var askQuestion; 
var askNextQuestion;

function remainingTimeCounter() {
    ticker = ticker - tickerInterval;
    displayRemainingTime(ticker);
}

function displayRemainingTime(t) {
    console.log("remaining time: " + t);
    $(".remaining-time").text(t);
}

function displayTriviaStat() {
    console.log("trivia stat");
}

function displayQuestion(qNumber) {
    console.log("question number: " + qNumber);
}

function displayAnswerChoices(qNumber) {
    console.log("answer number: " + qNumber);
}

function nextQuestion() {
    
    ticker = timeSpanForEachQuestion;

    questionNumber++;

    if (questionNumber >= qaList.length) {
        clearTimeout(askNextQuestion);       
    }

    askNextQuestion = setTimeout(function() {
        console.log(questionNumber);
        displayQuestion(questionNumber)
        displayAnswerChoices(questionNumber);
        // display ticker
        ticker = timeSpanForEachQuestion;
        setInterval(remainingTimeCounter, tickerInterval);
    }, timeSpanForEachQuestion);

    
    
}


$(document).ready(function() {

    displayRemainingTime(timeSpanForEachQuestion);
    // reset the remainingTimeCounter
    
    askQuestion = setInterval(nextQuestion, timeSpanForEachQuestion);
    displayTriviaStat();
});