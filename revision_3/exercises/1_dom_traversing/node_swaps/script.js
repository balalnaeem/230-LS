// REQUIRED:
// - write a function that takes two element ids as arguments
// - and swap the position of the elements represented by the ids
//
// RULES:
// - function returns true for valid swaps
// - and undefined for invalid swaps
// - two arguments will always be provided
// - if atleast one of the id attributes does not exist, return undefined (invalid swap);
// - if one of the node is child of the other, return undefined (invalid swap)
//
// input: two numbers
// output: true of undefined, depending on if the swap is successful
//
// AL:
// - first get the element nodes with getElementById (not querySelector)
// - GUARD CONDITION: check if the both element exists
// - GUARD CONDITION: check if one node contains the other node (node.contains(otherNode));
// - if all conditions are passed, that means we are ready for swap
//
// - clone node1
// - insert the cloned node beside adjacent to node 2
// - insert the node2 beside adjacent to node1
// - remove node1
// - return true;

function nodeSwap(id1, id2) {
	let node1 = document.getElementById(id1);
	let node2 = document.getElementById(id2);
	let clone1;

	if (!node1 || !node2) { return undefined; }
	if (node1.contains(node2) || node2.contains(node1)) { return undefined; }

	clone1 = node1.cloneNode(true);

	node2.insertAdjacentElement('afterend', clone1);
	node1.insertAdjacentElement('afterend', node2);
	node1.remove();

	return true;
}
