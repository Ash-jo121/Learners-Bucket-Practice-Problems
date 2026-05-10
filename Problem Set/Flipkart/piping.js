function pipe(obj) {
  return function (...args) {
    function execute(obj) {
      for (let key in obj) {
        if (obj[key] instanceof Function) {
          obj[key] = obj[key](...args);
        } else if (obj[key] instanceof Object) {
          execute(obj[key]);
        }
      }
    }
    execute(obj);
    return obj;
  };
}

// Input:
const obj = {
  a: {
    b: (a, b, c) => a + b + c,
    c: (a, b, c) => a + b - c,
  },
  d: (a, b, c) => a - b - c,
};

const output = pipe(obj)(1, 1, 1);
console.log(output);

// Output:
// {
//   a : {
//     b : 3,
//     c : 1
//   },
//   d: -1
// }
