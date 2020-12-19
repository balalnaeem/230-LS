$(function() {
	$('button.show').on('click', function(e) {
		$(this).prev('p').find('span').toggle();
		$(this).next().show();
		$(this).hide();
	});

	$('button.hide').on('click', function(e) {
		$(this).prev().prev('p').find('span').toggle();
		$(this).prev().show();
		$(this).hide();
	});
});
