/*
- write a function
- that loops through the numbers from 1 to 10
- and logs each number after that number of seconds
- so logs 1 after 1 second and 2 after 2 seconds and 8 after 8 seconds
- computation of time is not dependant on when the previous number was logged
- so for of 10 numbers, a total 10 seconds will pass
*/

function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => console.log(i), 1000 * i);
  }
}

let stopId;

function startCounting() {
  let number = 0;

  function oneUp() {
    number += 1;
    console.log(number);
  }

  stopId = setInterval(oneUp, 1000);
}

function stopCounting() {
  setTimeout(() => clearInterval(stopId), 10000);
}