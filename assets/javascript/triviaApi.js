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

GetTriviaQuestions();