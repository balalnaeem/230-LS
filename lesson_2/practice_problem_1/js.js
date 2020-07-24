function makeLogger(number) {
  return function() {
    console.log(number)
  };
}

function dayLog() {
  let logger;
  for (let i = 1; i <= 10; i += 1) {
    logger = makeLogger(i);
    setTimeout(logger, i * 1000);
  }
}

function startCounting() {
  let counter = 0;
  return setInterval(() => {
    counter += 1;
    console.log(counter);
  }, 1000);
}

let counting = startCounting();