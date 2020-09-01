// $(function() {
//   var $canvas = $('#canvas');

//   function getFormObject($f) {
//     var o = {};

//     $f.serializeArray().forEach(function(input) {
//       o[input.name] = input.value;
//     });

//     return o;
//   }

//   function createElement(data) {
//     var $d = $("<div></div>").addClass(data.shape_type)
//               .data(data)
//               .css({
//                 left: +data.start_x,
//                 top: +data.start_y
//               });

//     return $d;
//   }

//   function animateElement() {
//     var $e = $(this);
//     var data = $e.data();

//     $e.css({
//       left: +data.start_x,
//       top: +data.start_y
//     });

//     $e.animate({
//       left: +data.end_x,
//       top: +data.end_y
//     }, +data.duration);
//   }

//   $("form").on('submit', function(e) {
//     e.preventDefault();

//     var $f = $(this);
//     var data = getFormObject($f);

//     $canvas.append(createElement(data));

//   });

//   $('#animate').on('click', function(e) {
//     e.preventDefault();

//     $canvas.find('div').each(animateElement());
//   });
// });




$(function() {
  var $canvas = $("#canvas");

  function getFormObject($f) {
    var o = {};

    $f.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });

    return o;
  }

  function createElement(data) {
    var $d = $("<div />", {
      "class": data.shape_type,
      data: data,
      css: {
        left: +data.start_x,
        top: +data.start_y
      }
    });

    return $d;
  }

  function animateElement() {
    var $e = $(this),
        data = $e.data();

    resetElement($e, data);
    $e.animate({
      left: +data.end_x,
      top: +data.end_y
    }, 1000);
  }

  function resetElement($e, data) {
    $e.css({
      left: +data.start_x,
      top: +data.start_y
    });
  }

  function stopAnimations() {
    $canvas.find("div").stop();
  }

  $("form").on("submit", function(e) {
    e.preventDefault();

    var $f = $(e.target),
        data = getFormObject($f),
        type = $f.find("[name=shape_type]").val();

    var $el = createElement(data);

    $canvas.append($el);
  });

  $("#animate").on("click", function(e) {
    e.preventDefault();

    stopAnimations();
    $canvas.find("div").each(animateElement);
  });

  $("#stop").on("click", function(e) {
    e.preventDefault();

    stopAnimations();
  });
});







