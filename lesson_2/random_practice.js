let id;

function startCounting() {
  let count = 1;
  id = setInterval(() => {
    console.log(count);
    count += 1;
  }, 1000)
}

startCounting();

function stopCounting() {
  clearInterval(id);
}

setTimeout(() => {
  stopCounting();
}, 10050)