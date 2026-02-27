function circuitBreaker(fn, failureCount, timeThreshold) {
  let attempts = 0;
  let timeSinceLastFailure = 0;

  return function (...args) {
    if (isClosed) {
      const diff = Date.now() - timeSinceLastFailure;

      if (diff > timeThreshold) {
        isClosed = false;
      } else {
        console.error("Service unavailable");
        return;
      }
    }

    try {
      const result = fn(...args);
      failures = 0;
      return result;
    } catch (error) {
      failures++;
      timeSinceLastFailure = Date.now();
      if (failures >= failureCount) {
        isClosed = true;
      }

      console.log("Error");
    }
  };
}
