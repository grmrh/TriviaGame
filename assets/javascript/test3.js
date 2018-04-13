//https://stackoverflow.com/questions/42763096/concurrent-actions-with-setinterval-and-settimeout

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

var i,
    myVar = setInterval(myTimer, 1000);

for (i = 0; i < 100; i++) {
    setTimeout(function (i) {
        return function() {
            console.log("log " + i);
        };
    }(i), 3000 * i);
}

// goot site for setTimeout https://www.sitepoint.com/jquery-settimeout-function-examples/
// radon number stuff
function greet(greeting){
    console.log(greeting);
  }
  
  function getRandom(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }
  
  var greetings = ["Hello", "Bonjour", "Guten Tag"],
      randomGreeting = getRandom(greetings);
  
  setTimeout(function(){
    greet(randomGreeting);
  }, 1000);