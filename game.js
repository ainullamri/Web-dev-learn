

var color = "red blue green yellow";
var buttonColours = color.split(" ");
var gamePattern = [];
var userChosenColour = [];
var level = 0;



//PlaySound func
function playSound(audio_name) {
    var sound = new Audio("sounds/" + audio_name + ".mp3");
    sound.play();
}

//Random Number generator
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    //Choosing Random Colour
    var randomChosenColour = buttonColours[randomNumber]; //generates one random color from buttonColours

    //Adding chosen colour to gamePattern
    gamePattern.push(randomChosenColour);

    //Selecting button similar to randomChosenColours
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

    //PlayingSound
    playSound(randomChosenColour);
    level += 1;
    $("h1").text("level " + level);

    //Reset User Choice to start over
    userChosenColour = [];
}

//Game Over Func
function gameOver() {
    $("body").addClass("game-over");
    function gameOverRed() {
        $("body").removeClass("game-over");
    }
    setTimeout(gameOverRed, 300);
    $("h1").text("Game Over!, Press Any Key to Restart");
    gamePattern = [];
    level = 0;
}

//Proceeding to next level if right
function checkAnswer() {
    if (gamePattern.length === userChosenColour.length) {
        for (var i = 0; i <= userChosenColour.length; i++) {
            if (gamePattern[i] !== userChosenColour[i]) {
                gameOn = false;
                gameOver();
                return gameOn;
            }
        }
            setTimeout(nextSequence, 1000);
    } else {
        var last_index = userChosenColour.length - 1;
        if (userChosenColour[last_index] !== gamePattern[last_index]) {
            gameOn = false;
            gameOver();
            return gameOn;

        }
    }
}


//User Choice Logic
$(".btn").on("click",function(e) {
    var which_sound = userChosenColour.length;
    userChosenColour.push((e.target.getAttribute("id")));
    $(".btn." + userChosenColour[which_sound]).addClass("pressed");

    //Removing class
    function animatePress() {
        $(".btn." + userChosenColour[which_sound]).removeClass("pressed")
    }
    setTimeout(animatePress, 100);
    playSound(userChosenColour[which_sound]);
    checkAnswer();
})

//Tracking game on or off

var gameOn = false;


//Starting game
$(document).keypress(function() {
    while (gameOn === false) {
        $("h1").text("level " + level)
        nextSequence();
        gameOn = true;
    }

})






