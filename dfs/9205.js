"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const T = input[0][0];

function solution() {
  let index = 1;
  const result = [];

  for (let t = 0; t < T; t++) {
    const storeCount = input[index][0];
    index++;
    const stores = [];
    const start = input[index++];
    for (let i = 0; i < storeCount; i++) {
      stores.push(input[index++]);
    }
    const end = input[index++];

    result.push(dfs(start, stores, end) ? "happy" : "sad");
  }

  function dfs(start, stores, end) {
    const stack = [start];
    const visited = Array(stores.length).fill(false);
    const [endX, endY] = end;

    while (stack.length > 0) {
      const [x, y] = stack.pop();

      if (Math.abs(endX - x) + Math.abs(endY - y) <= 1000) {
        return true;
      }

      for (let i = 0; i < stores.length; i++) {
        const [nx, ny] = stores[i];
        if (!visited[i] && Math.abs(nx - x) + Math.abs(ny - y) <= 1000) {
          stack.push([nx, ny]);
          visited[i] = true;
        }
      }
    }

    return false;
  }

  return result.join("\n");
}

console.log(solution());
