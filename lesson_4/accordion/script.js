$('form').submit(function(e) {
  e.preventDefault();
  let $input = $('input[type=text]');
  let character = $input.val();

  $(document).off('keypress').on('keypress', function(e) {
    if (e.key !== character) {
      return;
    }

    $('a').trigger('click');
  });

  $('a').click(function(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });
});