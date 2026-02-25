function pipe(...args) {
  const n = args.length;
  return function (val) {
    let result = args[0](val);
    for (let i = 1; i < n; i++) {
      result = args[i](result);
    }
    return result;
  };
}

const getSalary = (person) => person.salary
const addBonus = (netSalary) => netSalary + 1000;
const deductTax = (grossSalary) => grossSalary - (grossSalary * .3);

const result = pipe(
  getSalary,
  addBonus,
  deductTax 
)({ salary: 10000 });

console.log(result);
