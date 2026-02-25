function flatten(arr) {
  let result = [];
  if (typeof arr !== "object") {
    result = [...result, arr];
    return result;
  }
  for (let item in arr) {
    const items = flatten(arr[item]);
    result = [...result, ...items];
  }
  return result;
}

console.log(
  flatten([
    [[1, [1.1]], 2, 3],
    [4, 5],
  ])
);
