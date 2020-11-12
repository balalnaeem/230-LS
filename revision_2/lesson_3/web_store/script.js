document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  let store = document.getElementById('store');
  
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener('load', event => {
    store.innerHTML = request.response;
  });

  request.send();

  store.addEventListener('click', function(e) {
    let target = e.target;
    if (target.tagName !== 'A') {
      return;
    }

    event.preventDefault();

    let reuest = new XMLHttpRequest();
    request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com' + target.getAttribute('href'));

    request.addEventListener('load', e => store.innerHTML = request.response);
    request.send();
  });

  document.addEventListener('submit', function(e) {
    e.preventDefault();
    let form = document.querySelector('form');
    let data = new FormData(form);

    let request = new XMLHttpRequest();
    request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com' + form.getAttribute('action'));
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
    request.addEventListener('load', e => store.innerHTML = request.response);
    
    request.send(data);
  });

  let magic = document.getElementById('magic');

  magic.addEventListener('click', function(e) {
    e.preventDefault();

    let request = new XMLHttpRequest();
    request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

    data = {
      "name": "Magic Pen",
      "sku": "mp100",
      "price": 200
    };

    request.addEventListener('load', function(e) {
      console.log('This poduct has been added to the store: ' + request.response);
    });
    request.send(JSON.stringify(data));
  });
});

