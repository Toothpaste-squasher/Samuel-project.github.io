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
  if (score.player > score.computer) {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Player<div class='js-player-score winning'>${score.player}</div>Computer<div class='js-computer-score losing'>${score.computer}</div>`;
  } else if (score.computer > score.player) {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Player<div class='js-player-score losing'>${score.player}</div>Computer<div class='js-computer-score winning'>${score.computer}</div>`;
  } else {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Player<div class='js-player-score'>${score.player}</div>Computer<div class='js-computer-score'>${score.computer}</div>`;
  }
}

function revealResults(player, computer, winner) {
  if (winner !== "") {
    if (winner === "Player") {
      document.querySelector(
        ".js-result"
      ).innerHTML = `<img class="playerPlayed winner" src="images/${player}.png" alt="${player}"><img class="computerPlayed loser" src="images/${computer}.png" alt="${computer}">`;
    } else {
      document.querySelector(
        ".js-result"
      ).innerHTML = `<img class="playerPlayed loser" src="images/${player}.png" alt="${player}"><img class="computerPlayed winner" src="images/${computer}.png" alt="${computer}">`;
    }
  } else {
    document.querySelector(
      ".js-result"
    ).innerHTML = `<img class="playerPlayed draw" src="images/${player}.png" alt="${player}"><img class="computerPlayed draw" src="images/${computer}.png" alt="${computer}">`;
  }

  if (winner === "Player") {
    score.player++;
  } else if (winner === "Computer") {
    score.computer++;
  }
}

let isAutoPlaying = false;
let autoPlayInterval;
function autoPlay() {
  autoPlayInterval = setInterval(function () {
    const player = compResponse();
    const computer = compResponse();
    determineWinner(player, computer);
    revealResults(player, computer, winner);
    confetti(".js-player");
    changeTextBubble(".js-player-bubble");
  }, 1000);
}

function playGame(playerResult) {
  compResult = compResponse();
  winner = determineWinner(playerResult, compResult);
  revealResults(playerResult, compResult, winner);
  confetti("player-rock");
  changeTextBubble(".comp-bubble");
  changeTextBubble(".player-bubble");
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
