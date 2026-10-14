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
  const dp = Array.from({ length: N }, () => Array(1 << N).fill(-1));

  function tsp(cur, visited) {
    if (visited === FULL) {
      if (cost[cur][0] !== 0) {
        return cost[cur][0];
      }
      return Infinity;
    }

    if (dp[cur][visited] !== -1) {
      return dp[cur][visited];
    }

    let minCost = Infinity;

    for (let next = 0; next < N; next++) {
      if (visited & (1 << next)) continue;

      if (cost[cur][next] === 0) continue;

      const nextVisited = visited | (1 << next);

      const result = cost[cur][next] + tsp(next, nextVisited);

      minCost = Math.min(minCost, result);
    }

    dp[cur][visited] = minCost;
    return minCost;
  }

  return tsp(0, 1 << 0);
}
console.log(solution());
