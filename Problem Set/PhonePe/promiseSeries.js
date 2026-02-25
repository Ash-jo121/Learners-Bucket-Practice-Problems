function asyncSeriesExecuter(promiseList) {
  const helperFunction = async (promiseList, idx) => {
    if (idx === promiseList.length) {
      return;
    }
    try {
      const res = await promiseList[idx]();
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      helperFunction(promiseList, idx + 1);
    }
  };

  helperFunction(promiseList, 0);
}

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

asyncSeriesExecuter(promises);

Output: "Completing 3";
("Completing 1");
("Completing 7");
("Completing 2");
("Completing 5");
