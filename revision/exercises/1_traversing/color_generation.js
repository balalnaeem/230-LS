/*
in: num
out: color the target generations

rules:
- generation of elements are all at the same depth starting from body
- for example body's children are the first generation
- first generations' children are the second generation

algorithm:
- targetGen = [];
- generations start from document.body
- firstGen = document.body.children
- secondGen = document.body.children.children
*/

function colorGeneration(num) {
  let currentGen = [document.body];
  let nextGen = [];

  for (let i = 0; i < num; i += 1) {
    nextGen = currentGen.flat()
                .map(ele => [].slice.call(ele.children))
                .flat();
    currentGen = nextGen;
  }

  nextGen.forEach(ele => ele.classList.add('generation-color'));
}
