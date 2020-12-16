// in: id of an element
// out: two dimensional array
// 
// Rules:
// - subarrays will include the siblings of elements
// - starting from the current element and it's siblings
// - all the way to the main parent element that has an id of 1
// 
// Algorithm:
// - save the given element in a variable
// - get siblings of the current element
// - parent element becomes the current element
// - get sibling of the parent element
// - this process can go with the help of recursion
// - we stop when the id of the current element !== '1'
// - 
//
// - define a method that takes an id as an argument
// - save the element the id is referring to in a variable
// - call it currentEle
// - Loop here
// - get the siblings of the current element
// - push them into an array that will be returned at the end of the program
// - break out of loop here if the id on the currentElement is equal to '1'
// - now change the current element to the parent
// - Loop ends here
//
// PSEUDO CODE
// Function domTreeTrace(id)

// currentElement
// resultArr
// do while loop begins
// tempArr << currentEle.parent.children
// resultArr << tempArr
// currentEle = parent
//
// condition = currentElement.id = 1;
//
// loop ends
//
// return resultArr

function domTreeTrace(id) {
  let currentEle = document.getElementById(id);
  let resultArr = [];

  while (true) {
    let siblings = [].slice.call(currentEle.parentElement.children).map(node => node.tagName);
    resultArr.push(siblings);
    if (currentEle.id === '1') break;
    currentEle = currentEle.parentElement;
  }

  return resultArr;
}
