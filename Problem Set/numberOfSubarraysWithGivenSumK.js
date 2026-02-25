/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraySum = function (nums, k) {
  let prefixArr = [];
  let sum = 0;
  let mp = {};
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    sum = sum + nums[i];
    prefixArr.push(sum);
    if (!mp[sum.toString()]) {
      mp[sum.toString()] = 1;
    } else {
      mp[sum.toString()]++;
    }
  }

  for (let i = 0; i < prefixArr.length; i++) {
    if (prefixArr[i] === k) {
      result++;
    }
    mp[prefixArr[i].toString()]--;
    if (mp[(prefixArr[i] + k).toString()]) {
      result = result + mp[(prefixArr[i] + k).toString()];
    }
  }

  return result;
};

console.log(subarraySum([1, 1, 1], 2));
console.log(subarraySum([1, 2, 3], 3));
console.log(subarraySum([1, 2, 2, 2, 3, 3, 3], 9));
console.log(subarraySum([-1, -1, -1, -1, -1, -1], -1));
