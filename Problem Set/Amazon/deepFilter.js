function helperFunction(obj, fn) {
  if (typeof obj !== "object") {
    const val = fn(obj);
    if (val) {
      return obj;
    }
    return null;
  }

  //Recursive Case
  let resObj = {};
  for (let key in obj) {
    const val = helperFunction(obj[key], fn);
    if (val !== null) {
      resObj[key] = val;
    }
  }
  if (Object.keys(resObj).length === 0) {
    return null;
  }
  return resObj;
}

function deepFilter(obj, fn) {
  const result = helperFunction(obj, fn);
  return result;
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: -3,
    e: {
      f: {
        g: -4,
      },
    },
    h: {
      i: 5,
      j: 6,
    },
  },
};

const func = (n) => n >= 0;

console.log(deepFilter(obj, func));
