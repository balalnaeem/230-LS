export let items = [];
export let counter = 0;

export function bar() {
  counter += 1;
  items.push(`item ${counter}`);
}

export function getCounter() {
  return counter;
}

