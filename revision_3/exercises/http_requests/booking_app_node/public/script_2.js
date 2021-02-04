let selectElement = document.querySelector('select');
let request = new XMLHttpRequest();

request.open('GET', '/api/staff_members');
request.responseType = 'json';

request.addEventListener('load', event => {
  request.response.forEach(staffMember => {
    let option = new Option(staffMember['name'], staffMember['id']);
    selectElement.appendChild(option);
  });
});

request.send();

let addScheduleButton = document.querySelector('.add-schedule');
let form = document.querySelector('form');
let formCount = 1;
let submitButton = document.querySelector('.submit');

addScheduleButton.addEventListener('click', event => {
  let newForm = form.cloneNode(true);
  formCount += 1;
  newForm.querySelector('span').textContent = String(formCount);
  submitButton.before(newForm);
});

submitButton.addEventListener('click', event => {
  let allForms = document.querySelectorAll('form');
  let schedules = Array.from(allForms, (form) => {
    let data = new FormData(form);
    let result = {};

    data.forEach((value, key) => {
      result[key] = value;
    });
    
    result.staff_id = Number(result.staff_id);
    return result;
  });

  let request = new XMLHttpRequest();
  request.open('POST', '/api/schedules');
  request.setRequestHeader('Content-Type', 'application/json');

  request.addEventListener('load', event => {
    if (request.status === 201) {
      alert('Schedule is added');
    } else if (request.status === 400) {
      alert(request.response);
    }
  });

  request.send(JSON.stringify({schedules}));
});
