var moveZeroes = function (nums) {
  let i = 0;
  let j = i;
  let n = nums.length;

  while (i < n && j < n) {
    if (nums[i] !== 0) {
      i++;
    } else {
      j = i;
      while (j < n && nums[j] === 0) {
        j++;
      }
      if (j < n) {
        let t = nums[i];
        nums[i] = nums[j];
        nums[j] = t;
        i++;
      }
    }
  }
  return nums;
};

console.log(moveZeroes([0]));
