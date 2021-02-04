const $datesList = $('ul');
let bookedDates;

let dateReq = new XMLHttpRequest();
dateReq.open('GET', '/api/bookings');
dateReq.responseType = 'json';

dateReq.addEventListener('load', function(e) {
  bookedDates = dateReq.response;
  bookedDates.forEach(date => {
    let $dateLi = $('<li></li>');
    $dateLi.text(date);
    $datesList.append($dateLi);

    let bookingsReq = new XMLHttpRequest();
    bookingsReq.open('GET', '/api/bookings/' + encodeURIComponent(date));
    bookingsReq.responseType = 'json';

    bookingsReq.addEventListener('load', function(e) {
      let bookings = bookingsReq.response;
      let $ul = $('<ul></ul>');
      bookings.forEach(arr => {
        let $li = $('<li></li>');
        $li.text(arr.join(' | '));
        $ul.append($li);
      });

      $dateLi.append($ul);
    });

    bookingsReq.send();
  });
});

dateReq.send();

$('#dates').on('click', 'li', function(e) {
  $(this).find('ul').toggle();
});

function cancelSchedule(id) {
  let request = new XMLHttpRequest();
  request.open('DELETE', '/api/schedules/' + id);

  request.addEventListener('load', function(e) {
    alert('Schedule deleted');
  });

  request.send();
}

function cancelBooking(id) {
  let request = new XMLHttpRequest();
  request.open('PUT', '/api/bookings/' + id);

  request.addEventListener('load', function(e) {
    alert('Booking deleted');
  });

  request.send();
}
