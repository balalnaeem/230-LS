document.addEventListener('mousemove', e => {
  let div = document.querySelector('.x');
  div.style.top = String(e.clientY) + 'px';
  div.style.left = String(e.clientX) + 'px';
});

document.addEventListener('keydown', event => {
  let div1 = document.querySelector('.x .horizontal');
  let div2 = document.querySelector('.x .vertical');

  let key = event.key;
  let color;

  if (key === 'r') {
    color = 'red';
  } else if (key === 'g') {
    color = 'green';
  } else if (key === 'b') {
    color = 'blue';
  }

  if (color) {
    div1.style.background = color;
    div2.style.background = color;
  }
});
