function findItems() {
  let resultArr = [];
  let form = document.querySelector('form');
  let checkboxes = form.querySelectorAll('input[type=checkbox]');

  let checked = [];
  let notChecked = [];

  for (let i = 0; i < checkboxes.length; i += 1) {
    let checkbox = checkboxes[i];
    if (checkbox.checked) {
      checked.push(checkbox.nextElementSibling.textContent)
    } else {
      notChecked.push(checkbox.nextElementSibling.textContent);
    }
  }

  resultArr.push(checked, notChecked);
  return resultArr;
}

function walkList() {
  let root = document.querySelector('ul');

  function walk(node) {
    if (node.nodeName === 'LI') {
      console.log(node.childNodes[0].wholeText.trim());
    }

    for (let index = 0; index < node.childNodes.length; index += 1) {
      walk(node.childNodes[index]);
    }
  }

  walk(root);
}

function rewrite() {
  let h1 = document.createElement('h1');
  h1.textContent = "The Day's News";

  let article = document.createElement('article');
  article.setAttribute('class', 'font-page');

  let p1 = document.createElement('p');
  let p2 = p1.cloneNode(true);

  p1.textContent = "Fire breaks out at the old factory";

  let a = document.createElement('a');
  a.setAttribute('href', '/stories/15');
  a.textContent = "Read More";

  let div = document.querySelector('div');
  let h2 = document.querySelector('h2');
  let body = document.querySelector('body');

  body.removeChild(h2);
  p2.appendChild(a);
  article.appendChild(p1);
  article.appendChild(p2);
  div.insertAdjacentElement("afterbegin", article);
  body.insertAdjacentElement("afterbegin", h1);
}

function helloLater(n) {
  setTimeout(() => console.log('Hello World'), n * 1000);
}

document.addEventListener('DOMContentLoaded', function(e) {
  let lis = document.querySelectorAll('li');
  console.log(lis.length);
});

document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    e.preventDefault();
  }

  // some code
});

let request = new XMLHttpRequest();
request.open('POST', 'my-todo-app.com/todos/15');
request.setRequestHeader('Content-Type', 'application/json');

let json = JSON.stringify({title: 'Buy Milk', completed: true});

request.send(json);
