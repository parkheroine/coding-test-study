"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const [[N], ...cost] = input;
  const FULL = (1 << N) - 1;
  const dp = Array(1 << N).fill(-1);

  function tsp(cur, visited) {
    if (cur === N) {
      return 0;
    }

    if (dp[visited] !== -1) {
      return dp[visited];
    }

    let minCost = Infinity;

    for (let next = 0; next < N; next++) {
      if (visited & (1 << next)) continue;

      const nextVisited = visited | (1 << next);
      const result = cost[cur][next] + tsp(cur + 1, nextVisited);

      minCost = Math.min(minCost, result);
    }

    dp[visited] = minCost;
    return minCost;
  }

  return tsp(0, 0);
}

console.log(solution());
