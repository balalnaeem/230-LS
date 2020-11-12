$(function() {
  let item = $('#item_name');
  let quantity = $('#quantity');

  $('form').on('submit', function(e) {
    e.preventDefault();
    let name = item.val();
    let amount = quantity.val() || 1;

    $('#list').append(`<li>${amount} ${name}</li>`);

    this.reset();
  });
});
