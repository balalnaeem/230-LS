$(domReady => {
  let list = $('ul');
  let li;

  $('form').submit(function(e) {
    e.preventDefault();

    let item = $('input[type=text]').val();
    let quantity = $('input[type=number]').val();
    quantity = quantity || '1';

    li = '<li>' + quantity + ' ' + item + '</li>';
    list.append(li);
    $(this).get(0).reset();
  });
});