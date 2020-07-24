document.body.addEventListener('click', event => {
  let elementClicked = event.target;
  let elementAttached = event.currentTarget;
  let span = document.getElementById('message');
  span.textContent = elementClicked.tagName;
  let span2 = document.getElementById('message2');
  span2.textContent = elementAttached.tagName;
});