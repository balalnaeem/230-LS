// PROBLEM:
// - when the user clicks one of the navigation links:
//   - mean ul > li a
//   - the browser scrolls to that article in the main
//   - and adds the highlight class to it
//   - if another element already has highlight class,
//   - the browser removes the class from that element
// - when the user clicks on an article element or any of it's children
//   - the browser adds a highlight class to the article
//   - if another element already has highligh class,
//   - browser removes it
// - when the user clicks anywhere else on the page
//   - the browser adds highlight class to the main element
//   - if another element already has the class highight,
//   - the browser removes it
// 
// ALGORITHMM:
// - if I attach a single click event to the document
// - I can check if the event.target === anchor
// - if it is, i let the default behaviour happen,
// - extract the id from href
// - and add the highlight class to that article
// - if another element already has that class, I remove it
//
// - same way I can check, if the e.target === article
// - if it is, I add the class highlight to that article ofcourse
// - remove the previously added highlight first
//
// - and if the event.target is anything else that anchor or article
// - i add the highligh class to the main element and return
//
// otherwise I will have to add three different click events,
// - anchor, article and body I think
// - And I will have to worry about event bubbling
// - lets try the first approach first
//
document.body.addEventListener('click', function(event) {
	const target = event.target;
	let classed = document.querySelector('.highlight');
	let id;
	let article;

	if (classed) {
		classed.classList.remove('highlight');
	}
	
	if (target.tagName === 'A') {
		id = target.getAttribute('href');
		article = document.querySelector(id);
		article.classList.add('highlight');
		return;
	}

	if (target.parentElement.tagName === 'ARTICLE' || target.tagName === 'ARTICLE') {
		article = target.tagName === 'ARTICLE'? target : target.parentElement;
		article.classList.add('highlight');
		return;
	}

	document.querySelector('main').classList.add('highlight');
});
