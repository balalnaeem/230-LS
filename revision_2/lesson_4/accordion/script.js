$(function() {
  let letter;

  $('form').on('submit', function(e) {
    e.preventDefault();
    letter = $('input[type=text]').val();
  });


  $(document).on('keypress', function(e) {
    if (e.key === letter) {
      $('a').trigger('click');
    } else {
      return;
    }
  });

  $('a').on('click', function(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });
});
