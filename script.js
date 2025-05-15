const score = JSON.parse(
  localStorage.getItem("score") || '{"player": 0, "computer": 0}'
);

updateScoreElement();

let compResult;
let winner;
let playerResult;

function compResponse() {
  randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computer = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computer = "paper";
  } else {
    computer = "scissors";
  }
  return computer;
}

function determineWinner(player, computer) {
  if (computer === player) {
    winner = "";
  } else if (
    (computer === "rock" && player === "scissors") ||
    (computer === "paper" && player === "rock") ||
    (computer === "scissors" && player === "paper")
  ) {
    winner = "Computer";
  } else {
    winner = "Player";
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  return winner;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Score: Player ${score.player}; Computer ${score.computer}`;
}

function revealResults(player, computer, winner) {
  if (winner !== "") {
    document.querySelector(
      ".js-result"
    ).innerHTML = `You played ${player} and computer played ${computer}, so ${winner} is the winner`;
  } else {
    document.querySelector(
      ".js-result"
    ).innerHTML = `You played ${player} and computer played ${computer}, so it's a draw...`;
  }

  if (winner === "Player") {
    score.player++;
  } else if (winner === "Computer") {
    score.computer++;
  }
}

function confetti(playerMove) {
  const celebrationPreferences =
    document.getElementById("celebrationInput").value;
  const button = document.querySelector(playerMove);
  const jsConfetti = new JSConfetti();
  const celebrations = celebrationPreferences.split("");

  console.log(celebrationPreferences);
  console.log(celebrations);
  console.log(winner);
  if (winner === "Player") {
    console.log("Player wins");
    if (celebrationPreferences.length === 0) {
      jsConfetti.addConfetti();
    } else {
      jsConfetti.addConfetti({
        emojis: celebrations,
      });
    }
  }
}

function changeTextBubble(bubbleClass) {
  numOfBubbles = 12;
  const ranBubNum = Math.floor(Math.random() * numOfBubbles) + 1;
  bubbleName = `Subject ${ranBubNum}.PNG`;
  document.querySelector(
    bubbleClass
  ).src = `images/convo-bubbles/${bubbleName}`;
  console.log(bubbleName);
}

compWinDialogue = [
  "I am too good",
  "I am unbeatable",
  "I am the champion",
  "bow to the champion (:",
];

playerWinDialogue = ["I am the best", "U suck", "LOL", "Get better"];

compLostDialogue = [
  "No way, again",
  "Shut up",
  "Watch me win next time",
  "You got lucky",
];

playerLostDialogue = ["...."];

function changeDialogue() {
  console.log(winner);
}
