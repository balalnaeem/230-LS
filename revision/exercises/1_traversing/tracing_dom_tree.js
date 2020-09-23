// in: id numeric value
// out: an array of arrays

// algorithm:
  // - declare an empty array
  // - locate the element with a given id
  // - get all its siblinngs
  // - iterate over the siblings and iterate their node tagName into an array
  // - insert that array into our main empty array
  // - now check if the elements id is 1, if it is not, go to the next iteration of the loop
  // - if the id is 1, break out of the loop
  // - return the main array

function domTreeTracer(id) {
  let result = [];
  let element = document.getElementById(id);

  while (id > 1) {
    let siblings = element.parentElement.children;
    siblings = [].slice.call(siblings);
    siblings = siblings.map(ele => ele.tagName);
    result.push(siblings);
    element = element.parentElement;
    id = element.id;
  }
  result.push([element.tagName]);
  return result;
}

// function domTreeTracer(id) {
//   let currentElement = document.getElementById(id);
//   let parentElement;
//   const domTree = [];

//   do {
//     parentElement = currentElement.parentNode;
//     let children = getTagNames(parentElement.children);
//     domTree.push(children);

//     currentElement = parentElement;
//   } while (parentElement.tagName !== 'BODY');

//   return domTree;
// }

// function getTagNames(htmlCollection) {
//   const elementsArray = Array.prototype.slice.call(htmlCollection);
//   return elementsArray.map(({tagName}) => tagName);
// }

/*
in: start_index, end_index
out: array of tagNames

Rules:
- start_index is the parent node's id attribute
- end_index is the innermost child node'd id attribute
- inclusive of the end_index
- the end_index may not be the id of the innermost child
- only consider child nodes
- only body's descendants are sliceable
- if the id attribute of either start_index or end_index is not in the dom, return undefined
- if slice is not feasible, if there is not direct path between the start_index and end_index, return undefined
- if end_index is not in the descendants of start_index, return undefined
- start_index is bigger than the end_index, return undefined

Algorithm:
- define a method that checks if the start_index or end_index is in the DOM
    - validId(id)
- define a method that checks if the end_index is in the descendants of the start-index element
    - validPath(start, end)
- at this point we are good to go and start getting the tagNames of the elements
- we will start with the end_index and work way out to the start
- get the element that has the id of end_index
- get this element's tag name and insert it into our result array
- and now the element would be parent
- we will carry that on until the current element is body, then we will break the loop
- and return the result array

PSEUDO:
- if (!validId(start_id)) return undefined;
- if (!validId(end_id)) return undefined;
- if (!validPath(start_id, end_id));
- let resultArr = [];
- currentElement = document.getElementById(end_id);

- START LOOP
  - result <-- PUSH (currentElement.tagName);
  - currentElement = currentElement.parentElement;
- END LOOP if currentElement.tagName === BODY
- return resultArr
*/

function validIds(start_id, end_id) {
  let element1 = document.getElementById(start_id);
  let element2 = document.getElementById(end_id);
  return !!element1 && !!element2;
}

function validPath(start_id, end_id) {
  if (start_id > end_id) return false;
  if (start_id === end_id) return false;

  let current = document.getElementById(end_id).parentElement;

  while (current.tagName !== 'BODY') {
    if (current.id === String(start_id)) return true;
    current = current.parentElement;
  }

  return false;
}

function sliceTree(start_id, end_id) {
  if (!validIds(start_id, end_id)) return undefined;
  if (!validPath(start_id, end_id)) return undefined;

  let resultArr = [];
  let current = document.getElementById(end_id);

  while (+current.id >= start_id) {
    resultArr.unshift(current.tagName);
    current = current.parentElement;
  }

  return resultArr;
}



































