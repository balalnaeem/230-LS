function retrieveSchedules() {
  const request = new XMLHttpRequest();
  
  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(({staff_id}) => {
        const key = `staff ${String(staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_,index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual. Please try again.');
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = new FormData(form);

  const request = new XMLHttpRequest();
  request.open('POST', 'http://localhost:3000/api/staff_members');
  
  request.addEventListener('load', function(e) {
    if (request.status === 201) {
      let data = JSON.parse(request.response);
      alert('Staff with id of ' + data.id + ' has been created.');
      form.reset();
    } else if (request.status === 400) {
      alert(request.response);
    }
  });

  request.send(data);
});
