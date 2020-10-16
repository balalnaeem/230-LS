$(function() {
  let $blinds = $('[id^=blind]');
  let speed = 250;
  let delayPerAnimation = 1500;
  let totalDelay;

  function startAnimation() {
    $blinds.each(function(index) {
      let $blind = $blinds.eq(index);
      totalDelay = (delayPerAnimation * index) + speed;

      $blind.delay(totalDelay).animate({
        top: '+=' + $blind.height(),
        height: 0,
      }, speed);
    });
  }

  $('button').on('click', function(e) {
    $blinds.finish();
    $blinds.removeAttr('style');

    startAnimation();
  });

  startAnimation();
});