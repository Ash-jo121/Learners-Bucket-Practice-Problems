let arr = [1, 2, 3, 4];

Array.prototype.myReduce = function (cb, initialValue) {
  if (this.length === 0 && initialValue === undefined) {
    return new TypeError("InitialValue does not exist in this!");
  }
  let startIndex = 0;
  let acc = 0;
  if (initialValue === undefined) {
    startIndex = 1;
    acc = this[0];
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }

  return acc;
  //   let acc = initialValue ?? this[0];
  //   for (let i = 0; i < this.length; i++) {
  //     acc = cb(acc, this[i]);
  //   }
  //   return acc;
};

const sum = arr.myReduce((previousValue, currentValue) => {
  const nextValue = previousValue + currentValue;
  return nextValue;
});

const product = arr.myReduce((previousValue, currentValue) => {
  const nextValue = previousValue * currentValue;
  return nextValue;
}, 1);

console.log(product);
// 24

console.log(sum);
// 10

// // verbose
// arr.reduce(callbackfn, initialValue);

// // simplified
// // callback function with parameters
// arr.reduce((previousValue, currentValue, currentIndex, array) => {
//   const nextValue = previousValue + currentValue;
//   return nextValue;
// }, initialValue);
