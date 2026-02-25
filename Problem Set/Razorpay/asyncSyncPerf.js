async function measurePerformance(
  fn,
  { name, iterations, warmup = true, logResults = true }
) {
  const type = fn.constructor.name;
  let result;
  let max = -10000;
  let min = 10000;
  let avg = 0;
  if (warmup)
    type === "AsyncFunction" ? (result = await fn()) : (result = fn());
  for (let i = 0; i < iterations; i++) {
    let x = Date.now();
    type === "AsyncFunction" ? await fn() : fn();
    let y = Date.now();
    console.log(x, y);
    let time = y - x;
    max = Math.max(max, time);
    min = Math.min(min, time);
    avg += time;
  }
  console.log(avg);
  avg = avg / iterations;

  console.log(`Performance Results for ${name}
    ---------------------------------
    Type: ${type}
    Iterations: ${iterations}
    Average: ${avg}ms
    Min:${min}ms
    Max:${max}ms
    ${logResults ? `Result:${result}` : ""}
    `);
}

const asyncFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return "done";
};

// measure performance of the async function
measurePerformance(asyncFunction, {
  name: "Async Calculation",
  iterations: 5,
  warmup: true,
});
