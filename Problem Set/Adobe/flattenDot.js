function solve(input) {
  var result = {};
  helperFunction(input, "", result);
  return result;
}

function helperFunction(input, str, result) {
  for (let key in input) {
    if (typeof input[key] !== "object") {
      if (str === "") {
        result[key] = input[key];
      } else {
        result[`${str}.${key}`] = input[key];
      }
    } else {
      if (str === "") {
        helperFunction(input[key], `${key}`, result);
      } else {
        helperFunction(input[key], `${str}.${key}`, result);
      }
    }
  }
}

const nested = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

console.log(solve(nested));
