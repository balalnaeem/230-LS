$(function() {
  let $blinds = $('[id^=blind]');
  let speed = 250;
  let inintialDelay = 250;
  let delay = 1500;

  function startAnimation() {
    $blinds.each(function(i) {
      let $blind = $blinds.eq(i);
      $blind.delay(delay * i + inintialDelay).animate({
        top: "+=" + $blind.height(),
        height: 0,
      }, speed);
    });
  }

  $('a').click(function(e) {
    e.preventDefault();
    $blinds.finish();
    $blinds.removeAttr('style');
    startAnimation();
  });

  startAnimation();
});