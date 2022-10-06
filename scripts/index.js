const buttons = [...document.querySelectorAll('.button[data-type]')];
const scores = [...document.querySelectorAll('span[data-player]')];
const roundSelect = document.querySelector('#num-games');

function incrementScore(e) {
  const player = e.target.attributes['data-type'].value;
  const playerScore = document.querySelector(`span[data-player="${player}"]`);
  let score = parseInt(playerScore.textContent);
  playerScore.textContent = `${++score}`;
}

function resetScores() {
  let classes = [
    'text-accent-100',
    'text-accent-500'
  ];
  scores.forEach((score) => {
    score.textContent = '0';
    score.classList.remove(...classes);
  });
}

function isGameOver() {
  let numGames = parseInt(roundSelect.value);
  return scores.some((score) => {
    let playerScore = parseInt(score.textContent);
    return playerScore === numGames;
  });
}

function showResults() {
  const [player1, player2] = scores;
  let player1Score = parseInt(player1.textContent);
  let player2Score = parseInt(player2.textContent);
  let numGames = parseInt(roundSelect.value);

  if (player1Score === numGames) {
    player1.classList.add('text-accent-100');
    player2.classList.add('text-accent-500');
  } else if (player2Score === numGames) {
    player1.classList.add('text-accent-500');
    player2.classList.add('text-accent-100');
  }
}

function disableButtons() {
  buttons.forEach((button) => {
    if (button.attributes['data-type'].value !== 'reset') {
      button.setAttribute('disabled', 'disabled');
    }
  });
}

function enableButtons() {
  buttons.forEach((button) => {
    button.removeAttribute('disabled');
  });
}

buttons.forEach((button) => {
  const buttonType = button.attributes['data-type'];
  if (buttonType.value === 'reset') {
    button.addEventListener('click', () => {
      resetScores();
      enableButtons();
    });
  } else {
    button.addEventListener('click', (e) => {
      incrementScore(e);
      if (isGameOver()) {
        disableButtons();
        showResults();
      }
    });
  }
});

roundSelect.addEventListener('input', () => {
  resetScores();
  enableButtons();
});