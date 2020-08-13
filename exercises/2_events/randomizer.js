/*
  - write a randomizer function

in: a certain number of callbacks, lets say n callbacks
out: nothing

rules:
  - call each callback at random times in total time that is allowed
  - time that is allowed starts now and ends at (number of callbacks) * 2  seconds
  - so if we are given 3 callback, total time we have is 6 seconds

algorithm:
- within allowed time, we pick n random spot
  (if time is 6 seconds, latest callback should be before 6, so limit is really 5)
- on those spots run the callbacks

- fist thing, we will figure out how many callbacks do we have
  - arguments.length
  - then we start a for loop
  - i = 0; i < arguments.length; i += 1
  - inside the loop we get a random number that is within the time limit (time limit should be calculated before the loop starts)
  - so on each iteration we get a random time
  - and call setTimeout with that time, and the the current callback
*/

function randomizer(callbacks) {
  let totalSeconds = arguments.length * 2;
  let currentCallback;
  let randomTime;

  for (let i = 1; i <= totalSeconds; i += 1) {
    setTimeout(() => console.log(i), i * 1000);
  }

  for (let i)
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

randomizer(callback1, callback2, callback3);