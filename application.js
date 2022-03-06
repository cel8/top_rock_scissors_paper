const move = [ "rock", "paper", "scissor" ];

function computerPlay() {
  let computerMove = Math.floor(Math.random() * move.length);
  return move[computerMove];
}

function playerPlay() {
  let playerChoose = prompt("Choose a rock, paper or scissor move!", 'rock');
  /* Check for no empty string */
  if(playerChoose) {
    playerChoose = playerChoose.toLowerCase();
    if((playerChoose === 'rock') || (playerChoose === 'paper') || (playerChoose === 'scissor')) {
      return playerChoose;
    } else {
      console.log("You should choose between \'rock\', \'paper\' or \'scissor\'!");
    }
  }
  return 'rock';
}

function playRound(playerSelection, computerSelection) {
  let winner = -1; // computer win
  if(playerSelection === computerSelection) {
    console.log("Even! No one win.");
    winner = 0;
  } else {
    if(((playerSelection === 'rock') && (computerSelection === 'scissor')) ||
       ((playerSelection === 'scissor') && (computerSelection === 'paper')) ||
       ((playerSelection === 'paper') && (computerSelection === 'rock'))) {
      console.log("Player win this round.");
      winner = 1;
    } else {
      console.log("Computer win this round.");
    }
    return winner;
  }
}

function game() {
  let playerScore;
  let computerScore;
  for(let i = 0; i < 5; ++i) {
    console.log("Round " + (i + 1));
    let winner = playRound(playerPlay(), computerPlay());
    if(winner > 0) playerScore++;
    else if(winner < 0) computerScore++;
    else continue;
  }
  if(playerScore > computerScore) console.log("Player win!");
  else if(playerScore < computerScore) console.log("Computer win!");
  else console.log("No one win!");
}
