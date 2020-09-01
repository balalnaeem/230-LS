$(function() {
  $('form').submit(function(e) {
    let $form = $(this);
    let item = $form.find('#item').val();
    let quantity = $form.find('#quantity').val();

    e.preventDefault();
    let $list = $('#list');
    let li = document.createElement('li');
    $(li).text(quantity + ' ' + item);
    $list.append(li);

    $form[0].reset();
  });
});