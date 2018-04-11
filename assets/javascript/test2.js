function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
    k--;
    console.log("log k inside myTimer() " + k);
}

function next() {
    i++;
    k = 4;
    console.log("log i inside next() " + i);
    console.log("log k inside next() " + k);
    // document.getElementById("demo2").innerHTML = t;
    if (i < 7) {
        setTimeout(next, 4000);
    }
    else {
        clearInterval(myVar);
    }
}

var k = 4;
var i = 0,
    myVar = setInterval(myTimer, 1000);

console.log("log k " + k);
setTimeout(next, 4000);
