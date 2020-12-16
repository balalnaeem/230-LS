function nodesToArray() {
	return getChildren(document.body);
}

function getChildren(node) {
	return [node.tagName, [...node].map(getChildren);
}
