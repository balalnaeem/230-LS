//  in: number
//  out: color the required generation
 
// Rules:
//- expect that you will always receive a positive integer
//- if you are given 0 or a number for which no generations exist, do not
// color any generation
//
// ALG:
// - we start from the body and get all child elements of the body
// - this will give us the first generation of child elements
// - then if we need to go to the second generation, we can get the 
// children of the current generation
// - once we have the desired generation, we can add class to all of them
// - in order to avoid errors, at every step we have to check whether the current
// generation element has returned any children at all or just undefined
//
// PSEUDO CODE:
//
// FUNCTION colorGeneration(number)
//   CUURENT GENERATION = document.body
//   NEXT GENERATION;
//
//   FOR LOOP x number
//     NEXT GENERATION = CURRENT GENERATION .children
//     CURRENT GENERATION = NEXT GENERATION
//   END LOOP
//
//   CURRENT GENERATION forEach loop
//     add class to every element
//   END forEach

function colorGeneration(id) {
	let currentGeneration = [document.body];
	let nextGeneration;

	for (let i = 0; i < id; i++) {
		nextGeneration = currentGeneration.flatMap(ele => {
			return [].slice.call(ele.children);
		});
		currentGeneration = nextGeneration;
	}

	if (currentGeneration[0] !== document.body) {
		currentGeneration.forEach(ele =>  ele.classList.add('generation-color'));
	}
}
