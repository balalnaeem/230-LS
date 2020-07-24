let textField = document.querySelector('.text-field');
let cursor;
let focusedTextField;

document.addEventListener('DOMContentLoaded', () => {
  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');
    focusedTextField = textField;

    if (!cursor) {
      cursor = setInterval(() => textField.classList.toggle('cursor'), 500);
    }

  });
});

document.addEventListener('keydown', event => {
  let contentDiv = focusedTextField.querySelector('.content');
  let textArr = contentDiv.textContent.split('');

  if (focusedTextField) {
    if (event.key === 'Backspace') {
      textArr.length = textArr.length - 1;
      contentDiv.textContent = textArr.join('');
    } else if (event.key.length === 1) {
      contentDiv.textContent += event.key;
    }
  }
});

document.addEventListener('click', event => {
  clearInterval(cursor);

  if (focusedTextField) {
    focusedTextField.classList.remove('focused');
    focusedTextField.classList.remove('cursor');
    focusedTextField = null;
  }
});



