$(function() {
  let $blinds = $('[id^=blind]');
  let speed = 400;
  let delay = 1500;

  function startAnimation() {
    $blinds.each(function(i) {
      let $blind = $blinds.eq(i);
      $blind.delay(speed + (delay * i)).animate({
	top: "+=" + $blind.height(),
	height: 0, 
      }, speed);
    });
  }

  $('a').on('click', function(e) {
    e.preventDefault();
    $blinds.finish();
    $blinds.removeAttr('style');
    startAnimation();
   });

  startAnimation();
});
