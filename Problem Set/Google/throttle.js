function throttle(func, wait) {
  // your code here
  let flag = true;
  return function () {
    if (flag) {
      func();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, wait);
    }
  };
}
