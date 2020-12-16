// PROBLEM:
// - implement a function that accept n callbacks
// - time allowed is n * 2 seconds
// - within allowed time, function calls each calllback at some random point
// - EXAMPLE:
// - if the caller provides 5 callbacks
// - you need to run them all, one by one, at a random time,  within 10 seconds
// -
// - so two things are being picked randomly
// - 1) which callback to call
// - 2) and at what time to call it
// 
// RULES:
// - while running, function should log the elapsed seconds
// - e.g. 1, 2, 3 ... n*2 
//
// - Input: n number of callbacks
// - Output: 1) log elaped time
//           2) call callback in random order at random time
//
// Algorithm:
// - first we need to define a method that will a random callback for us
// - then we need a function that will pick a random time for that function to be called
// - then we need a loop
// - inside the loop on each iteration, 
// - we will pass in the callback and time to the setTimeout
// -
// - a for loop for loggig the elapsed time
// - on each iteration pass in a function that logs i after i seconds until n seconds

function getRandomNum(num) {
	return Math.floor(Math.random() * num) + 1;
}

function randomizer() {
	let callbacksArr = [].slice.call(arguments);
	const seconds = callbacksArr.length * 2;

	callbacksArr.forEach(callback => {
		setTimeout(callback, getRandomNum(seconds) * 1000);
	});

	for (let i = 1; i <= seconds; i += 1) {
		setTimeout(() => console.log(i), i * 1000);
	}
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

