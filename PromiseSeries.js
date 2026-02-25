const series = (inputs) => {
  inputs.forEach(async (input) => {
    try {
      const result = await input();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
};

const asyncTask = function (i) {
  return function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(`Completing ${i}`), 100 * i);
    });
  };
};

const promises = [
  asyncTask(3),
  asyncTask(1),
  asyncTask(7),
  asyncTask(2),
  asyncTask(5),
];

series(promises);
