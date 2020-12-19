$(function() {
	let timer;

	$('img').on('mouseover', function(event) {
		let $img = $(this);
		
		timer = setTimeout(function(event) {
			$img.next('figcaption').fadeIn(300);
		}, 1500);
	});

	$('img').on('mouseleave', function() {
		if (timer) { clearTimeout(timer); }
		$(this).next('figcaption').fadeOut(300);
	});
});

