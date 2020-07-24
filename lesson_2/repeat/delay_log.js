// function name delayLog
// loops through numbers from 1 to 10
// logs each number after that number of seconds
// e.g. should log 1 after 1 seconds, 2 after 2 seconds
// time counted from the start of course
// computation of time is not dependant when the previous number was logged

function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => console.log(i), i * 1000);
  }
}

delayLog();