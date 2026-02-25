const test = (testCase, cb) => {
  const result = cb();
  if (result) {
    return `Pass ${testCase}`;
  } else {
    return `Fail ${testCase}`;
  }
};

const expect = (testInput) => {
  return {
    toBe: (testOutput) => {
      return testInput === testOutput;
    },
    toBeUndefined: () => {
      return testInput instanceof undefined;
    },
    not: {
      toBe: (testOutput) => {
        return !(testInput === testOutput);
      },
      toBeUndefined: () => {
        return !(testInput instanceof undefined);
      },
    },
  };
};
