document.addEventListener('DOMContentLoaded', function(e) {
  createProduct({
    name: 'newPen',
    sku: 'nep001',
    price: 220,
   });
  let request = new XMLHttpRequest();
  let store = document.getElementById('store');
  
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener('load', function(e) {
    store.innerHTML = request.response;
  });

  request.send();

  store.addEventListener('click', function(e) {
    let target = e.target;
    if (target.tagName !== 'A') return;

    event.preventDefault();

    let request = new XMLHttpRequest();
    request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com' + target.getAttribute('href'));

    request.addEventListener('load', e => store.innerHTML = request.response);

    request.send();
  });

  document.addEventListener('submit', function(e) {
    e.preventDefault();

    let form = e.target;
    let data = new FormData(form);
    let request = new XMLHttpRequest();

    request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com' + form.getAttribute('action'));

    request.addEventListener('load', function(e) {
      store.innerHTML = request.response;
    });

    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
    request.send(data);
  });

  function createProduct(productData) {
    let json = JSON.stringify(productData);
    let request = new XMLHttpRequest();
    request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

    request.addEventListener('load', function(e) {
      console.log('This product was added to the store: ' + request.responseText);
    });

    request.send(json);
  }
});
