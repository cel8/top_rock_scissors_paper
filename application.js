// game moves
const move = [ "rock", "paper", "scissors" ];
const maxHP = 5;
// buttons
const fightButton = document.querySelector(".fight-button");
const restartButton = document.querySelector(".restart-button");
// containers
const gameContainer = document.querySelectorAll(".game");
const infoContainer = document.querySelectorAll(".info");
// Score reference
const refImgRock = document.querySelector("#id-rock");
const refImgPaper = document.querySelector("#id-paper");
const refImgScissors = document.querySelector("#id-scissors");
const refPlayerScore = document.querySelector(".player-score");
const refComputerScore = document.querySelector(".computer-score");
const refWinner = document.querySelector(".winner");
// Global values
let playerScore;
let computerScore;

window.addEventListener('load', () => {
  initialize();
});

fightButton.addEventListener('click', () => {
  // hide or show elements 
  gameContainer.forEach(element => {
    element.style.display = 'flex';
  });
  infoContainer.forEach(element => {
    element.style.display = 'none';
  });
  fightButton.style.display = 'none';
});

restartButton.addEventListener('click', () => {
  initialize();
});


// create a new instance of 'MutationObserver' named 'observer', 
// passing it a callback function
observer = new MutationObserver(function(mutationsList, observer) {
  declareWinner();
});

// call 'observe' on that MutationObserver instance, 
// passing it the element to observe, and the options object
observer.observe(refPlayerScore, {characterData: false, childList: true, attributes: false});
observer.observe(refComputerScore, {characterData: false, childList: true, attributes: false});

function initialize() {
  infoContainer.forEach(element => {
    element.style.display = 'block';
  });
  fightButton.style.display = 'block';
  // assign HP
  playerScore = maxHP;
  computerScore = maxHP;
  refPlayerScore.textContent = playerScore;
  refComputerScore.textContent = computerScore;
  refWinner.style.display = 'none';
  restartButton.style.display = 'none';
}

function declareWinner() {
  if((playerScore === 0) || (computerScore === 0)) {
    // Winner text
    refWinner.textContent = playerScore === 0 ? "You lose..." : "You win!";
    restartButton.textContent = playerScore === 0 ? "Save the world!" : "Save the world again!";
    // Remove low hp class
    if(refComputerScore.classList.contains('low-hp')) {
      refComputerScore.classList.remove('low-hp');
      refComputerScore.classList.add('full-hp');
    }
    // Remove low hp class
    if(refPlayerScore.classList.contains('low-hp')) {
      refPlayerScore.classList.remove('low-hp');
      refPlayerScore.classList.add('full-hp');
    }
    // hide or show elements 
    gameContainer.forEach(element => {
      element.style.display = 'none';
    });
    refWinner.style.display = 'block';
    restartButton.style.display = 'block';
  }
}

refImgRock.addEventListener('click', () => {
  playRound(move[0], computerPlay());
});

refImgPaper.addEventListener('click', () => {
  playRound(move[1], computerPlay());
});

refImgScissors.addEventListener('click', () => {
  playRound(move[2], computerPlay());
});

function computerPlay() {
  // get computer move randomly
  let computerMove = Math.floor(Math.random() * move.length);
  return move[computerMove];
}

function playRound(playerSelection, computerSelection) {
  // Play until everyone has HP > 0
  if((playerScore != 0) && (computerScore != 0)) {
    if(playerSelection !== computerSelection) {
      if(((playerSelection === 'rock') && (computerSelection === 'scissors')) ||
        ((playerSelection === 'scissors') && (computerSelection === 'paper')) ||
        ((playerSelection === 'paper') && (computerSelection === 'rock'))) {
        computerScore--;
        refComputerScore.textContent = computerScore;
        if(computerScore < (maxHP / 2)) {
          if(refComputerScore.classList.contains('full-hp')) {
            refComputerScore.classList.remove('full-hp');
            refComputerScore.classList.add('low-hp');
          }
        }
      } else {
        playerScore--;
        refPlayerScore.textContent = playerScore;
        if(playerScore < (maxHP / 2)) {
          if(refPlayerScore.classList.contains('full-hp')) {
            refPlayerScore.classList.remove('full-hp');
            refPlayerScore.classList.add('low-hp');
          }
        }
      }
    }
  }
}
