function startCounting() {
  let count = 0;
  return setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}

let id = startCounting();

setTimeout(() => clearInterval(id), 10064);