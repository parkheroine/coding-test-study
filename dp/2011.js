"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const str = fs.readFileSync(filePath).toString().trim().split("").map(Number);

function solution() {
  const N = str.length;
  const dp = Array(N + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1 <= str[0] && str[0] <= 9 ? 1 : 0;
  const MOD = 1000000;

  for (let i = 2; i <= str.length; i++) {
    const cur = str[i - 1];
    const prev = str[i - 2];
    if (cur === 0 && prev === 0) {
      continue;
    }

    const twoNum = prev * 10 + cur;
    if (10 <= twoNum && twoNum <= 26) {
      dp[i] = (dp[i] + dp[i - 2]) % MOD;
    }

    if (1 <= cur && cur <= 9) {
      dp[i] = (dp[i] + dp[i - 1]) % MOD;
    }
  }

  return dp[N];
}
console.log(solution());
