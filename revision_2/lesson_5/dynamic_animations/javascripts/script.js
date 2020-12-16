$(function() {
  var $canvas = $('#canvas');

  function getFormObject($form) {
    var o = {};

    $form.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });

    return o;
  }

  function createElement(data) {
    var $div = $('<div></div>', { 
      "class": data.shape_type, 
      data: data, 
    });

    resetElement($div);

    return $div;
  }

  function animateElement() {
    var $ele = $(this);
    var data = $ele.data();

    resetElement($ele);

    $ele.animate({
      left: +data.end_x,
      top: +data.end_y,
    }, 1000);
  }

  function resetElement($ele) {
    var data = $ele.data();

    $ele.css({
      left: +data.start_x,
      top: +data.start_y,
    });
  }

  function stopAnimations() {
    $canvas.find('div').stop();
  }

  $('form').on('submit', function(e) {
    e.preventDefault();

    var $form = $(this);
    var data = getFormObject($form);
    
    $canvas.append(createElement(data));
  });

  $('#animate').on('click', function(e) {
    e.preventDefault();

    $canvas.find('div').each(animateElement);
  });

  $('#stop').on('click', function(e) {
    e.preventDefault();
    stopAnimations();
  });
});
