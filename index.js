// variables
const colorsArray = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;


// generate a randoom number
function nextSequence() {
	var randomNum = Math.floor(Math.random() * 4);
	return randomNum;
}


// generate a color specified by the aforementioned random number
function nextColor(num) {
	return colorsArray[num];
}


// play an animation and a sound when a button is pressed
function playSoundAnimation(btnId) {
	var selectedBtn = $(`#${btnId}`);
	// console.log(selectedBtn);
	selectedBtn.fadeOut(100).fadeIn(100);

	switch (btnId) {
		case "red":
			new Audio("sounds/red.mp3").play();
			break;
		case "green":
			new Audio("sounds/green.mp3").play();
			break;
		case "blue":
			new Audio("sounds/blue.mp3").play();
			break;
		case "yellow":
			new Audio("sounds/yellow.mp3").play();
			break;
		default:
			break;
	}
}


// click event handler
function clickHandler() {
	$(".btn").click(function(e) {
		userPattern.push(e.target.id);
		playSoundAnimation(e.target.id);

		console.log("[DEBUG] USER PATTERN: ", userPattern);
		console.log("[DEBUG] GAME PATTERN: ", gamePattern);
		checkAnswer(userPattern.length - 1);
	});
}


// keyboard key handler
function pressHandler() {
	$(document).keypress(function(e) {
        var pressedKey = e.key;
        // check the pressed key
        // note that you have to check
        // if the user entered the correct answer
        // after every key... yay..! Fuck sake..
		switch (pressedKey) {
			case "w":
				playSoundAnimation("green");
				userPattern.push("green");
				console.log("[DEBUG] USER PATTERN: ", userPattern);
				console.log("[DEBUG] GAME PATTERN: ", gamePattern);
				checkAnswer(userPattern.length - 1);
				break;
			case "s":
				playSoundAnimation("blue");
				userPattern.push("blue");
				console.log("[DEBUG] USER PATTERN: ", userPattern);
				console.log("[DEBUG] GAME PATTERN: ", gamePattern);
				checkAnswer(userPattern.length - 1);
				break;
			case "a":
				playSoundAnimation("red");
				userPattern.push("red");
				console.log("[DEBUG] USER PATTERN: ", userPattern);
				console.log("[DEBUG] GAME PATTERN: ", gamePattern);
				checkAnswer(userPattern.length - 1);
				break;
			case "d":
				playSoundAnimation("yellow");
				userPattern.push("yellow");
				console.log("[DEBUG] GAME PATTERN: ", gamePattern);
				console.log("[DEBUG] USER PATTERN: ", userPattern);
				checkAnswer(userPattern.length - 1);
				break;
			default:
                console.log("Piss off, ya twat!")
				break;
		}
	});
}


// check if the sequence the user enetered is correct
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userPattern[currentLevel]) {
		console.log("Yes...");

		if (userPattern.length === gamePattern.length) {
			$("#level-title").text(`CONGRATULATIONS!`);
			setTimeout(function() {
				nextLevel();
			}, 1000);
		}
	} else {
		console.log("Ya fooked it, mate");

		new Audio("sounds/wrong.mp3").play();

		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text(`YOU FUCKING SUCK! DIE, YOU CUNT! DIE!`);
		setTimeout(() => {
			startGame();
		}, 1000);
	}
}


// load the next level
function nextLevel() {
    // increment the level number and display it
	level++;
	$("#level-title").text(`Level ${level}`);

    // generate a random number
	var randomNum = nextSequence();

    // generate a color based on the generated random number
	var genNextColor = nextColor(randomNum);

    // append that color to the game pattern
	gamePattern.push(genNextColor);

    // play the game pattern
	for (let i = 0; i < gamePattern.length; i++) {
		setTimeout(() => {
			playSoundAnimation(gamePattern[i]);
		}, 1000 * (i + 1));
	}

	// checkUserInput(userPattern, gamePattern);
	console.log("GAME PATTERN: ", gamePattern);

	// reset userPattern
	userPattern = [];
}


// start when the user presses a key
function startGame() {
    // reset the level number
    level = 0;
    
    // reset the game pattern
    gamePattern = [];
    
    // load the next level
	nextLevel();
}


// main function that calls the initialization
// functions and the startGame function
function main() {
    // call the handlers
	clickHandler();
	pressHandler();

    // if the user presses Enter, start the game
	$(document).keypress(function(e) {
		if (e.key == "Enter") {
			startGame();
		}
	});
}


// call the main function
main();