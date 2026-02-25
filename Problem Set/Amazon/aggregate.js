function helperFunction(obj, list, index, value) {
  if (index === list.length - 1) {
    obj[list[index]] = value;
    return;
  }

  if (!obj[list[index]]) {
    obj[list[index]] = {};
  }
  helperFunction(obj[list[index]], list, index + 1, value);
}

function getValues(parentList) {
  let resultObj = {};

  parentList.forEach((element) => {
    const nameList = element.name.split(".");
    const value = element.value;
    helperFunction(resultObj, nameList, 0, element.value);
  });

  return resultObj;
}

console.log(
  getValues([
    { name: "foo.bat", value: 1 },
    { name: "foo.bar.baz", value: 2 },
    { name: "fizz", value: 3 },
  ])
);
