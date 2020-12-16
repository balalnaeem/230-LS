// PROBLEM:
// - implement a function that takes an array of nested node names
// - and create html elements from them
// - convert nodesNames into nodes
// example:
// nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
//
// arrayToNodes(nodes);
//
// return value:
//
// <body>
//  <header></header>
//  <main></main>
//  <footer></footer>
// </body>
//
// AL:
// - first we iterate over the array because it has to be an iteration
// - we get the parent element by arr[0]
// - create an element with the tag name
// - we check if there are any children (by checking if arr[1] has length > 0)
// - we iterate over the children and get the direct child by childArr[0]
// - create an element and append that to the parent
// - and then we check if the child has any children
// - this is where recursion would start

function arrayToNodes(arr) {
	const parent = document.createElement(arr[0]);
	const children = arr[1];
	
	if (children.length === 0) {
		return parent;
	} else {
		children.forEach(child => parent.appendChild(arrayToNodes(child)));
	}

	return parent;
}


