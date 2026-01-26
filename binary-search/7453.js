"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N] = input[0];
input.splice(0, 1);

function solution() {
  const sumAB = new Int32Array(N * N);
  const sumCD = new Int32Array(N * N);

  let idx = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const a = input[i][0];
      const b = input[j][1];

      const c = input[i][2];
      const d = input[j][3];
      sumAB[idx] = a + b;
      sumCD[idx] = c + d;
      idx++;
    }
  }

  sumAB.sort((a, b) => a - b);
  sumCD.sort((a, b) => a - b);

  let l = 0;
  let r = sumCD.length - 1;
  let result = 0;

  while (l < sumAB.length && r >= 0) {
    const sum = sumAB[l] + sumCD[r];
    if (sum === 0) {
      const tempAB = sumAB[l];
      const tempCD = sumCD[r];
      let countAB = 0;
      let countCD = 0;
      while (l < sumAB.length && sumAB[l] === tempAB) {
        countAB++;
        l++;
      }
      while (r >= 0 && sumCD[r] === tempCD) {
        countCD++;
        r--;
      }
      result += countAB * countAB;
    } else if (sum < 0) {
      l++;
    } else if (sum > 0) {
      r--;
    }
  }
  return result;
}

console.log(solution());
