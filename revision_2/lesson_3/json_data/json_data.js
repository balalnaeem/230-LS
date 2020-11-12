let request = new XMLHttpRequest();
request.open('GET', 'hts://api.github.com/repos/rails/rails');
request.responseType = 'json';

request.addEventListener('load', function(e) {
  let data = request.response;
  console.log(request.status);
  console.log(data.open_issues);
});

request.addEventListener('error', e => console.log('Not happening'));

request.send();

// POST /path HTTP 1.1
// Host: host.com
// Content-Type: application/json
// Accept:*/*

