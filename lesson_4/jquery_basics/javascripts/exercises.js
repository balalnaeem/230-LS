$(function() {
  var $p = $('p');

  $('a').on('click', function(e) {
    e.preventDefault();
    var $anchor = $(this);
    $p.text('Your favorite fruit is ' + $anchor.text());
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    $input = $(this).find('input[type=text]');
    $p.text('Your favorite fruit is ' + $input.val());
  });
});