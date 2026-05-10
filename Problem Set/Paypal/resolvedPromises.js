function sumResolvedPromises(arr) {
  return new Promise(async (resolve, reject) => {
    async function execute(idx, successCount, failureCount) {
      if (idx === arr.length) {
        if (failureCount === arr.length) {
          reject("All promises rejected");
        } else {
          resolve(successCount);
        }
        return;
      }
      try {
        const val = await arr[idx];
        execute(idx + 1, successCount + val, failureCount);
      } catch (err) {
        execute(idx + 1, successCount, failureCount + 1);
      }
    }

    await execute(0, 0, 0);
  });
}

// ✅ Mix of resolved and rejected → sum of resolved
const p1 = [
  Promise.resolve(10),
  Promise.reject("error"),
  Promise.resolve(20),
  Promise.reject("fail"),
  Promise.resolve(5),
];
sumResolvedPromises(p1).then(console.log).catch(console.error);
// → 35

// ✅ All resolve → sum of all
const p2 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
sumResolvedPromises(p2).then(console.log).catch(console.error);
// → 6

// ❌ All reject → triggers catch
const p3 = [
  Promise.reject("err1"),
  Promise.reject("err2"),
  Promise.reject("err3"),
];
sumResolvedPromises(p3).then(console.log).catch(console.error);
// → "All promises rejected"

// ✅ Single resolve among many rejections
const p4 = [Promise.reject("x"), Promise.resolve(42), Promise.reject("y")];
sumResolvedPromises(p4).then(console.log).catch(console.error);
// → 42
