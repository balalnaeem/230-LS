/*
PROBLEM:
- define a function that converts DOM starting from body to nested arrays
- Each element in the DOM is represented as follows
[element_tagName, [children]]
- so each element has it's tagName, and it's children next to it in an array, and all this is wrapped in an array as well
- if an element has no children it is represented as follows
- [element_tagName, [children]]
- for Example if the body does not have any elements in it
- ["BODY", []]
- and if the HTML only have one element div, it would be represeted as follows
- ["BODY", [
            ["DIV", []]
           ]
  ]