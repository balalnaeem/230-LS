// Write code that writes the number of direct and indirect childnodes for a parent
// 
// input: element id
// out: array [childNodes, indirect childNodes]
//
// algorithm:
//
// - first we get hold of the element for the given id
// - get the length of childNodes on that element = direct child nodes
// - iterate over the childNodes, get childNodes of each node
// - for that we will use the walk the DOM method
// - calculate all indirect nodes

function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    let currentNode = node.childNodes[i];
    walk(currentNode, callback);
  }
}

function childNodes(id) {
  let parentNode = document.getElementById(id);
  let indirectChildren = 0;
  walk(parentNode, node => {
    indirectChildren += 1;
  });
  indirectChildren = indirectChildren - parentNode.childNodes.length - 1;
  return [parentNode.childNodes.length, indirectChildren] 
}
