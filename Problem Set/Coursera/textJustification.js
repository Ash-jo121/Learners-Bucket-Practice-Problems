/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = function (words, maxWidth) {
  let result = [];
  let i = 0;
  let tSum = 0;
  let temp = 0;
  let sList = [];
  while (i < words.length) {
    if (tSum > maxWidth) {
      if (tSum - 1 === maxWidth) {
        let s = "";
        for (let j = 0; j < i; j++) {
          s = s + words[j] + " ";
        }
        s.slice(0, s.length - 1);
        result.push(s);
        temp = i;
      } else {
        let s = "";
        tSum = tSum - words[i - 1].length - 1;
        sList.splice(sList.length - 1, 1);
        sList.splice(sList.length - 1, 1);
        let v = maxWidth - tSum;
        let j = 0;
        while (v > 0) {
          v--;
          sList[j]++;
          if (j === sList.length - 1) {
            j = 0;
          } else {
            j++;
          }
        }
        let z = 0;
        let k = 0;
        for (k = temp; k < sList.length; k++) {
          s = s + words[k];
          for (let z = 0; z < sList[k]; z++) {
            s = s + " ";
          }
        }
        s = s + words[k];
        result.push(s);
        i = i - 1;
        temp = i;
      }
      tSum = 0;
    } else if (tSum === maxWidth) {
      let s = "";
      let v = 1;
      let j = 0;

      //   sList.splice(sList.length - 1, 1);
      while (v > 0) {
        v--;
        sList[j]++;
        if (j === sList.length - 1) {
          j = 0;
        } else {
          j++;
        }
      }
      let k = 0;
      for (k = temp; k < sList.length; k++) {
        s = s + words[k];
        for (let z = 0; z < sList[k]; z++) {
          s = s + " ";
        }
      }
      s = s + words[k];
      result.push(s);
      tSum = 0;
      temp = i;
    } else {
      tSum = tSum + words[i].length + 1;
      //   s = s + words[i] + " ";
      sList = [...sList, 1];
      i++;
    }
  }

  //   console.log(sList, tSum);
  return result;
};

console.log(
  fullJustify(
    [
      "Science",
      "is",
      "what",
      "we",
      "understand",
      "well",
      "enough",
      "to",
      "explain",
      "to",
      "a",
      "computer.",
      "Art",
      "is",
      "everything",
      "else",
      "we",
      "do",
    ],
    20
  )
);
