function priorityResolve(promiseList) {
  return new Promise((resolve, reject) => {
    const helperFunction = async (promiseList, idx) => {
      if (idx === promiseList.length) {
        reject(new AggregateError([], "All promises rejected"));
        return;
      }
      try {
        const res = await promiseList[idx];
        resolve(res);
        return;
      } catch (err) {
        helperFunction(promiseList, idx + 1);
      }
    };

    helperFunction(promiseList, 0);
  });
}

// Input:
const p0 = new Promise((res, rej) => setTimeout(() => res("A"), 400));
const p1 = new Promise((res, rej) => setTimeout(() => res("B"), 100));
const p2 = new Promise((res, rej) => setTimeout(() => res("C"), 200));

priorityResolve([p0, p1, p2])
  .then(console.log)
  .catch((err) => {
    console.log(err);
  });

// Output:
// "A"

// Input:
// const p0 = new Promise((res, rej) => setTimeout(() => rej('A'), 400));
// const p1 = new Promise((res, rej) => setTimeout(() => res('B'), 100));
// const p2 = new Promise((res, rej) => setTimeout(() => res('C'), 200));

// priorityResolve([p0, p1, p2])
//   .then(console.log).catch(err => {console.log(err)});

// Output:
// "B"

// Input:
// const p0 = new Promise((res, rej) => setTimeout(() => rej('A'), 400));
// const p1 = new Promise((res, rej) => setTimeout(() => rej('B'), 100));
// const p2 = new Promise((res, rej) => setTimeout(() => rej('C'), 200));

// priorityResolve([p0, p1, p2])
//   .then(console.log).catch(err => {console.log(err)});

// Output:
// AggregateError: All promises rejected
