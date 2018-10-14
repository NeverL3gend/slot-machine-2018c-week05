$(document).ready(function(){
var sources = ["images/legend.png", "images/rank1.png", "images/rank2.jpg", "images/rank3.png", "images/rank4.png", "images/rank5.png", "images/rank6.png", "images/rank20.jpg"];
var reel = [$("#reel1"), $("#reel2"), $("#reel3")];
var intervals = [];
var money = 0;
var bet = 0;


function rotateReel() {
  //getting the images in the reel to rotate
  // changing the source of the image of every element in reel array
  reel.forEach(function(el) {
    //changing the image at specified intervals
    var interval = setInterval(function() {
      //randomly generate images displyed onto the dom
      var newSource = sources[Math.floor(Math.random()*sources.length)]
      el.attr("src", newSource);
    }, 200);
    intervals.push(interval);
  })
}

function clear(i){
  clearInterval(intervals[i]);
  intervals[i] = "stopped";
}

//click event for SET AMOUNT
$("#setButton").on("click",function(){
  money = parseInt($("#setMoney").val());
  $("#purse").html(money);
});
//click event for BET AMOUNT
$("#betButton").on("click",function(){
 bet = parseInt($("#betMoney").val());
 rotateReel();
});

//click events for each STOP BUTTON ************************************
$("#stop1,#stop2,#stop3").on("click", function(event) {
    // console.log(event);
    var stopId = event.target.attributes["data-id"].value;
    console.log(stopId);
    clear(stopId);

    var areAllIntervalsStopped = intervals.every(function(interval) {
      return interval === 'stopped';
    });

    if (areAllIntervalsStopped) {
    intervals = []
    winnerLogic();
    }
  })

  function winnerLogic() {
    if ($('#reel1').attr('src') == $('#reel2').attr('src') && $('#reel2').attr('src') == $('#reel3').attr('src')){
      var newTotal = money + bet;
      money = newTotal
      alert("You Won bruh!!")
    }else{
      var newTotal = money - bet;
      money = newTotal;
      alert("Loser")
    }
    $('#purse').text(money)
  }


});
