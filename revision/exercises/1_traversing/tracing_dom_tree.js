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

console.log(domTreeTracer(2));