// PROBLEM:
// - implement a function that makes an element bold and allows the user to do something with the element
//
// INPUT: element, a callback function that takes the element as an argument
// OUT: make the element bold, and call the callback
//
// AL:
// - define a function that takes an element and a callback as arguments
// - element is basically a dom element so we can just set the font weight on the element to be bold
// - and we can just invoke the callback and pass in the element as argument and let the user do whatever they want with the element
//

function makeBold(ele) {
	ele.style.fontWeight = 'bold';

	const event = new CustomEvent('bolded');
	ele.trigger('bolded');
}

let sectionEle = document.querySelector('section');

sectionEle.addEventListener('bolded', function(e) {
	alert(e.target.tagName);
	e.target.classList.add('highlight');
});

makeBold(sectionEle);
