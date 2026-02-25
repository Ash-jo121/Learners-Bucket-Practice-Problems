export function arrayIterator(arr) {
  let counter = 0;
  let arrLength = arr.length;
  return {
    next: () => {
      if (counter < arrLength) {
        const val = arr[counter];
        counter++;
        return val;
      } else {
        return null;
      }
    },
    done: () => {
      return counter === arrLength;
    },
  };
}

const iterator = arrayIterator([1, 2, "hello"]);

console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
console.log(iterator.done()); // false
console.log(iterator.next()); // "hello"
console.log(iterator.done()); // true
console.log(iterator.next()); // "null"
