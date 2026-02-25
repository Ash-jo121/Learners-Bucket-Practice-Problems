// Input:
// callback based async task
async function fakeSearchCb(query, cb) {
  console.log(` started: ${query}`);

  // mocks async action, where callback is invoked after a delay.
  const id = setTimeout(() => {
    console.log(` completed: ${query}`);
    cb(null, `result for "${query}"`);
  }, 2000);
}

function memoizeCallback(cb) {
  let s = new Set();
  let queue = [];
  let running = false;
  return async function (query, secondCallback) {
    let context = this;
    if (!s.has(query)) {
      running = true;
      s.add(query);
      await cb.apply(context, [query, secondCallback]);
      running = false;
      queue.forEach((item) => {
        item(query);
      });
    } else {
      if (running) {
        queue.push(secondCallback);
      } else {
        secondCallbacka(query);
      }
    }
  };
}

// Output:
const searchMemo = memoizeCallback(fakeSearchCb);

searchMemo("react", console.log); // first call, cache miss, takes time
searchMemo("react", console.log); // second call, cache hit, returns instantly

// Input:
// function fakeSearch(query) {
//   return new Promise((resolve, reject) => {
//     console.log(` started: ${query}`);

//     const timeoutId = setTimeout(() => {
//       console.log(` completed: ${query}`);
//       resolve(`result for "${query}"`);
//     }, 2000);
//   });
// }

// Output:
// const searchMemo = memoizeAsync(fakeSearch);

// searchMemo("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // first call, cache miss, takes time

// setTimeout(() => {
//   searchMemo("react").then((val) => {console.log(val)}).catch((err) => {console.error(err)}); // second call, cache hit, returns instantly
// }, 2500);
