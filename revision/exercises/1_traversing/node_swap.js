/*

PROBLEM:
- write a function that takes two ids as arguments
- and swaps the position of the elements
- function returns true for valid swaps
- and returns undefined for invalid swaps
- nodes will have values for ids
- two arguments will always be provided

>> What is invalid swap? <<
- if the one of the nodes does not exist in the document
- and if the nodes have parent child relationship (can't swap a parent and a child)

in: two numbers (ids)
out: return true, or undefined depending on if the swap was valid

algorithm:
- first we need to check if both id's exist in the document
  - define a method validIds that returns a boolean
  - then we need to check if the nodes have parent child relationship (How)
- we can write a method that checks one node is in the child nodes of the other

- now we have algorithm to check if both ids are valid and if they have parent or child relationship
- now we need to figure out how to swap them

- I can clone the both elements
>> first element
>> second element

>> firtClone
>> secondClone

- now we can insert the second clone right before the first element
- delete the first element
- insert the first clone right after/before the second element
- delete the second element

I guess that is job done

PSEUDO CODE:
- validy checks done
- obtain element that have id1 => firstElement
- obtain element that have id2 => secondElement

- clone both elements clondNode(true)

- use insert adjacent element method

*/

function validIds(id1, id2) {
  let firstElement = document.getElementById(id1);
  let secondElement = document.getElementById(id2);

  return !!firstElement && !!secondElement;
}

function isParent(id1, id2) {
  let firstElement = document.getElementById(id1);
  let secondElement = firstElement.querySelector(`[id='${id2}']`);
  return !!secondElement;
}

function nodeSwap(id1, id2) {
  if (!validIds(id1, id2)) return undefined;
  if (isParent(id1, id2)) return undefined;
  if (isParent(id2, id1)) return undefined;

  let firstElement = document.getElementById(id1);
  let secondElement = document.getElementById(id2);
  let secondClone = secondElement.cloneNode(true);

  secondElement.insertAdjacentElement('afterend', secondClone);
  firstElement.insertAdjacentElement('beforebegin', secondElement);
  secondClone.insertAdjacentElement('beforebegin', firstElement);

  secondClone.remove();

  return true;
}


















