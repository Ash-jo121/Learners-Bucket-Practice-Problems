function solve(...args) {
  let resultString = "";
  const helperFunction = (obj, idx) => {
    if (typeof obj[idx] === "string") {
      return `${obj[idx]} `;
    } else if (!obj[idx]) {
      return "";
    } else if (typeof obj[idx] === "boolean") {
      return obj[idx] ? `${idx} ` : "";
    } else if (obj[idx] === 1) {
      return 1;
    } else if (typeof obj[idx] === "object") {
      let result = "";
      for (let key in obj[idx]) {
        let temp = helperFunction(obj[idx], key);
        result = result + `${temp} `;
      }
      return result;
    }
  };

  for (let i = 0; i < args.length; i++) {
    let temp = helperFunction(args, i);
    resultString = resultString + temp;
  }
  return resultString;
}

console.log(solve("foo", "bar"));
console.log(solve("foo", { bar: true }));
console.log(solve({ "foo-bar": false }));
console.log(solve("foo", { bar: true, duck: false }, "baz", { quux: true }));
console.log(solve(null, false, "bar", undefined, 0, 1, { baz: null }, ""));

// classNames("foo", "bar"); // => 'foo bar'
// classNames("foo", { bar: true }); // => 'foo bar'
// classNames({ "foo-bar": true }); // => 'foo-bar'
// classNames({ "foo-bar": false }); // => ''
// classNames({ foo: true }, { bar: true }); // => 'foo bar'
// classNames({ foo: true, bar: true }); // => 'foo bar'

// // lots of arguments of various types
// classNames("foo", { bar: true, duck: false }, "baz", { quux: true }); // => 'foo bar baz quux'

// // other falsy values are just ignored
// classNames(null, false, "bar", undefined, 0, 1, { baz: null }, ""); // => 'bar 1'

const arr = ["b", { c: true, d: false }];
console.log(solve("a", arr)); // => 'a b c'

// let buttonType = "primary";
// classNames({ [`btn-${buttonType}`]: true });
