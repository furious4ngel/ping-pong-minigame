const buttons = [...document.querySelectorAll('.button[data-type]')];
const scores = [...document.querySelectorAll('span[data-player]')];
const roundSelect = document.querySelector('#num-games');

function incrementScore(e) {
  const player = e.target.attributes['data-type'].value;
  const playerScore = document.querySelector(`span[data-player="${player}"]`);
  let newScore = parseInt(playerScore.textContent) + 1;
  playerScore.textContent = `${newScore}`;
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
  scores.forEach((score) => {
    let playerScore = parseInt(score.textContent);
    let numGames = parseInt(roundSelect.value);
    if (playerScore === numGames) {
      score.classList.add('text-accent-100');
    } else {
      score.classList.add('text-accent-500');
    }
  });
}

function disableButtons() {
  buttons.forEach((button) => {
    let type = button.attributes['data-type'].value;
    if (type !== 'reset') {
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
  let type = button.attributes['data-type'].value;
  if (type === 'reset') {
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