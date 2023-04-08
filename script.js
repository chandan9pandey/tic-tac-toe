// selecting all the required elements
const selectBox = document.querySelector(".select-box"),
	selectXBtn = selectBox.querySelector(".playerX"),
	selectOBtn = selectBox.querySelector(".playerO"),
	playBoard = document.querySelector(".play-board"),
	allBox = document.querySelectorAll("section span"),
	players = document.querySelector(".players"),
	resultBox = document.querySelector(".result-box"),
	wonText = resultBox.querySelector(".won-text"),
	replayBtn = resultBox.querySelector("button");

window.onload = () => {
	//once window loaded
	for (let i = 0; i < allBox.length; i++) {
		// add onclick attribute oin all sections's spans
		allBox[i].setAttribute("onclick", "clickedBox(this)");
	}

	selectXBtn.onclick = () => {
		selectBox.classList.add("hide"); // hide the selectbox once playerX button clicked
		playBoard.classList.add("show"); //show the playboard section on playerX button clicked
	};
	selectOBtn.onclick = () => {
		selectBox.classList.add("hide"); // hide the selectbox once playerO button clicked
		playBoard.classList.add("show"); //show the playboard section on playerO button clicked
		players.setAttribute("class", "players active player"); //adding three class name in player element
	};
};

let playerXIcon = "fas fa-times"; // classname of fontawesome cross icon
let playerOIcon = "far fa-circle"; // classname of fontawesome circle icon
let playerSign = "X"; //suppose player will be X
// user click function
let runBot = true;
function clickedBox(element) {
	// console.log(element);
	if (players.classList.contains("player")) {
		// if player element has contains .player
		element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
		players.classList.add("active");
		// if player select O then we'll change the playerSign to O
		playerSign = "O";
		element.setAttribute("id", playerSign);
	} else {
		element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
		players.classList.add("active");
		element.setAttribute("id", playerSign);
	}
	selectWinner(); //calling winner function
	players.style.pointerEvents = "none"; //once user select then user can't select any other box until box select is checked
	element.style.pointerEvents = "none"; //once user select any box then the box can't be selected again
	let randomDelayTime = (Math.random() * 1000 + 200).toFixed(); //generating random time delay so bot will delay to select box
	setTimeout(() => {
		bot(runBot); //calling bot function
	}, randomDelayTime); //passing random delay time
}

// bot click function
function bot(runBot) {
	if (runBot) {
		//if runbot is true then run the following codes
		// first change the playerSign .. so if we user has X value then bot will have O
		playerSign = "O";
		let array = []; //creating empty array...we'll store unselected box index in this array
		for (let i = 0; i < allBox.length; i++) {
			if (allBox[i].childElementCount == 0) {
				//if span has no child element
				array.push(i); //inserting unclicked or unselected boxes inside array mean that span has no children
				// console.log(i + " has no children");
			}
		}
		let randomBox = array[Math.floor(Math.random() * array.length)]; //getting random index from array so bot will select random unselected boxes
		// console.log(randomBox);
		if (array.length > 0) {
			if (players.classList.contains("player")) {
				// if player element has contains .player
				allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
				players.classList.remove("active");
				// if user is O then the box id will be X
				playerSign = "X";
				allBox[randomBox].setAttribute("id", playerSign);
			} else {
				allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
				players.classList.remove("active");
				allBox[randomBox].setAttribute("id", playerSign);
			}
			selectWinner(); //calling the winner function
		}
		allBox[randomBox].style.pointerEvents = "none";
		players.style.pointerEvents = "auto";
		playerSign = "X"; //passing the X value
	}
}

// winner selection
function getId(idname) {
	return document.querySelector(".box" + idname).id; //returning id name
}

function checkThreeId(val1, val2, val3, sign) {
	if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
		return true;
	}
}
function selectWinner() {
	//if one of the combination matches declare them as winner
	if (
		checkThreeId(1, 2, 3, playerSign) ||
		checkThreeId(4, 5, 6, playerSign) ||
		checkThreeId(7, 8, 9, playerSign) ||
		checkThreeId(1, 4, 7, playerSign) ||
		checkThreeId(2, 5, 8, playerSign) ||
		checkThreeId(3, 6, 9, playerSign) ||
		checkThreeId(1, 5, 9, playerSign) ||
		checkThreeId(3, 5, 7, playerSign)
	) {
		// console.log(playerSign + " is the winner");
		//once match won by someone then stop the bot
		runBot = false;
		bot(runBot);
		setTimeout(() => {
			//we'll delay to show the result box
			playBoard.classList.remove("show");
			resultBox.classList.add("show");
		}, 700); //700 ms delay
		//displaying the result box now for winner
		wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
	} else {
		//if match was a draw
		//first we'll check all id ...if span has id and no one won the game then we'll draw the game
		if (
			getId(1) != "" &&
			getId(2) != "" &&
			getId(3) != "" &&
			getId(4) != "" &&
			getId(5) != "" &&
			getId(6) != "" &&
			getId(7) != "" &&
			getId(8) != "" &&
			getId(9) != ""
		) {
			runBot = false;
			bot(runBot);
			setTimeout(() => {
				//we'll delay to show the result box
				playBoard.classList.remove("show");
				resultBox.classList.add("show");
			}, 700); //700 ms delay
			//displaying the result box now for winner
			wonText.textContent = `Match has been drawn!`;
		}
	}
}

replayBtn.onclick = () => {
	window.location.reload();
};
