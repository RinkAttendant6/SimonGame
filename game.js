var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var lastIndex = 0;

document.addEventListener('keydown', () => {
        if (level === 0) {
            nextSequence();       
        }
});

for (var el of document.getElementsByClassName('btn')) {
    el.addEventListener('click', (e) => {
        userChosenColour = e.currentTarget.id;
        userClickedPattern.push(userChosenColour);
        playSound(e.currentTarget.id);
        animatePress(e.currentTarget.id);
        lastIndex = userClickedPattern.length - 1;
        checkAnswer(lastIndex)
    });
}


function nextSequence() {
    level = level + 1;
    document.querySelector('h1').textContent = "Level "+ level;
    randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber] ; 
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour)
    playSound(randomChosenColour) 
}

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3"); 
    sound.play();

    var btn = document.getElementById(name);
    var blink = () => {
        btn.classList.remove('blinking');
        btn.removeEventListener('animationend', blink);
    };
    btn.addEventListener('animationend', blink);
    btn.classList.add('blinking');
}

function animatePress(currentColour) {
    document.getElementById(currentColour).classList.add('pressed');

    setTimeout(() => {
        document.getElementById(currentColour).classList.remove('pressed');
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
        document.body.classList.add('game-over');
        setTimeout(function () {
            document.body.classList.remove('game-over');
          }, 200);
          document.querySelector('h1').textContent = "Game over, Press Any key to restart";
          startOver();
    }
    
}

function startOver() {
    level = 0;
     gamePattern = [];
    userClickedPattern = [];
}
