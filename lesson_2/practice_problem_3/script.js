document.addEventListener('keydown', event => {
  let text = document.querySelector('textarea');
  let chars = text.value.length;
  let p = document.querySelector('p');
  let remaining = 139 - chars;
  let invalid = remaining < 0;
  p.innerHTML = String(remaining) + ' characters remaining';
  text.classList.toggle('invalid', invalid);
});