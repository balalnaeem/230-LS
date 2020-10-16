$(function() {
  let $form = $('form');
  let $canvas = $('#canvas');
  let $startLink = $('#animate');
  let $stopLink = $('#stop')

  $form.on('submit', function(e) {
    e.preventDefault();
    let inputData = {};

    $form.serializeArray().forEach(obj => {
      inputData[obj.name] = obj.value;
    });

    let $div = $('<div>', {'class': inputData.shape_type});
    $div.css({
      top: inputData.start_y + 'px',
      left: inputData.start_x + 'px',
    });

    $div.attr('data-start-top', inputData.start_y + 'px');
    $div.attr('data-start-left', inputData.start_x + 'px');
    $div.attr('data-end-top', inputData.end_y + 'px');
    $div.attr('data-end-left', inputData.end_x + 'px');

    $canvas.append($div);
  });

  $startLink.on('click', function(e) {
    e.preventDefault();
    let $shapes = $('#canvas div');

    $shapes.each(function() {
      $(this).css({
        top: $(this).attr('data-start-top'),
        left: $(this).attr('data-start-left'),
      });
    });

    $shapes.each(function() {
      $(this).animate({
        top: $(this).attr('data-end-top'),
        left: $(this).attr('data-end-left'),
      }, 'slow');
    });
  });

  $stopLink.on('click', function(e) {
    e.preventDefault();
    let $shapes = $('#canvas div');

    $shapes.each(function() {
      $(this).stop(true);
    });
  });
});













