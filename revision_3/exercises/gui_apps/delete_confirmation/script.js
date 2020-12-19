$(function() {
	let todoItems = [
		{ id: 1, title: 'Homework' },
		{ id: 2, title: 'Shopping' },
		{ id: 3, title: 'Calling Mom' },
		{ id: 4, title: 'Coffee with John '}
	];
	const $list = $('#list');
	const $modalLayer = $('#modal-layer');
	const $contextmenu = $('#contextmenu');

	todoItems.forEach(itemObj => {
		let $todo = $('<li>')
		              .text(itemObj.title)
			            .append($('<span class="close">&#x274C;</span>'));
		$list.append($todo);
	});

	$('.close').on('click', function(event) {
		let $todo = $(this).parent('li');
		$modalLayer.show();

		$modalLayer.on('click', function(event) {
			if (event.target.id === 'btn-yes') {
				$modalLayer.hide();
				$todo.remove();
			} else if (event.target.id === 'btn-no' || event.target.id === 'modal-layer') {
				$modalLayer.hide();
			}
		});
	});

	$list.find('li').on('contextmenu', function(event) {
		event.preventDefault();

		let $item = $(this);
		
		$contextmenu.css({
			left: event.clientX,
			top: event.clientY - 16,
			display: 'block',
		});
		
		$(document).on('click', function(event) {
			if (event.target.id === 'delete') {
				$contextmenu.hide();
				$item.find('.close').click();
			} else {
				$contextmenu.hide();
			}
		});
	});
});
