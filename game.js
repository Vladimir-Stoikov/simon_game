var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor = [];
var userClickedPattern = [];
var level = 0;
var userChosenColour;
var result = "";
var count = 1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColours[randomNumber]);
  $("h1").text("Level " + level);
  level++;
  return randomNumber;
}



function makeSound(key) {
  switch (key) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      console.log(key);

  }
}

$(document).keypress(function() {
  startOver();
  var randomChosenColor = buttonColours[nextSequence()];
  $("#" + randomChosenColor).addClass("pressed").queue(makeSound(randomChosenColor));
  setTimeout(function() {
    $("#" + randomChosenColor).removeClass("pressed");
  }, 100);
  $("h1").text("Level 1");
});

function nextScene() {
  var randomChosenColor = buttonColours[nextSequence()];
  $("#" + randomChosenColor).addClass("pressed").queue(makeSound(randomChosenColor));
  setTimeout(function() {
    $("#" + randomChosenColor).removeClass("pressed");
  }, 100);
  $("h1").text("Level " + level);
}



$(".btn").click(function() {

  var userChosenColour = this.id;
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer();
});

function playSound(key) {
  switch (key) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      console.log(key);

  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed").queue(playSound(currentColour));
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer() {
  for (var i = 0; i < level; i++) {
    if (userClickedPattern[i] == gamePattern[i]) {
      result = "zaebis";
    } else {
      result = "hueta";
    }
  }
  if (level === count && result != "hueta") {
    $("h1").text("Zaebis");
    console.log(result);
    userClickedPattern = [];
    count = 1;
    setTimeout(nextScene, 1000);


  } else if (level != count && userClickedPattern[count - 1] == gamePattern[count - 1]) {
    count++;
  } else {
    $("h1").text("Ti proebal. Press A Key to Start");
    gameOver();
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    startOver();

  }
}

function startOver() {
  level = 0;
  count = 1;
  userClickedPattern = [];
  gamePattern = [];
}
