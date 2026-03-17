"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);

function solution() {
  const adj = Array.from({ length: N + 1 }, () => []);
  const count = Array(N + 1).fill(0);
  const times = Array(N + 1).fill(0);
  const queue = [];
  const result = Array(N + 1).fill(0);

  for (let i = 1; i < input.length; i++) {
    const [time, ...nums] = input[i].split(" ").map(Number);
    times[i] = time;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === -1) {
        break;
      }
      count[i]++;
      adj[nums[j]].push(i);
    }
  }

  for (let i = 1; i < count.length; i++) {
    if (count[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length) {
    const cur = queue.shift();
    result[cur] += times[cur];

    for (const next of adj[cur]) {
      result[next] = Math.max(result[next], result[cur]);
      count[next]--;
      if (count[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result.join("\n").slice(2);
}

console.log(solution());
