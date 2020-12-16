// required: a function that is like slice but for dom
// - takes two element id's as argument
// - first id is of the parent most node
// - second id is the child most node
// - returns an array of tag names staring from parent element
// - all the way to the child element
//
// Rules:
// - it's inclusive of the end index
// - end index does not have to be the inner most child, could be just a grandchild
// - only element nodes of course
// - elements inside body are sliceable
// - if id attr of start or end index element is not in the dom return undefined
// - if there is not feasible path between two indices, return undefined
// - 
//
// - AL:
// - get both elements by their ids
// - if any of them have a value of undefined, return undefined
// - if the start index is bigger than the end index, return undefine
// - if no feasible path, return undefined
// - all these conditioned satisfied, we can move forward with the code
// - The best way forward with this is to start from the inner most element, and get it's parent and work your way back
// we will use unshift in that case
// get tag name of the end index element
// insert that into the result array
// parent of end index element becomes the element
// get tag name of that and insert into result
// this process goes on until we reach the start index element
// when the id of the parent is the same as the start index element
// we break out of loop
//
// PSEUDO Code:
// - startEle
// - endEle
// - resultArr
// - return undefined if any condition fails
// - while loop
// - resultArr << tag name of endEle
// - if (endEle id === startEle id) break;
// - endEle = parent of endEle
// -
// - return resultArr
//
function sliceTree(startId, endId) {
  let startEle = document.getElementById(startId);
  let endEle = document.getElementById(endId);
  let resultArr = [];

  if (!startEle || !endEle) return undefined;
  if (!startEle.contains(endEle)) return undefined;

  while (true) {
    resultArr.unshift(endEle.tagName);
    if (endEle.id === startEle.id) break;
    endEle = endEle.parentElement;
  }

  return resultArr;
}
