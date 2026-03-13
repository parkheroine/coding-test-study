"use strict";
const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

function solution() {
  const jewels = [];
  let l = 1;
  let r = 0;
  for (let i = 1; i < input.length; i++) {
    const cur = Number(input[i]);
    jewels.push(cur);
    if (r < cur) {
      r = cur;
    }
  }

  let result = Infinity;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2); //최대 몇개씩 나눠줄지
    let leftN = N;

    for (let i = 0; i < jewels.length; i++) {
      const neenedN = Math.ceil(jewels[i] / mid);
      leftN -= neenedN;
    }

    if (leftN < 0) {
      l = mid + 1;
    } else {
      if (result > mid) {
        result = mid;
      }
      r = mid - 1;
    }
  }

  return result;
}

console.log(solution());
