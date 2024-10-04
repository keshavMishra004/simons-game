var buttoncolors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var start = false;
var level = 0;
var highscore = 0;


if (localStorage.getItem("highscore")) {
  highscore = localStorage.getItem("highscore");
  $("#high-score").text("High Score: " + highscore);
}

// Starting the game on any keypress
$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
  else {
    
    startOver(); 
    $("#level-title").text("Level " + level);
    nextSequence(); 
    start = true; 
  }
});

// User clicks a button
$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  
  playSound(userChosenColor);
  animatePress(userChosenColor);
  
  checkAnswer(userClickPattern.length - 1); // Checking the players input
});

// Checking if the user clicked the right sequence or not
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");

    if (userClickPattern.length === gamePattern.length) {

      
      // Move to next sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    updatingHighScore();

    currentscore();

    // Reseting the game
    startOver();
  }
}

// Move to the next sequence
function nextSequence() {
  userClickPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  $("#current-score").text("current score: " + (level-1));

  // Randomly choosing the next color for user to follow
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttoncolors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Animating chosen button
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColor);
}

// Play sound based on button clicked from library
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate the button when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function updatingHighScore() {
  if (level > highscore) {
    highscore = level ;
    localStorage.setItem("highscore", highscore);
   
  }
  
}




$(document).ready(function() {
  $(".btn").on("click", function() {
    var button = $(this);
    
    button.addClass('pressed');
    
    setTimeout(function() {
      button.removeClass('pressed');
    }, 100);
  });

  //updating highscore each time
  $("#high-score").text("High Score: " + highScore);
  $("#current-score").text("Current Score: 0");
});
