function cachedApiCall(timeout) {
  let flag = true;
  let result = new Map();
  return function (url, body) {
    return new Promise((resolve, reject) => {
      if (!flag) {
        const res = result.get(url);
        resolve(res);
        return;
      }

      flag = false;
      setTimeout(() => {
        result.delete(url);
        flag = true;
      }, timeout);
      fetch(url)
        .then((data) => data.json())
        .then((res) => {
          result.set(url, res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  };
}

const call = cachedApiCall(1500);

call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log(a)
);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 700);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log(a)
  );
}, 2000);
