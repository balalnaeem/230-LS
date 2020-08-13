document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let button = document.querySelector('#submit');
  let p = document.querySelector('main p');
  let link = document.querySelector('main a');
  let guesses;
  let answer;

  function isValid(input) {
    input = parseInt(input.value, 10);
    if (input >= 1 && input <= 100) return true;
    return false;
  }

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    button.removeAttribute('disabled');
    guesses = 0;
    p.textContent = 'Guess a number from 1 to 100';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!isValid(input)) {
      alert("That's not a valid number. Please try again.");
      return;
    }

    let guess = parseInt(input.value, 10);
    let message;
    guesses += 1;

    if (guess > answer) {
      message = `My number is lower than the ${String(guess)}`;
    } else if (guess < answer) {
      message = `My number is higher than the ${String(guess)}`;
    } else {
      message = `You guessed it! It took you ${guesses} guesses`;
      button.setAttribute('disabled', true);
    }

    p.textContent = message;
  });

  link.addEventListener('click', (e) => {
    e.preventDefault();
    newGame();
  });

  newGame();
});
