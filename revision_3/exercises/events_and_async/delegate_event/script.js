// PROBLEM:
// - implement a functoin named delegateEvents
// - that delegates events (surprise) to the descendants of a parent
// - descendants that match a given selector
// - takes 4 arguments
// - returns true if successful
// - returns undefined if not successful
//
// Input: 4 arguments
//        - parentElement
//        - selector
//        - eventType
//        - callback
// Output: true or undefined
//
// AL:
// - define a function delegateEvents
// - if the parent element does not exist, return undefined -end
// - if it does exist, add the eventType to the parent element
// - inside the callback, get the child element
// - add the eventType listener which is going to be callback

function delegateEvent(parent, selector, eventType, callback) {
	if (!parent) { return undefined; }

	parent.addEventListener(eventType, function(e) {
		let children = parent.querySelectorAll(selector);
		children = [].slice.call(children);
		if (children.includes(e.target)) {
			callback(e);
		}
	});
}

const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};
