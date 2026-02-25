function solve(obj, result, ind) {
  let str = "";
  let count = 0;
  for (let i = 0; i < ind; i++) {
    str = str + "\t";
  }
  for (let x in obj) {
    let val = obj[x];
    if (x === "name") {
      str = str + val;
    } else if (x === "children") {
      let descendants = 0;
      for (let child of val) {
        descendants += solve(child, result, ind + 1);
      }
      str =
        str +
        ` (Level: ${ind}, Direct: ${val.length}, Total Descendants: ${descendants})`;
      count += descendants;
      result.push(str);
    } else {
      let descendants = solve(val, result, ind);
      count = descendants;
    }
  }
  return count + 1;
}

const sampleData = [
  {
    name: "Root 1",
    children: [
      {
        name: "Child 1.1",
        children: [
          { name: "Grandchild 1.1.1", children: [] },
          {
            name: "Grandchild 1.1.2",
            children: [{ name: "Great-grandchild 1.1.2.1", children: [] }],
          },
        ],
      },
      { name: "Child 1.2", children: [] },
    ],
  },
  {
    name: "Root 2",
    children: [
      {
        name: "Child 2.1",
        children: [
          { name: "Grandchild 2.1.1", children: [] },
          { name: "Grandchild 2.1.2", children: [] },
        ],
      },
    ],
  },
  {
    name: "Root 3",
    children: [],
  },
];

let lt = [];
const count = solve(sampleData, lt, 0);
for (let l of lt) {
  console.log(l);
}
