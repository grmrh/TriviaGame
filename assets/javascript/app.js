
function getTriviaQuestions() {
    var option={
        url: 'https://opentdb.com/api.php?amount=10&category=22&type=multiple', 
        method: 'GET'
    }
    var list = [];
    $.ajax(option)
        .then(function(response) {
            console.log(response);
            if (response.results) {
               trivia.triviaList = [];
               //console.log(trivia.triviaList)
               response.results.forEach(item =>list.push({
                   Q: item.question,                   
                   C: (function() {
                        var index = Math.floor(Math.random()*(item.incorrect_answers.length));
                        var collection = item.incorrect_answers;    
                        collection.splice(index, 0, item.correct_answer);
                        return collection;
                   })(), 
                   A: item.correct_answer,
                   N: index-1
                 }));
            }
            console.log("list" + list);
     });
};

function trivia() {
    var self = this;
   function randomQA () {
        var index = Math.floor(Math.random()*(self.triviaList.length));
        console.log(index);
        console.log(self.triviaList[index]);
        self.triviaQA.Q = self.triviaList[index].Q;
        self.triviaQA.A = self.triviaList[index].A;
        self.triviaQA.C = self.triviaList[index].C.slice(0);
        self.triviaQA.N = index;
    }
    this.triviaList = [
        {Q: 'What is the official language of Greenland?',
        C: ['English','Hindi', 'Greenlandic', 'Portuguese' ],
        A: 'Greenlandic',
        N: 2}, 
        {Q: 'If you were in the city of Turin, what country would you be in?', 
        C: ['USA', 'Russia', 'Scotland', 'Italy'], 
        A: 'Italy',
        N: 3}, 
        {Q: "What is the capital city of Canada's Yukon territory?",
        C: ['Winnepeg', 'Whitehorse','District of British Columbia', 'Edmonton' ], 
        A: 'Whitehorse', 
        N: 1},
        {Q: 'Macau is an autonomous territory belonging to which country?',
        C: ['China', 'USA', 'Japan', 'Cambodia'],
        A: 'China', 
        N: 0},
        {Q: 'What are the colors that appear on the flag of France?',
        C: ['Blue, white & red', 'Black, blue & white', 'Green, blue & whilte', 'Red, blue and white'],
        A: 'Blue, white & red', 
        N: 0 }, 
        {Q: 'Which sea separates the East African coast and the Saudi Arabian peninsula?',
        C: ['Yellow sea', 'Black sea', 'Blue sea', 'Red sea'],
        A: 'Red sea', 
        N: 3}];
    this.triviaQA = {Q: "",
                     C: [],
                     A: "",
                     N: 0};

    //getTriviaQuestions();
    //randomQA();
}

const numberOfQ = 6;
const qTimer = 5000;
const tTimer = 1000;
const tSpan = qTimer/tTimer;
var qCounter = 0;
var tickerCounter = tSpan;
var correctCount=0; 
var notCorrectCount=0;
var notAnsweredCount=0;
var timeoutId;
var tickerId;

tickerId = setInterval(tickerTimer, tTimer);

function displayQA(qa) {
    // display question
    $(".card-body.answer").empty();
    if (typeof qa != "undefined") {
        $(".card-header").html("<Strong>Question " + qCounter+ "</strong>");
        $(".card-title").text(qa.Q);
        $("#optA0").next().text(qa.C[0]);
        $("#optA1").next().text(qa.C[1]);
        $("#optA2").next().text(qa.C[2]);
        $("#optA3").next().text(qa.C[3]);
        // start ticking
        $(".card-body.qa").show();
        //tickerId = setInterval(tickerTimer, tTimer);
    }
    else {
        clearTimeout(timeoutId);
        clearInterval(tickerId); 
    }
}

function emptyQA() {
    $(".card-title").empty();
    $("#optA0").next().empty();
    $("#optA1").next().empty();
    $("#optA2").next().empty();
    $("#optA3").next().empty();
    $("input[type=radio]").attr("checked", false);
    $("input:radio").prop("checked", false);
    $("input:checked").empty();
}

function CheckAnswer(qa, answerChecked) {

    console.log("qa.N:" + qa.N);

    emptyQA();
    $(".card-body.qa").hide();

    $(".card-body.answer").empty();
    if (answerChecked == qa.N) {
        correctCount++;
        $(".card-body.answer").html("<h1><strong>You got that right!</strong></h1>");
    }
    else if (answerChecked != qa.N){
        notCorrectCount++;
        $(".card-body.answer").html("<h1><strong>Well... Next time...</strong></h1>" + 
                                "<h1><strong>Correct Answer is " + qa.A + ".</strong></h1>");
    }
    else {
        notAnsweredCount++;
        $(".card-body.answer").html("<h1><strong>Timed out...</strong></h1>");
    }
    $(".card-body.answer").show();

    // console.log(correctCount);
    // console.log(notCorrectCount);
    // console.log(notAnsweredCount);
    if (numberOfQ == qCounter) {

        clearTimeout(timeoutId);
        clearInterval(tickerId); 

        notAnsweredCount = numberOfQ - correctCount - notCorrectCount;
        $(".card-body.answer").empty();
        $(".card-body.answer").html("<h1><strong>Correct answers: " + correctCount + "</strong></h1>" + 
                                    "<h1><strong>Wrong answers: " + notCorrectCount + "</strong></h1>" + 
                                    "<h1><strong>Not answered: " + notAnsweredCount + "</strong></h1>");
        $(".card-body.answer").show().focus();
    }
}

$("input").on("click", function() {

    if (qCounter <= numberOfQ) {
        answerChecked = $("input:checked").val();
        console.log("answer checked " + answerChecked);

        // clear ticking
        //clearInterval(tickerId); 

        // display answer
        CheckAnswer(trivia.triviaList[qCounter-1], answerChecked);
    }   
});


function tickerTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    //document.getElementById(".remaining-time").innerHTML = t;
    tickerCounter--;
    $(".time-left").text(tickerCounter);

    if (tickerCounter <= 0) {
       console.log("Timed out");
       notAnsweredCount++;
       if (qCounter <= numberOfQ){
        tickerCounter = tSpan;
       }
    }
    //console.log("log k inside tickerTimer() " + tickerCounter);
}
    
function nextQ() {
    qCounter++;
    tickerCounter = tSpan;

    if (qCounter > numberOfQ){       
        clearTimeout(timeoutId);
        clearInterval(tickerId); 
    }

    displayQA(trivia.triviaList[qCounter-1]);

    // document.getElementById("demo2").innerHTML = t;
    if (qCounter <= numberOfQ) {
        //recursive call for accuracy
        timeoutId = setTimeout(nextQ, qTimer);
    }
    else {
        clearTimeout(timeoutId);
        clearInterval(tickerId); 
    }
}
    
var trivia = new trivia();
console.log("triviaQA: " + trivia.triviaList);

setTimeout(nextQ, 0);
