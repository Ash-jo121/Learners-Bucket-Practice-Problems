export function sampler(func, count) {
  let counter = 1;
  return function () {
    if (counter === count) {
      func();
      counter = 1;
    } else {
      counter++;
    }
  };
}

function message() {
  console.log("hello");
}
const sample = sampler(message, 4);
sample();
sample();
sample();
sample(); // this will be executed
sample();
sample();
sample();
sample(); // this will be executed
