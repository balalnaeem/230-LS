$(function() {
  $('a').on('click', function(e) {
    e.preventDefault();
    let data = $(this).data('block');

    $('article').hide();
    $('[data-block=' + data + ']').show();
  });
});
