$(function() {
  var $slideshow = $('#slideshow');
  var $figures = $slideshow.find('figure');
  var $nav = $slideshow.find('ul');

  $nav.on('click', 'a', function(e) {
    e.preventDefault();
    var $li = $(e.currentTarget).closest('li');
    var index = $li.index();

    $figures.stop().filter(':visible').fadeOut(400);
    $figures.eq(index).delay(400).fadeIn(400);

    $nav.find('.active').removeClass('active');
    $li.addClass('active');
  });
});
