function promiseAll(promises) {
  let result = [];
  let totalCount = promises.length;
  return new Promise((resolve, reject) => {
    const helperFunction = async (index) => {
      try {
        const newResult = await promises[index];
        result.push(newResult);
        if (result.length === totalCount) {
          resolve(result);
        } else {
          helperFunction(index + 1);
        }
      } catch (err) {
        reject(err);
      }
    };

    helperFunction(0);
  });
}

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

const taskList = [task(1000), task(5000), task(3000)];

promiseAll(taskList)
  .then((results) => {
    console.log("got results", results);
  })
  .catch(console.error);
