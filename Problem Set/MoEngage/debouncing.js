const timer = document.querySelector("#time span");

setInterval(() => {
  timer.innerText = new Date().toLocaleString();
}, 1000);

const debounce = function (cb, timer) {
  let timeout = null;
  return function (...args) {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => cb.apply(context, args), timer);
  };
};

const btn = document.getElementById("test-btn");
btn.addEventListener(
  "click",
  debounce(function () {
    console.info("HOLA! Learnersbucket");
  }, 3000)
);
