document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  let innerDiv = document.querySelector('.text-field .content');
  let interval;
  let char;

  textField.addEventListener('click', (e) => {
    e.stopPropagation();
    textField.classList.add('focused');

    if (!interval) {
      interval = setInterval(() => textField.classList.toggle('cursor'), 500);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (textField.classList.contains('focused')) {
      if (e.key === 'Backspace') {
        innerDiv.textContent = innerDiv.textContent.slice(0, innerDiv.textContent.length - 1);
      } else {
        char = e.key;
        innerDiv.textContent += char;
      }
    }
  });

  document.addEventListener('click', (e) => {
    clearInterval(interval);
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
  });
});