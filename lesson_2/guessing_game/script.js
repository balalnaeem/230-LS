document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let button = document.querySelector('#submit');
  let p = document.querySelector('p');
  let a = document.querySelector('a');
  let answer;
  let guesses;

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    p.textContent = 'Guess a number from 1 to 100';
    button.removeAttribute('disabled');
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    let guess = parseInt(input.value, 10);
    let message;

    if (guess > 100 || guess < 0) {
      alert('That is not a valid number. Try gain.');
      return;
    }

    guesses += 1;

    if (guess > answer) {
      message = `My number is lower than ${String(guess)}.`;
    } else if (guess < answer) {
      message = `My number is higher than ${String(guess)}.`;
    } else {
      message = `You guessed it! It took you ${String(guesses)} guesses.`;
      button.setAttribute('disabled', true);
    }

    p.textContent = message;
  });

  a.addEventListener('click', event => {
    event.preventDefault();
    newGame();
  });

  newGame();
});