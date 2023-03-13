var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var lastIndex = 0;

$(document).keydown(function () {
        if (level === 0) {
            nextSequence();       
        }
});


$(".btn").on("click", function(e) {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex)
});


function nextSequence() {
    level = level + 1;
    $("h1").text("Level "+ level);
    randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber] ; 
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour)
    playSound(randomChosenColour) 
}

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3"); 
    sound.play();
    $("#"+name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
              }, 1000);
        }
    } else {
        var gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          $("h1").text("Game over, Press Any key to restart");
          startOver();
    }
    
}

function startOver() {
    level = 0;
     gamePattern = [];
    userClickedPattern = [];
}
