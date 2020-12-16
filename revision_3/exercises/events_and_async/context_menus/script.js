const main = document.querySelector('main');
const sub = document.querySelector('section');

main.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	alert('main');
});

sub.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	e.stopPropagation();
	alert('sub');
});
