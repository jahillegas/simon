// //Game Array
// var buttonColors = ["red", "blue", "green", "yellow"];
// var gamePattern = [];
//
// //Random Number Generator
//
// function nextSequence() {
//
//   var randomNumber = Math.floor(Math.random() * 4);
//
//   var randomChosenColor = buttonColors[randomNumber];
//   gamePattern.push(randomChosenColor);
//
//   //Select the button with an ID that matches the randomChosenColor
//   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
//
// }

    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var started = false;
    var level = 0;

    $(document).keypress(function() {
      if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        console.log(started);
      }
    });


    function nextSequence() {

      userClickedPattern =[];

      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChosenColor);

      //1. Use jQuery to select the button with the same id as the randomChosenColour
      //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
      $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

      var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
      audio.play();

      level ++;
      $("#level-title").text("Level " + level);

    }

    $('.btn').click('keypress', function () {
      var userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length-1);
    });

    function animatePress(currentColor) {
      $('#' + currentColor).addClass("pressed");

      setTimeout(function() {
        $('#' + currentColor).removeClass("pressed");
      }, 100);
    };

    function checkAnswer (currentLevel) {
      if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('succes');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $(document.body).addClass('game-over')
        setTimeout(function() {
          $(document.body).removeClass("game-over");
        }, 200);
        $("#level-title").text("You suck playa. Hit key to restart")
        startOver();
      }
    }

    function startOver() {
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      started = false;
    }
