const select = document.getElementById('schedules');
const form = document.querySelector('form');

let staffNames = {};
let availableSchedules;

let staffRequest = new XMLHttpRequest();
staffRequest.open('GET', '/api/staff_members');
staffRequest.responseType = 'json';

staffRequest.addEventListener('load', function() {
  staffRequest.response.forEach(staff => {
    staffNames[staff.id] = staff.name;
  });

});

staffRequest.send();

let schedulesRequest = new XMLHttpRequest();
schedulesRequest.open('GET', '/api/schedules');
schedulesRequest.responseType = 'json';

schedulesRequest.addEventListener('load', function() {
  let res = schedulesRequest.response;
  availableSchedules = res.filter(schedule => {
    return schedule.student_email === null;
  });

  availableSchedules.forEach(obj => {
    let option = document.createElement('option');
    option.textContent = `${staffNames[obj.staff_id]} | ${obj.date} | ${obj.time}`;
    option.setAttribute('value', `${obj.id}`);
    select.appendChild(option);
  });
});

schedulesRequest.send();

/*
id: 1, email: "esmeralda.weber@huel.biz",  name: "Dashawn Bergstrom"}
id: 2, email: "marquise@jacobi.info",      name: "Bettie Swaniawski"}
id: 3, email: "keaton@morar.io",           name: "Madaline Armstrong"}
id: 4, email: "aniya@dachkuphal.biz",      name: "Julius Balistreri"}
id: 5, email: "enrico_prosacco@ortiz.com", name: "Mrs. Randy Roob"}
*/

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let data = new FormData(form);

  xhr.open(form.method, form.action);

  xhr.addEventListener('load', function(e) {
    console.log(xhr.response);
    if (xhr.status === 204) {
      alert('Booked!');
      document.location.reload();
    } else {
      alert(xhr.response);
      let sequence = getSequence(xhr.response);
      createStudent(sequence, data);
    }
  });

  xhr.send(data);
});

function createStudent(sequence, formData) {
  let studentForm = document.getElementById('student_form');
  let email = studentForm.querySelector('input[name=email]');
  let booking_sequence = studentForm.querySelector('input[name=booking_sequence]');
  const submit = new Event('submit');

  studentForm.style.display = 'block';
  email.value = formData.get('student_email');
  booking_sequence.value = sequence;

  studentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open(studentForm.method, studentForm.action);

    request.addEventListener('load', function(e) {
      alert(request.response);
      form.dispatchEvent(submit);
    });
    

    let data = new FormData(studentForm);
    request.send(data);
  });
}

function getSequence(response) {
  return response.replace(/[^0-9]/g, '');
}
