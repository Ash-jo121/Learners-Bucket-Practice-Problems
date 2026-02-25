function helperFunction(obj, list, index) {
  if (index === list.length - 1) {
    return obj[list[index]];
  }

  if (!obj[list[index]]) {
    return undefined;
  }
  const newResult = helperFunction(obj[list[index]], list, index + 1);
  return newResult;
}

function getObject(obj, token) {
  let masterList = [];
  const dotList = token.split(".");
  dotList.forEach((element) => {
    const newList = element.split("[");
    masterList = [...masterList, ...newList];
  });

  masterList = masterList.filter((item) => item !== "");
  masterList = masterList.map((item) => {
    if (item[item.length - 1] === "]") {
      return Number(item.substring(0, item.length - 1));
    }
    return item;
  });

  const result = helperFunction(obj, masterList, 0);
  return result;
}

console.log(getObject({ developer: "Software Engineer" }, "developer")); // => 'Software Engineer'
console.log(
  getObject(
    { developer: { firstName: "Tom", lastName: "Cruz" } },
    "developer.lastName"
  )
); //=>'Cruz
console.log(
  getObject([{ developer: "Tom" }, { count: [0, 1] }], "[1].count[0]")
); //=>0
console.log(getObject([{ developer: "Tom" }, [0, null]], "[1][1]")); //=>null
