$(function() {
  $('body').prepend($('main + header'));
  $('body header').prepend($('h1').first());
  $('article').append($('figure').first());
  $('article').append($('figure').last());
  $('figure').last().append($('img').first());
  $('figure').first().append($('img').first());

});