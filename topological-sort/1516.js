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
  const [[N], ...infos] = input;

  const degree = Array(N + 1).fill(0);
  const nexts = Array.from({ length: N + 1 }, () => []);
  const queue = [];
  let head = 0;
  const times = Array(N + 1).fill(0);
  const result = Array(N + 1).fill(0);

  for (let i = 1; i < input.length; i++) {
    const line = input[i];
    const time = line[0];
    times[i] = time;

    for (let j = 1; j < line.length - 1; j++) {
      const prev = line[j];
      degree[i]++;
      nexts[prev].push(i);
    }
  }

  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) {
      queue.push(i);
      result[i] = times[i];
    }
  }

  while (head < queue.length) {
    const cur = queue[head++];

    for (const next of nexts[cur]) {
      degree[next]--;

      result[next] = Math.max(result[next], result[cur] + times[next]);

      if (degree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result.slice(1).join("\n");
}

console.log(solution());
