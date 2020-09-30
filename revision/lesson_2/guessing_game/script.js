document.addEventListener('DOMContentLoaded', () => {
  let answer;
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let link = document.querySelector('a');
  let paragraph = document.querySelector('p');
  let button = document.querySelector('input[type="submit"]');

  function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    paragraph.textContent = 'Guess a number from 1 to 100.';
    input.value = '';
  }

  function validInput(input) {
    return Number(input) >= 1 && Number(input) <= 100;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validInput(input.value)) {
      alert('Please enter a valid number');
    }

    let guess = parseInt(input.value, 10);
    let message;




    if (guess === answer) {
      message = 'You guessed!';
      button.disabled = true;
    } else if (guess < answer) {
      message = `My number is higher than ${String(guess)}`;
    } else if (guess > answer) {
      message = `My number is lower than ${String(guess)}.`;
    }

    paragraph.textContent = message;
  });

  link.addEventListener('click', e => {
    e.preventDefault();
    newGame();
  });

  newGame();
});