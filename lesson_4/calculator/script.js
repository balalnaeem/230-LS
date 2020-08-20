$(document).ready(function() {
  $('form').on('submit', function(e) {
    var $form = $(this);
    var numerator = +$form.find('#numerator').val();
    var denominator = +$form.find('#denominator').val();
    var operator = $form.find('#operator').val();
    var result = 0;

    e.preventDefault();

    if (operator === '+') {
      result = numerator + denominator;
    } else if (operator === '-') {
      result = numerator - denominator;
    } else if (operator === '*') {
      result = numerator * denominator;
    } else if (operator === '/') {
      result = numerator / denominator;
    }

    $('h1').text(result);
  });
});