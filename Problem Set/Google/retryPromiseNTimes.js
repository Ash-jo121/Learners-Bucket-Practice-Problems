function retryWithDelay(
  promise,
  retries = 3,
  delay = 50,
  finalError = "Failed"
) {
  const helperFunction = (index) => {
    if (index > retries) {
      return finalError;
    }
    promise()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        setTimeout(() => {
          helperFunction(index + 1);
        }, delay);
      });
  };

  return helperFunction(1);
}

const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};

// Test the code
const test = async () => {
  await retryWithDelay(getTestFunc(), 10);
  console.log("success");
  await retryWithDelay(getTestFunc(), 3);
  console.log("will fail before getting here");
};

// Print the result
test().catch(console.error);
