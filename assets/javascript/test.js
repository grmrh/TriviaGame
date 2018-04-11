var myVar = setInterval(function() {
    myTimer()
  }, 1000);
  
  function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
  }
  
  for (var i = 0; i < 100; i++) {
    setTimeout(function() {
      console.log("log " + i);
    }, 3000);
  }




  


